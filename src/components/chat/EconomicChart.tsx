'use client'

import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Info } from 'lucide-react'

interface DataPoint {
    label: string
    value: number
}

interface EconomicChartProps {
    title: string
    description?: string
    data: DataPoint[]
    unit?: string
    color?: string
}

export default function EconomicChart({
    title,
    description,
    data,
    unit = '',
    color = '#8b5cf6',
}: EconomicChartProps) {
    return (
        <div className="w-full cyber-glass rounded-3xl p-6 border border-white/10 my-6 animate-up overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary-400" />
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-primary-200/60 font-medium">
                            {description}
                        </p>
                    )}
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <Info className="w-4 h-4 text-primary-300/40" />
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            tickFormatter={(v) => `${v}${unit}`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(10, 5, 20, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                            }}
                            itemStyle={{ color: '#8b5cf6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-primary-300/30">
                <span>Ekon Intelligence Engine</span>
                <span>Real-time Synthesis</span>
            </div>
        </div>
    )
}
