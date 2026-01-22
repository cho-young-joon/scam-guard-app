import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { KNOWLEDGE_BASE } from "@/data/knowledge_base";

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Cache for embeddings to avoid re-generating them on every request (in a real serverless env, this might reset, but helps for hot lambdas)
let vectorCache: { content: string; category: string; embedding: number[] }[] | null = null;

// Helper: Calculate Cosine Similarity
function cosineSimilarity(a: number[], b: number[]) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

// 1. Initialize Vector Store (Knowledge Base -> Vectors)
async function getVectorStore() {
    if (vectorCache) return vectorCache;

    console.log("--- Initializing Vector Store (Embedding Knowledge Base) ---");

    // Create embeddings for all knowledge items
    // In production, this implies batching or pre-computation.
    const texts = KNOWLEDGE_BASE.map(item => `[${item.category}] ${item.content} (Tags: ${item.tags.join(", ")})`);

    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small", // Cost-effective & Fast
        input: texts,
    });

    vectorCache = KNOWLEDGE_BASE.map((item, index) => ({
        content: item.content,
        category: item.category,
        embedding: embeddingResponse.data[index].embedding,
    }));

    console.log("--- Vector Store Ready ---");
    return vectorCache;
}

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // 2. Embed User Query
        const queryEmbeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: message,
        });
        const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

        // 3. Perform Similarity Search (Custom Vector Search)
        const store = await getVectorStore();

        // Calculate similarities
        const scoredDocs = store.map(doc => ({
            ...doc,
            score: cosineSimilarity(queryEmbedding, doc.embedding)
        }));

        // Sort by score descending and take top 3
        const top3Docs = scoredDocs
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        const contextText = top3Docs.map(doc => `[${doc.category}] ${doc.content}`).join("\n\n");

        console.log("--- RAG Context Retrieved ---");
        console.log(contextText);

        // 4. Generate Response with LLM
        const systemPrompt = `
당신은 'ScamGuard'의 고도로 훈련된 AI 상담사 '가디언'입니다.
당신의 임무는 로맨스 스캠 피해자를 정서적으로 지지하고, 정확한 예방 및 대처 정보를 제공하는 것입니다.

**핵심 아키텍처:**
- 본 시스템은 사용자의 질문을 Vectorizing하여 Knowledge Base와 유사도 검색(Cosine Similarity)을 수행한 RAG(Retrieval-Augmented Generation) 시스템입니다.

**답변 스타일 지침 (중요):**
1. **가독성:** 줄글보다는 **글머리 기호(-)**와 **숫자 리스트(1, 2, 3)**를 사용하여 깔끔하게 정리하세요.
2. **특수문자 금지:** 텍스트가 깨져 보일 수 있으므로 **볼드체(**), 이탤릭체(*) 같은 마크다운 강조 문법을 절대 사용하지 마세요.** 그냥 평범한 텍스트로 작성하세요.
3. **구조화된 답변:**
   - [공감]: 짧고 따뜻한 한 마디
   - [진단]: 상황 분석
   - [행동 지침]: 번호로 매겨서 구체적인 대처법 제시
4. **팩트 중심:** 감정보다는 실질적인 정보 위주로 답변하세요.
5. **줄바꿈:** 각 항목 사이에는 반드시 빈 줄을 하나씩 넣어서 가독성을 높이세요.
6. **친근감(이모티콘):** 딱딱하지 않게 적절한 이모티콘(🌿, 🛡️, 💙, ✨, 🚨)을 섞어 따뜻하고 친절한 느낌을 주세요.

**예시 포맷:**
정말 많이 놀라셨겠어요. 😢 하지만 지금이라도 의심하신 것은 정말 잘하신 일입니다! 👏

[주요 대처 요령] 🛡️

1. 절대 송금 금지 🙅‍♂️: 그 어떤 이유로도 추가 입금은 안 됩니다.

2. 증거 확보 📸: 대화 내용, 프로필 사진을 캡처하세요.

3. 즉시 차단 🚫: 상대방이 감정적으로 호소해도 응답하지 마세요.

[CONTEXT]
${contextText}
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            temperature: 0.7,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Vector RAG Counseling API Error:", error);
        return NextResponse.json(
            { error: "Failed to process counseling request" },
            { status: 500 }
        );
    }
}
