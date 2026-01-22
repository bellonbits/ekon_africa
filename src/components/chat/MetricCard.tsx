'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface MetricCardProps {
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down' | 'neutral'
    description?: string
}

export default function MetricCard({
    label,
    value,
    change,
    trend = 'neutral',
    description
}: MetricCardProps) {
    const isUp = trend === 'up'
    const isDown = trend === 'down'

    return (
        <div className="cyber-glass rounded-2xl p-6 border border-white/10 my-4 animate-up max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-300/60">
                    {label}
                </span>
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-primary-400'
                    }`}>
                    {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                </div>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                    {value}
                </h3>
                {change && (
                    <span className={`text-sm font-bold ${isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-primary-300/40'
                        }`}>
                        {change}
                    </span>
                )}
            </div>

            {description && (
                <p className="text-sm text-primary-200/60 leading-relaxed italic">
                    {description}
                </p>
            )}

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-primary-300/20">
                    Ekon Verified Metric
                </span>
            </div>
        </div>
    )
}
