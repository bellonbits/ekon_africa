'use client'

import { BookOpen, Clock, GraduationCap, Globe, ChevronRight, Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'

const topics = [
    {
        title: 'Fundamental GDP',
        description: 'Deconstructing economic output measurements in developing markets.',
        difficulty: 'Beginner',
        duration: '10 min',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Inflation Dynamics',
        description: 'Analysis of price stabilization strategies and purchasing power.',
        difficulty: 'Beginner',
        duration: '12 min',
        icon: Clock,
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Global Trade Flow',
        description: 'Leveraging AfCFTA for continental economic integration.',
        difficulty: 'Intermediate',
        duration: '15 min',
        icon: Globe,
        color: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'Economic History',
        description: 'Post-colonial industrialization and modern fiscal transitions.',
        difficulty: 'Intermediate',
        duration: '20 min',
        icon: Clock,
        color: 'from-orange-500 to-rose-500',
    },
    {
        title: 'Fiscal Sovereignty',
        description: 'Advanced modeling of debt sustainability and tax architecture.',
        difficulty: 'Advanced',
        duration: '25 min',
        icon: GraduationCap,
        color: 'from-primary-500 to-indigo-500',
    },
    {
        title: 'Monetary Systems',
        description: 'Central bank digital currencies and liquidity management.',
        difficulty: 'Advanced',
        duration: '30 min',
        icon: GraduationCap,
        color: 'from-amber-500 to-orange-500',
    },
]

export default function LearnPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        animate(containerRef.current.querySelectorAll('.animate-up'), {
            translateY: [30, 0],
            opacity: [0, 1],
            delay: stagger(60),
            duration: 800,
            easing: 'easeOutExpo',
        })
    }, [])

    return (
        <div className="min-h-screen bg-background py-20 cyber-grid" ref={containerRef}>
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20 animate-up opacity-0">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <BookOpen className="w-10 h-10 text-primary-400" />
                        </div>

                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white tracking-widest uppercase">
                            Knowledge <span className="text-primary-500">Vault</span>
                        </h1>

                        <p className="text-xl text-primary-100/40 font-medium">
                            Master complex African economic architectures through elite modules.
                        </p>
                    </div>

                    {/* Topics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {topics.map((topic, index) => {
                            const Icon = topic.icon
                            return (
                                <div
                                    key={index}
                                    className="animate-up opacity-0 cyber-card group cursor-pointer p-8"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-white/5 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">
                                        {topic.title}
                                    </h3>

                                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                        {topic.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400">
                                            {topic.difficulty} • {topic.duration}
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Upsell / Coming Soon */}
                    <div className="animate-up opacity-0 cyber-glass rounded-[3rem] p-12 border border-white/5 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary-600/5 backdrop-blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display font-bold text-white mb-6">
                                Interactive Certifications
                            </h2>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                We are developing standardized economic proficiency assessments specialized for the African context. Gain certified insights recognized by top policy think-tanks.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <button className="px-10 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all flex items-center space-x-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span>Join Waitlist</span>
                                </button>
                                <button className="px-10 py-4 border border-white/10 hover:border-white/30 text-white rounded-2xl font-bold transition-all">
                                    Explore Free Datasets
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
