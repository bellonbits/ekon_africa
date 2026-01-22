'use client'

import { useState, useRef, useEffect } from 'react'
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Globe,
    Search,
    ChevronRight,
    Wallet
} from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'
import { formatNumber, formatPercentage } from '@/lib/utils'
import { animate, stagger } from 'animejs'

interface DashboardClientProps {
    initialData: any
    countries: any[]
}

export default function DashboardClient({ initialData, countries }: DashboardClientProps) {
    const [selectedCountry, setSelectedCountry] = useState('KEN')
    const containerRef = useRef<HTMLDivElement>(null)

    // Entrance Animations
    useEffect(() => {
        if (!containerRef.current) return

        animate(containerRef.current.querySelectorAll('.animate-up'), {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: stagger(80),
            duration: 800,
            easing: 'easeOutExpo',
        })
    }, [selectedCountry])

    const countryData = initialData[selectedCountry]
    const countryInfo = countries.find(c => c.code === selectedCountry)

    // Latest Values
    const latestGDP = countryData.gdp[countryData.gdp.length - 1]
    const latestInflation = countryData.inflation[countryData.inflation.length - 1]
    const latestUnemployment = countryData.unemployment[countryData.unemployment.length - 1]
    const latestDebt = countryData.debt[countryData.debt.length - 1]

    // Trends (comparing with previous year)
    const gdpPrev = countryData.gdp[countryData.gdp.length - 2]?.value || latestGDP.value
    const gdpGrowth = ((latestGDP.value - gdpPrev) / gdpPrev) * 100

    const inflationPrev = countryData.inflation[countryData.inflation.length - 2]?.value || latestInflation.value
    const inflationDiff = latestInflation.value - inflationPrev

    return (
        <div ref={containerRef} className="space-y-10 pb-20">
            {/* --- TOP HERO SECTION --- */}
            <header className="animate-up opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-primary-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                            {countryInfo?.name} <span className="text-primary-500/50">Inc.</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary-200/60">
                            • Regional Hub
                        </div>
                        <div className="text-sm text-primary-100/40">
                            Last dynamic sync: 2 hours ago
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-100/30 group-focus-within:text-primary-400 transition-colors" />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="pl-11 pr-10 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-3xl text-white font-bold appearance-none hover:border-primary-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                            {countries.map(country => (
                                <option key={country.code} value={country.code} className="bg-black text-white">
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-100/30 rotate-90" />
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold text-white transition-all">
                        View all
                    </button>
                </div>
            </header>

            {/* --- PRIMARY STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Total Volume (GDP) */}
                <div className="animate-up opacity-0 space-y-4 group">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary-100/40">
                        Total Economic Volume
                    </div>
                    <div className="text-5xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                        {latestGDP.value.toFixed(2)}B
                    </div>
                    <div className="flex items-center space-x-8 pt-2">
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Growth Rate</div>
                            <div className={`text-sm font-bold flex items-center ${gdpGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {gdpGrowth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {Math.abs(gdpGrowth).toFixed(1)}%
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Fiscal Status</div>
                            <div className="text-sm font-bold text-white/60">Active</div>
                        </div>
                    </div>
                </div>

                {/* Available Balance (Relative GDP / Resource Proxy) */}
                <div className="animate-up opacity-0 space-y-4 group">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary-100/40">
                        Debt Sustainability (17%)
                    </div>
                    <div className="text-5xl font-display font-bold text-white">
                        {latestDebt.value.toFixed(1)}%
                    </div>
                    <div className="flex items-center space-x-8 pt-2">
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Reserves</div>
                            <div className="text-sm font-bold text-white/60">$2.4B USD</div>
                        </div>
                        <div className="flex -space-x-1.5 pt-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full border border-black ${i === 4 ? 'bg-white/10' : 'bg-primary-500'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Operational Costs (Inflation Proxy) */}
                <div className="animate-up opacity-0 space-y-4 group">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary-100/40">
                        Market Volatility
                    </div>
                    <div className="text-5xl font-display font-bold text-white">
                        {latestInflation.value.toFixed(1)}%
                    </div>
                    <div className="flex items-center space-x-8 pt-2">
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Price Index</div>
                            <div className="text-sm font-bold text-white/60">1,222.75</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Currency</div>
                            <div className="text-sm font-bold text-white/60">{countryInfo?.currency || 'KSh'}</div>
                        </div>
                    </div>
                </div>

                {/* Pending Settlements (Trade Balance Proxy) */}
                <div className="animate-up opacity-0 space-y-4 group">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary-100/40">
                        Unemployment Gap
                    </div>
                    <div className="text-5xl font-display font-bold text-white">
                        {latestUnemployment.value.toFixed(1)}%
                    </div>
                    <div className="flex items-center space-x-8 pt-2">
                        <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-primary-100/20">Job Market</div>
                            <div className="text-sm font-bold text-white/60">Stable</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MIDDLE SECTION: WALLETS & TABS --- */}
            <div className="space-y-6 pt-10">
                <div className="animate-up opacity-0 flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-8">
                        <button className="text-sm font-bold text-white border-b-2 border-primary-500 pb-4 -mb-[18px]">
                            Indicator Wallets
                        </button>
                        <button className="text-sm font-bold text-primary-200/30 hover:text-white transition-colors pb-4 -mb-[18px]">
                            Tracked Indices
                        </button>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-primary-200/60 hover:text-white cursor-pointer transition-colors text-sm font-bold">
                            <Activity className="w-4 h-4" />
                            <span>Transfer</span>
                        </div>
                        <div className="flex items-center space-x-2 text-primary-200/60 hover:text-white cursor-pointer transition-colors text-sm font-bold">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Convert</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* GDP Wallet */}
                    <div className="animate-up opacity-0 cyber-glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-primary-500/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-primary-100/20 font-display font-bold">•••• 4567</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-bold text-primary-100/40 uppercase">Economic Output</div>
                            <div className="text-3xl font-display font-bold text-white">
                                <span className="text-primary-500">$</span> {latestGDP.value.toFixed(2)}B
                            </div>
                        </div>
                    </div>

                    {/* Inflation Wallet */}
                    <div className="animate-up opacity-0 cyber-glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-accent-500/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-primary-100/20 font-display font-bold">•••• 242B</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-bold text-primary-100/40 uppercase">Consumer Prices</div>
                            <div className="text-3xl font-display font-bold text-white">
                                {latestInflation.value}% <span className="text-xs text-primary-300">YOY</span>
                            </div>
                        </div>
                    </div>

                    {/* Add Wallet Placeholder */}
                    <div className="animate-up opacity-0 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center space-y-4 group hover:border-primary-500/20 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                            <Activity className="w-6 h-6 text-primary-100/20 group-hover:text-primary-400" />
                        </div>
                        <div className="text-sm font-bold text-primary-100/20 group-hover:text-primary-400">ADD INDICATOR</div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM SECTION: CHART & TRENDS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 pt-10">
                <div className="animate-up opacity-0 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                            Performance History
                        </h3>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-primary-500" />
                            <span className="text-xs font-bold text-primary-100/40 uppercase tracking-widest">Growth Analytics</span>
                        </div>
                    </div>

                    <div className="cyber-glass p-8 rounded-[3rem] border border-white/5 h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={countryData.gdp}>
                                <defs>
                                    <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ffffff20', fontSize: 12, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0a0a0a',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                    itemStyle={{ color: '#8b5cf6' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8b5cf6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorGdp)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
