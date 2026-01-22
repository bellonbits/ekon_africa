'use client'

import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import { MessageSquare, BarChart3, Lightbulb, BookOpen, TrendingUp, Users } from 'lucide-react'

const features = [
    {
        icon: MessageSquare,
        title: 'AI Chat Assistant',
        description: 'Ask Ekon anything about African economics. Get answers tailored to your knowledge level—child, adult, or expert mode.',
        color: 'from-primary-500 to-indigo-600',
    },
    {
        icon: BarChart3,
        title: 'Economic Dashboard',
        description: 'Track key indicators like GDP, inflation, and trade across African countries with interactive visualizations.',
        color: 'from-accent-500 to-cyan-600',
    },
    {
        icon: Lightbulb,
        title: 'Scenario Analysis',
        description: 'Explore "what-if" scenarios for African economies. See optimistic, neutral, and risk outcomes for different policies.',
        color: 'from-primary-400 to-accent-500',
    },
    {
        icon: BookOpen,
        title: 'Educational Resources',
        description: 'Learn economic concepts through stories, timelines, and real African examples. From basics to advanced topics.',
        color: 'from-indigo-600 to-primary-700',
    },
    {
        icon: TrendingUp,
        title: 'Historical Context',
        description: "Understand how colonial era, independence, and structural adjustment shaped today's African economies.",
        color: 'from-accent-600 to-primary-600',
    },
    {
        icon: Users,
        title: 'Multi-Level Learning',
        description: "Whether you're 11 or a policymaker, get explanations that match your understanding without losing accuracy.",
        color: 'from-primary-700 to-indigo-900',
    },
]

export default function FeaturesGrid() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target.querySelectorAll('.feature-card'), {
                        opacity: [0, 1],
                        translateY: [40, 0],
                        scale: [0.95, 1],
                        delay: stagger(100),
                        duration: 800,
                        easing: 'easeOutExpo',
                    })
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1 })

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24 feature-card opacity-0">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white text-glow">
                        BUILDING THE FUTURE <br />
                        <span className="text-primary-400">OF AFRICAN ECONOMICS</span>
                    </h2>
                    <p className="text-xl text-primary-200/60 max-w-2xl mx-auto font-medium">
                        Powerful tools and resources designed to make complex economics accessible and actionable
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group feature-card opacity-0 cyber-card p-10 hover:-translate-y-3"
                            >
                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:neon-glow-purple transition-all duration-300 shadow-xl`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="relative text-2xl font-display font-bold mb-4 text-white group-hover:text-primary-300 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="relative text-primary-100/60 leading-relaxed font-medium">
                                    {feature.description}
                                </p>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
