export interface KnowledgeItem {
    category: string;
    tags: string[];
    content: string;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
    {
        category: "definition",
        tags: ["로맨스 스캠", "정의", "뜻", "무엇"],
        content: "로맨스 스캠(Romance Scam)이란 SNS나 데이팅 앱 등에서 이성에게 호감을 산 뒤, 신뢰를 형성하여 금전을 요구하거나 개인정보를 탈취하는 사기 수법입니다. 주로 파병 군인, 의사, 재력가 등을 사칭하며 장기간 연락하며 심리적 의존을 만듭니다."
    },
    {
        category: "prevention",
        tags: ["예방", "방법", "대처", "피하는 법"],
        content: "로맨스 스캠 예방 수칙: 1. 온라인에서 만난 낯선 사람의 금전 요구는 무조건 거절하세요. 2. 상대방의 프로필 사진을 구글 이미지 검색 등으로 확인해보세요. 3. 영상 통화를 요청했을 때 핑계를 대며 피한다면 의심해야 합니다. 4. 절대 신분증, 통장 사본 등 개인정보를 보내지 마세요."
    },
    {
        category: "reporting",
        tags: ["신고", "경찰", "112", "피해", "당했을 때"],
        content: "피해가 발생했다면 즉시 다음 조치를 취하세요: 1. 입금 내역, 대화 내용 캡처 등 증거 자료를 확보하세요. 2. 경찰청 사이버범죄 신고시스템(ECRM)에 접속하여 신고하거나 국번 없이 112로 전화하세요. 3. 송금한 은행에 즉시 지급정지 신청이 가능한지 문의하세요 (단, 보이스피싱과 달리 지급정지가 어려울 수 있으니 빠른 신고가 중요합니다)."
    },
    {
        category: "psychology",
        tags: ["심리", "위로", "불안", "자책", "마음"],
        content: "피해를 입으셨더라도 자책하지 마세요. 스캐머들은 심리 전문가 수준으로 사람의 마음을 조종합니다. 당신의 잘못이 아닙니다. 혼자 끙끙 앓기보다는 가족이나 신뢰할 수 있는 친구, 혹은 전문 심리 상담가에게 도움을 요청하는 것이 중요합니다."
    },
    {
        category: "red_flags",
        tags: ["특징", "징후", "의심", "패턴"],
        content: "주요 사기 의심 징후(Red Flags): 1. 만난 지 얼마 안 되어 '여보', '운명' 등의 과도한 애정 표현(Love Bombing). 2. 갑작스러운 사고, 수술비, 통관비, 배송비 명목의 금전 요구. 3. 한국에 들어와서 같이 살자며 항공료나 짐 보관료 요구. 4. 암호화폐 투자 권유."
    }
];

export function searchKnowledge(query: string): string {
    const queryTerms = query.toLowerCase().split(" ");
    const matched = KNOWLEDGE_BASE.filter(item =>
        item.tags.some(tag => query.includes(tag)) ||
        queryTerms.some(term => item.content.includes(term))
    );

    if (matched.length === 0) return "";

    return matched.map(m => `[${m.category.toUpperCase()}] ${m.content}`).join("\n\n");
}
