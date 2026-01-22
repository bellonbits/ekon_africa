'use client'

import HeroSection from '@/components/home/HeroSection'
import FeaturesGrid from '@/components/home/FeaturesGrid'
import StatsSection from '@/components/home/StatsSection'

export default function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <FeaturesGrid />
            <StatsSection />
        </div>
    )
}
