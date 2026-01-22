import { fetchWorldometerData } from '@/lib/data/scraper'
import countries from '@/data/countries.json'
import indicators from '@/data/indicators.json'
import DashboardClient from '@/components/dashboard/DashboardClient'

export const revalidate = 3600 // Revalidate every hour

export default async function DashboardPage() {
    // Fetch real-time data
    const realTimeData = await fetchWorldometerData()

    // Merge with historical data
    const mergedIndicators: typeof indicators = JSON.parse(JSON.stringify(indicators))

    Object.keys(mergedIndicators).forEach((key) => {
        const code = key as keyof typeof indicators
        if (realTimeData[code]) {
            const countryData = realTimeData[code]
            const indicator = mergedIndicators[code]

            // Update GDP (2025 or latest)
            if (countryData.gdp > 0) {
                // Check if 2025 entry exists
                const lastEntry = indicator.gdp[indicator.gdp.length - 1]
                // If the last entry is old, or we want to overwrite/append current year
                if (lastEntry.year < 2025) {
                    indicator.gdp.push({
                        year: 2025,
                        value: countryData.gdp
                    })
                } else if (lastEntry.year === 2025) {
                    lastEntry.value = countryData.gdp
                }
            }

            // We could also update population-based metrics if we had per capita calculation here
            // But for now GDP is the main direct indicator we scrap
        }
    })

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        Economic Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Track key economic indicators across African countries (Live Worldometer Data)
                    </p>
                </div>

                <DashboardClient initialData={mergedIndicators} countries={countries} />
            </div>
        </div>
    )
}
