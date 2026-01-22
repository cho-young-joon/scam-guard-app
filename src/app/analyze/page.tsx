"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, UserX, Mic, Upload, AlertTriangle, CheckCircle, Search, X, Play, Square, Phone, ShieldAlert, ArrowLeft } from "lucide-react";
import clsx from "clsx";

export default function AnalyzePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">로딩 중...</div>}>
            <AnalyzeContent />
        </Suspense>
    );
}

function AnalyzeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<"chat" | "image" | "voice">("chat");

    useEffect(() => {
        if (tabParam === "image") setActiveTab("image");
        else if (tabParam === "voice") setActiveTab("voice");
        else setActiveTab("chat");
    }, [tabParam]);

    const switchTab = (tab: "chat" | "image" | "voice") => {
        setActiveTab(tab);
        router.replace(`/analyze?tab=${tab}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">ScamGuard</span>
                        <span className="text-slate-500 font-medium">/ 분석 센터</span>
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 p-1 bg-white border border-slate-200 rounded-xl mb-8 w-fit shadow-sm">
                    <button
                        onClick={() => switchTab("chat")}
                        className={clsx(
                            "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "chat" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        <MessageCircle className="w-4 h-4" /> 대화 분석
                    </button>
                    <button
                        onClick={() => switchTab("image")}
                        className={clsx(
                            "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "image" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        <UserX className="w-4 h-4" /> 사진 검증
                    </button>
                    <button
                        onClick={() => switchTab("voice")}
                        className={clsx(
                            "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "voice" ? "bg-emerald-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        <Mic className="w-4 h-4" /> 음성 분석
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "chat" ? (
                        <ChatAnalyzer key="chat" />
                    ) : activeTab === "image" ? (
                        <ImageAnalyzer key="image" />
                    ) : (
                        <VoiceAnalyzer key="voice" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ResultDisplay({ result }: { result: any }) {
    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 min-h-[400px]">
                <Search className="w-16 h-16 opacity-20" />
                <p>분석 결과가 여기에 표시됩니다</p>
            </div>
        );
    }

    if (result.error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-rose-600 space-y-4 p-6 text-center min-h-[400px]">
                <AlertTriangle className="w-16 h-16 opacity-80" />
                <p className="font-bold text-lg">오류 발생</p>
                <p>{result.error}</p>
                <p className="text-sm text-slate-500">API Key 설정(.env.local)을 확인해주세요.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 h-full flex flex-col">
            <div className="text-center pb-8 border-b border-slate-100">
                <div className="text-sm text-slate-500 mb-2 uppercase tracking-wider font-bold">AI Risk Assessment</div>
                <div className={clsx("text-7xl font-black mb-4 tracking-tighter", result.risk > 50 ? "text-rose-600" : "text-emerald-500")}>
                    {result.risk}%
                </div>
                <div className={clsx("inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-sm", result.risk > 50 ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100")}>
                    {result.risk > 70 ? "위험 (CRITICAL)" : result.risk > 30 ? "주의 (CAUTION)" : "안전 (SAFE)"}
                </div>
            </div>

            <div className="space-y-4 flex-1">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Search className="w-4 h-4 text-indigo-500" /> 상세 분석 리포트
                </h3>
                {result.flags && result.flags.length > 0 ? (
                    result.flags.map((flag: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-relaxed font-medium">{flag}</span>
                        </div>
                    ))
                ) : (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        특이한 사기 정황이 발견되지 않았습니다.
                    </div>
                )}
            </div>

            {result.advice && (
                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm">
                    <h4 className="text-indigo-600 font-bold mb-2 flex items-center gap-2 text-sm uppercase">
                        💡 AI Recommendation
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {result.advice}
                    </p>
                </div>
            )}

            {/* 112 Report Banner */}
            {result.risk > 30 && (
                <div className="p-5 bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-200 flex flex-col md:flex-row items-center gap-4 animate-pulse">
                    <div className="p-3 bg-white/20 rounded-full">
                        <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="font-bold mb-1">피해가 의심되시나요?</h4>
                        <p className="text-sm text-rose-100 mb-0">
                            즉시 경찰청에 신고하여 도움을 받으세요.
                        </p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <a href="tel:112" className="flex-1 md:flex-none px-4 py-2 bg-white text-rose-600 hover:bg-rose-50 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                            <Phone className="w-4 h-4" /> 112 신고
                        </a>
                        <a href="https://ecrm.police.go.kr" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none px-4 py-2 bg-rose-800/50 hover:bg-rose-800 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center">
                            사이버범죄 신고
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

function ChatAnalyzer() {
    const [text, setText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyze = async () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('type', 'chat');
            formData.append('text', text);

            const res = await fetch('/api/analyze', { method: 'POST', body: formData });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            setResult({ error: "Analysis Failed" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-shadow">
                    <textarea
                        className="w-full h-[500px] bg-transparent resize-none focus:outline-none text-slate-800 placeholder:text-slate-400 p-2 leading-relaxed"
                        placeholder={`상대방과의 대화 내용을 여기에 붙여넣으세요.\nAI가 문맥을 파악하여 숨겨진 의도를 분석합니다.`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button
                    onClick={analyze}
                    disabled={isAnalyzing || !text}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                    {isAnalyzing ? "AI 분석 중..." : "대화 정밀 분석"}
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 h-fit min-h-[500px]">
                <ResultDisplay result={result} />
            </div>
        </motion.div>
    );
}

function ImageAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('type', 'image');
            formData.append('file', file);

            const res = await fetch('/api/analyze', { method: 'POST', body: formData });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            setResult({ error: "Image Analysis Failed" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <label className="block h-[500px] border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-2xl bg-slate-50 hover:bg-rose-50/10 flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} accept="image/*" />
                    {file ? (
                        <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
                            <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-[80%] rounded-lg shadow-2xl mb-4 object-contain" />
                            <span className="text-slate-700 font-bold z-10 bg-white/90 px-4 py-1 rounded-full shadow-sm">{file.name}</span>
                            <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors z-20 shadow-md"><X className="w-5 h-5" /></button>
                        </div>
                    ) : (
                        <>
                            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-rose-500">
                                <Upload className="w-10 h-10" />
                            </div>
                            <p className="text-xl font-bold text-slate-700 mb-2">프로필 사진 업로드</p>
                            <p className="text-sm text-slate-500">Deepfake 탐지 및 AI Vision 분석</p>
                        </>
                    )}
                </label>
                <button onClick={analyze} disabled={isAnalyzing || !file} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5">
                    {isAnalyzing ? "Vision AI 분석 중..." : "사진 검증 시작"}
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 h-fit min-h-[500px]">
                <ResultDisplay result={result} />
            </div>
        </motion.div>
    );
}

function VoiceAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('type', 'audio');
            formData.append('file', file);

            const res = await fetch('/api/analyze', { method: 'POST', body: formData });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            setResult({ error: "Voice Analysis Failed" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <label className="block h-[500px] border-2 border-dashed border-slate-300 hover:border-purple-400 rounded-2xl bg-slate-50 hover:bg-purple-50/10 flex flex-col items-center justify-center cursor-pointer transition-colors group relative">
                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} accept="audio/*,video/mp4" />
                    {file ? (
                        <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center animate-pulse mb-6">
                                <Mic className="w-10 h-10 text-indigo-500" />
                            </div>
                            <span className="text-slate-700 font-bold mb-2">{file.name}</span>
                            <p className="text-xs text-slate-500">분석 준비 완료 ({(file.size / (1024 * 1024)).toFixed(1)}MB)</p>
                            {file.size > 25 * 1024 * 1024 && (
                                <p className="text-xs text-rose-500 mt-2 font-bold">⚠️ 25MB를 초과하여 분석이 어려울 수 있습니다.</p>
                            )}
                            <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors z-20 shadow-md"><X className="w-5 h-5" /></button>
                        </div>
                    ) : (
                        <>
                            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-indigo-500">
                                <Mic className="w-10 h-10" />
                            </div>
                            <p className="text-xl font-bold text-slate-700 mb-2">음성/영상 파일 업로드</p>
                            <p className="text-sm text-slate-500">통화 녹음 / MP4 영상 분석 가능</p>
                            <div className="mt-4 flex flex-col items-center gap-1">
                                <p className="text-xs text-indigo-600 px-4 py-1.5 bg-indigo-50 rounded-full font-bold">Whisper 모델 사용</p>
                                <p className="text-[10px] text-slate-400">최대 용량: 25MB</p>
                            </div>
                        </>
                    )}
                </label>
                <button onClick={analyze} disabled={isAnalyzing || !file} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5">
                    {isAnalyzing ? "Whisper 변환 및 분석 중..." : "음성 정밀 분석"}
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 h-fit min-h-[500px]">
                <ResultDisplay result={result} />
            </div>
        </motion.div>
    );
}
