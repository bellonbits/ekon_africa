'use client'

import React from 'react'
import { Image as ImageIcon, Sparkles } from 'lucide-react'

interface IllustrationCardProps {
    concept: string
    description: string
    imageUrl?: string
    accentColor?: string
}

export default function IllustrationCard({
    concept,
    description,
    imageUrl,
    accentColor = '#8b5cf6'
}: IllustrationCardProps) {
    return (
        <div className="cyber-glass rounded-3xl p-6 border border-white/10 my-6 animate-up overflow-hidden max-w-xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary-500/20 border border-primary-500/30">
                    <ImageIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                    {concept}
                </h3>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/5 bg-white/5 group">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={concept}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-primary-300/20 p-8 text-center">
                        <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
                        <p className="text-sm font-medium uppercase tracking-tighter">
                            Visualizing conceptual model for {concept}...
                        </p>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            </div>

            <p className="text-sm text-primary-200/70 leading-relaxed">
                {description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400/40">
                        Generative Illustration
                    </span>
                </div>
                <div className="text-[10px] font-mono text-primary-300/20 italic">
                    AI-Synthesized Scene
                </div>
            </div>
        </div>
    )
}
