"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, MessageCircle, UserX, Mic, Activity, Lock, ArrowLeft, CheckCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
            {/* Background Elements - Protection Colors */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-12 transition-colors group font-medium">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    메인으로 돌아가기
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-bold mb-6 shadow-sm">
                        <Shield className="w-4 h-4" />
                        <span>ScamGuard Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900">
                        안전한 사랑을 지키는<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">디지털 가디언</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                        ScamGuard는 최신 AI 기술을 활용하여 로맨스 스캠이라는 보이지 않는 위협으로부터 당신의 감정과 자산을 보호합니다.
                    </p>
                </motion.div>

                {/* Feature Deep Dive */}
                <div className="space-y-24">
                    <FeatureSection
                        icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
                        title="1. 대화 맥락 정밀 분석"
                        description="단순히 특정 단어만 찾는 것이 아닙니다. GPT-4o가 대화의 전체적인 흐름을 읽고, 사랑을 가장한 교묘한 가스라이팅과 금전 요구 시나리오(Scam Scripts)를 탐지합니다."
                        highlight="Love Bombing / 긴급 자금 요청 탐지"
                        imageSrc="/images/about_chat.png"
                        imageColor="bg-blue-50"
                        align="left"
                    />
                    <FeatureSection
                        icon={<UserX className="w-8 h-8 text-indigo-600" />}
                        title="2. 딥페이크 & 도용 프로필 검증"
                        description="상대방이 보낸 사진이 AI로 생성된 가짜 인물은 아닌지, 혹은 인터넷에서 도용한 유명인의 사진은 아닌지 Vision AI가 픽셀 단위로 검증합니다."
                        highlight="생성형 AI 아티팩트 / 역이미지 검색"
                        imageSrc="/images/about_face.png"
                        imageColor="bg-indigo-50"
                        align="right"
                    />
                    <FeatureSection
                        icon={<Mic className="w-8 h-8 text-emerald-600" />}
                        title="3. 음성 뉘앙스 분석"
                        description="목소리는 속이기 어렵습니다. 통화 녹음이나 음성 메시지에서 느껴지는 미세한 떨림, 부자연스러움, 강압적인 태도를 Whisper 모델과 심리 분석 알고리즘이 파악합니다."
                        highlight="음성 합성 탐지 / 심리적 압박 패턴"
                        imageSrc="/images/about_voice.png"
                        imageColor="bg-emerald-50"
                        align="left"
                    />
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500" />
                    <h2 className="text-3xl font-bold mb-6 text-slate-900">당신의 안전이 최우선입니다</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto font-medium">
                        의심하는 것은 사랑을 부정하는 것이 아닙니다.<br />
                        진정한 사랑을 지키기 위한 현명한 선택입니다.
                    </p>
                    <Link
                        href="/analyze?tab=chat"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-8 font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                        무료로 예방하기
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

function FeatureSection({ icon, title, description, highlight, imageSrc, imageColor, align }: { icon: any, title: string, description: string, highlight: string, imageSrc?: string, imageColor: string, align: "left" | "right" }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${align === "right" ? "md:flex-row-reverse" : ""}`}
        >
            <div className="flex-1 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-lg text-slate-900">
                    {icon}
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed break-keep font-medium">
                    {description}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-100 w-fit px-4 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {highlight}
                </div>
            </div>

            <div className={`flex-1 w-full aspect-video rounded-2xl ${imageColor} backdrop-blur-3xl border border-slate-200 relative overflow-hidden group shadow-2xl`}>
                {imageSrc ? (
                    <>
                        {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 z-10" /> */}
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </>
                ) : (
                    <div className="absolute inset-10 border border-slate-300 rounded-xl flex items-center justify-center">
                        <Activity className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
