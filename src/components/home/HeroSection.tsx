'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useAnime } from '@/hooks/useAnime'
import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Image from 'next/image'

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    // 3D Floating and Tilt animation for the logo
    const crystalRef = useAnime<HTMLDivElement>({
        translateY: [-15, 15],
        rotateX: [-10, 10],
        rotateY: [-15, 15],
        duration: 5000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
    }, [])

    // Staggered entrance animation
    useEffect(() => {
        if (!containerRef.current) return

        animate(containerRef.current.querySelectorAll('.animate-enter'), {
            translateY: [30, 0],
            opacity: [0, 1],
            delay: stagger(150, { start: 300 }),
            duration: 1000,
            easing: 'easeOutExpo',
        })
    }, [])

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background cyber-grid py-20">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="crystal-blob w-[500px] h-[500px] bg-primary-600/30 left-[10%] top-[20%]" />
                <div className="crystal-blob w-[400px] h-[400px] bg-accent-600/20 right-[15%] bottom-[10%]" />
            </div>

            <div ref={containerRef} className="container mx-auto px-4 relative z-10 text-center">
                {/* Badge */}
                <div className="animate-enter opacity-0 inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10 cyber-glass">
                    <img src="/logo.png" alt="Ekon Africa" className="w-5 h-5 rounded-full" />
                    <span className="text-sm font-medium text-primary-100 uppercase tracking-widest">
                        AI-Powered Economic Intelligence
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="animate-enter opacity-0 text-6xl md:text-8xl font-display font-bold mb-8 text-white leading-[1.1]">
                    ФАКУЛЬТЕТ ЕКОНОМІКИ <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-[length:200%_auto] animate-gradient-x">
                        ТА УПРАВЛІННЯ
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-enter opacity-0 text-xl text-primary-200/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Unlock the future of African development with expert economic analysis tailored for everyone.
                </p>

                {/* Centerpiece Image */}
                <div ref={crystalRef} className="animate-enter opacity-0 relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto mb-16 perspective-1000">
                    <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full scale-75" />
                    <Image
                        src="/logo.png"
                        alt="Ekon Africa Logo"
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(139,92,246,0.5)] transform-gpu"
                        style={{ filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3)) brightness(1.1)' }}
                    />
                </div>

                {/* CTA Buttons */}
                <div className="animate-enter opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/chat"
                        className="group relative bg-primary-600 hover:bg-primary-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)] flex items-center space-x-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span>Ask Ekon Anything</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="cyber-glass text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/10 border border-white/20"
                    >
                        Explore Metrics
                    </Link>
                </div>
            </div>

            {/* Scrolling Ribbon ribbons */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden rotate-[-2deg] bg-primary-600/10 backdrop-blur-sm border-y border-white/5 py-3">
                <div className="flex whitespace-nowrap animate-scroll">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center space-x-12 px-6">
                            <span className="text-white/60 font-mono text-sm tracking-tighter uppercase font-bold">GDP ANALYSIS +</span>
                            <span className="text-white/60 font-mono text-sm tracking-tighter uppercase font-bold">INFLATION TRACKING +</span>
                            <span className="text-white/60 font-mono text-sm tracking-tighter uppercase font-bold">SCENARIO PLANNING +</span>
                            <span className="text-white/60 font-mono text-sm tracking-tighter uppercase font-bold">TRADE INSIGHTS +</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
