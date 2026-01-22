"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, MessageCircle, UserX, AlertTriangle, ChevronRight, Heart, Mic, CheckCircle } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
            {/* Background Gradients - Protection Colors */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
                <nav className="flex justify-between items-center mb-16 md:mb-24">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                            ScamGuard
                        </span>
                    </div>
                    <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                        서비스 소개
                    </Link>
                </nav>

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6 shadow-sm">
                            <Shield className="w-4 h-4" />
                            <span>최첨단 AI 기술로 당신을 보호합니다</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-tight text-slate-900 break-keep flex flex-col items-center">
                            <span>당신의 <span className="text-rose-500 relative inline-block">진심<span className="absolute bottom-2 left-0 w-full h-3 bg-rose-100 -z-10 rounded-sm"></span></span>,</span>
                            <span className="whitespace-nowrap inline-block">누군가에겐 <span className="text-blue-600 relative inline-block">표적<span className="absolute bottom-2 left-0 w-full h-3 bg-blue-50 -z-10 rounded-sm"></span></span>일 수 있습니다.</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl mb-12 leading-relaxed break-keep font-semibold">
                            당신의 <span className="text-rose-500">사랑</span>은 지키고, <span className="text-slate-900 font-bold">사기</span>는 <span className="text-blue-600">차단</span>합니다.<br className="hidden md:block" />
                            정밀 AI 분석으로 로맨스 스캠 위협으로부터 당신을 안전하게 보호합니다.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/analyze?tab=chat"
                                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                지금 바로 검사하기
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/analyze?tab=image"
                                className="group px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-lg transition-all border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <UserX className="w-5 h-5 text-blue-500" />
                                프로필 검증
                            </Link>
                            <Link
                                href="/analyze?tab=voice"
                                className="group px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-lg transition-all border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <Mic className="w-5 h-5 text-emerald-500" />
                                음성 분석
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
                        title="S.C.R.I.P.T. 방어"
                        description="LLM이 스캐머의 교묘한 사기 시나리오(Love Bombing, 금전 요구)를 탐지하여 당신을 방어합니다."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<UserX className="w-8 h-8 text-indigo-600" />}
                        title="딥페이크 차단"
                        description="가짜 프로필 사진의 AI 생성 흔적을 식별하고 도용 여부를 가려내어 신원을 검증합니다."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<Mic className="w-8 h-8 text-emerald-600" />}
                        title="보이스 가디언"
                        description="통화 목소리의 미세한 떨림과 강압적인 뉘앙스를 분석해 심리적 지배를 막아냅니다."
                        delay={0.4}
                    />
                </div>

                {/* Partners & Competition Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 border-t border-slate-200 pt-12 pb-8"
                >
                    <div className="flex flex-col items-center justify-center text-center space-y-8">
                        {/* Main Sponsor Logo */}
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">In Cooperation With</p>
                            <div className="flex items-center gap-6 grayscale-0">
                                <img src="/images/National Police Agency.png" alt="National Police Agency" className="h-24 md:h-28 object-contain" />
                                <div className="h-12 w-[2px] bg-slate-200"></div>
                                <div className="flex flex-col items-start">
                                    <span className="text-slate-900 font-black text-2xl leading-none">POLICE</span>
                                    <span className="text-slate-500 font-bold text-sm tracking-wider">Cyber Bureau</span>
                                </div>
                            </div>
                        </div>

                        {/* Competition Details - Simple Text */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-sm font-medium text-slate-500 mt-8 leading-relaxed">
                            <span>주최 : (주)데이터유니버스</span>
                            <span className="hidden md:inline text-slate-300">|</span>
                            <span>후원 : 경찰청</span>
                            <span className="hidden md:inline text-slate-300">|</span>
                            <span>운영 : 데이콘</span>
                        </div>

                        <p className="text-xs text-slate-400 mt-8">
                            © 2026 ScamGuard. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-white border border-blue-50 shadow-lg hover:shadow-xl hover:shadow-blue-100/50 transition-all hover:-translate-y-1"
        >
            <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 w-fit shadow-inner">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
            <p className="text-slate-600 leading-relaxed break-keep font-medium">{description}</p>
        </motion.div>
    );
}
