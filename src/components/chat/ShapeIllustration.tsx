'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

type ShapeType = 'circle' | 'square' | 'hexagon' | 'diamond'

interface DiagramElement {
    type: ShapeType
    icon: string
    label: string
    color: string
    x: number // 0-100 percentage
    y: number // 0-100 percentage
}

interface ShapeIllustrationProps {
    title: string
    elements: DiagramElement[]
}

const ShapeIcon = ({ name, color, className }: { name: string, color: string, className?: string }) => {
    const IconComponent = (Icons as any)[name] || Icons.HelpCircle
    return <IconComponent size={24} color={color} className={className} />
}

export default function ShapeIllustration({ title, elements }: ShapeIllustrationProps) {
    return (
        <div className="w-full cyber-glass rounded-[2rem] p-8 border border-white/10 my-6 animate-up overflow-hidden">
            <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                <Icons.Layers className="w-5 h-5 text-primary-400" />
                {title}
            </h3>

            <div className="relative aspect-[21/9] w-full bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                {elements.map((el, i) => (
                    <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-help transition-all duration-500 hover:scale-110"
                        style={{ left: `${el.x}%`, top: `${el.y}%` }}
                    >
                        {/* Shape Container */}
                        <div className="relative flex flex-col items-center">
                            <div
                                className={`w-16 h-16 flex items-center justify-center relative backdrop-blur-md border shadow-2xl transition-all duration-300 group-hover:neon-glow-purple`}
                                style={{
                                    borderColor: `${el.color}40`,
                                    background: `${el.color}10`,
                                    borderRadius: el.type === 'circle' ? '9999px' : el.type === 'square' ? '1rem' : '0'
                                }}
                            >
                                {/* Hexagon clip-path logic */}
                                {el.type === 'hexagon' && (
                                    <div className="absolute inset-0 bg-inherit border border-inherit"
                                        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
                                )}
                                {el.type === 'diamond' && (
                                    <div className="absolute inset-0 bg-inherit border border-inherit rotate-45 scale-75" />
                                )}

                                <ShapeIcon name={el.icon} color={el.color} className="relative z-10" />
                            </div>

                            {/* Label */}
                            <div className="mt-3 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm shadow-xl">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                                    {el.label}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icons.Cpu className="w-3 h-3 text-primary-400/40" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-primary-300/20">
                        Dynamic Conceptual Logic
                    </span>
                </div>
                <div className="text-[10px] font-mono text-primary-300/10 italic">
                    Vectorized Synthesis V1.0
                </div>
            </div>
        </div>
    )
}
