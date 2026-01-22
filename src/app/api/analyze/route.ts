import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key', // Will error if not provided for real calls
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const type = formData.get('type') as string;

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API Key is missing. Please set it in .env.local' },
                { status: 500 }
            );
        }

        let result = { risk: 0, flags: [] as string[], advice: '' };

        if (type === 'chat') {
            const text = formData.get('text') as string;
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are a Romance Scam Detection Expert. Analyze the following chat log for signs of "Love Bombing" (excessive affection early on), financial requests (crypto, customs fees, emergency), or suspicious urgency.
            Return a JSON object: { "risk": number (0-100), "flags": string[] (korean), "advice": string (korean) }.`
                    },
                    { role: 'user', content: text }
                ],
                response_format: { type: 'json_object' }
            });
            result = JSON.parse(completion.choices[0].message.content || '{}');
        }

        else if (type === 'image') {
            const file = formData.get('file') as File;
            if (!file) throw new Error('No file uploaded');

            // Convert file to base64
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64Image = buffer.toString('base64');

            const completion = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `Analyze this profile picture for a Romance Scam context. Look for:
            1. Signs of AI Generation (unnatural artifacts, perfect symmetry, weird background).
            2. Stolen Identity signs (looks like a stock photo, too professional for a casual user).
            Return JSON: { "risk": number (0-100), "flags": string[] (korean), "advice": string (korean) }.`
                    },
                    {
                        role: 'user',
                        content: [
                            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
                        ]
                    }
                ],
                response_format: { type: 'json_object' }
            });
            result = JSON.parse(completion.choices[0].message.content || '{}');
        }

        else if (type === 'audio') {
            const file = formData.get('file') as File;
            if (!file) throw new Error('No audio file uploaded');

            // 1. Transcribe with Whisper
            const transcription = await openai.audio.transcriptions.create({
                file: file,
                model: 'whisper-1',
            });

            // 2. Analyze Text with GPT
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `Analyze this voice transcript for Romance Scam signs. Look for: 
              - Manipulative tone or emotional blackmail.
              - Inconsistent stories.
              Transcript: "${transcription.text}"
              Return JSON: { "risk": number (0-100), "flags": string[] (korean, include key phrases from transcript), "advice": string (korean) }.`
                    },
                ],
                response_format: { type: 'json_object' }
            });
            result = JSON.parse(completion.choices[0].message.content || '{}');
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Analysis failed' },
            { status: 500 }
        );
    }
}
