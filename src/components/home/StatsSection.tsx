'use client'

import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'

const stats = [
    { label: 'African Countries', value: 54, suffix: '' },
    { label: 'Economic Indicators', value: 50, suffix: '+' },
    { label: 'Years of History', value: 60, suffix: '+' },
    { label: 'Learning Modules', value: 100, suffix: '+' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        if (!nodeRef.current) return

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && nodeRef.current) {
                    animate(nodeRef.current, {
                        textContent: [0, value],
                        round: 1,
                        easing: 'easeOutExpo',
                        duration: 2500,
                    })
                    observerRef.current?.disconnect()
                }
            })
        }, { threshold: 0.5 })

        observerRef.current.observe(nodeRef.current)

        return () => observerRef.current?.disconnect()
    }, [value])

    return (
        <span className="font-mono tabular-nums">
            <span ref={nodeRef}>0</span>
            {suffix}
        </span>
    )
}

export default function StatsSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target.querySelectorAll('.stat-card'), {
                        translateY: [20, 0],
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        delay: stagger(120),
                        duration: 800,
                        easing: 'easeOutBack',
                    })
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.2 })

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none cyber-grid" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-card opacity-0"
                        >
                            <div className="cyber-glass rounded-[2rem] p-10 border border-white/5 hover:border-primary-500/30 transition-all duration-500 group">
                                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-primary-200/40 font-bold uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
