'use client'

import { Lightbulb, TrendingUp, TrendingDown, Minus, Play, Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'

export default function ScenariosPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        animate(containerRef.current.querySelectorAll('.animate-up'), {
            translateY: [30, 0],
            opacity: [0, 1],
            delay: stagger(100),
            duration: 800,
            easing: 'easeOutExpo',
        })
    }, [])

    return (
        <div className="min-h-screen bg-background py-20 cyber-grid" ref={containerRef}>
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 animate-up opacity-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/20">
                            <Lightbulb className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
                            Scenario <span className="text-primary-500">Analysis</span>
                        </h1>

                        <p className="text-xl text-primary-100/40 max-w-2xl mx-auto font-medium">
                            Synthesizing predictive models to explore &quot;what-if&quot; economic futures across the African continent.
                        </p>
                    </div>

                    {/* Main Feature Card */}
                    <div className="animate-up opacity-0 cyber-glass rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden mb-12">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-bold uppercase tracking-widest mb-8">
                                <Sparkles className="w-4 h-4" />
                                <span>Module: Beta v0.1</span>
                            </div>

                            <h2 className="text-3xl font-display font-bold text-white mb-6">
                                Predictive Economic Engine
                            </h2>
                            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                                Our upcoming AI-driven simulator will allow you to manipulate key variables—interest rates, trade barriers, and infrastructure investment—to visualize regional stability and growth trajectories.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Optimistic</h3>
                                    <p className="text-xs text-gray-500">Rapid integration and high FDI inflows.</p>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Minus className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Neutral</h3>
                                    <p className="text-xs text-gray-500">Continuation of current structural trends.</p>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingDown className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Risk Case</h3>
                                    <p className="text-xs text-gray-500">Impact of global shocks and fiscal stress.</p>
                                </div>
                            </div>

                            <button className="inline-flex items-center space-x-3 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-white/5">
                                <Play className="w-5 h-5 fill-current" />
                                <span>Request Early Access</span>
                            </button>
                        </div>
                    </div>

                    {/* Secondary Call to Action */}
                    <div className="animate-up opacity-0 text-center py-10">
                        <p className="text-primary-100/30 mb-6 font-bold uppercase tracking-widest text-sm">
                            Need Immediate Analysis?
                        </p>
                        <a
                            href="/chat"
                            className="text-white hover:text-primary-400 font-display font-bold text-2xl transition-colors inline-flex items-center space-x-3"
                        >
                            <span>Consult Ekon AI Intelligence</span>
                            <Sparkles className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
