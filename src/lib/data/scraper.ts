import * as cheerio from 'cheerio'

export interface CountryData {
    gdp: number // in billions
    population: number
    gdpPerCapita: number
    growthRate: number
}

export interface EconomicData {
    [countryCode: string]: CountryData
}

// Map Worldometer country names to our ISO codes
const COUNTRY_MAPPING: { [key: string]: string } = {
    'Kenya': 'KEN',
    'Nigeria': 'NGA',
    'South Africa': 'ZAF',
    'Egypt': 'EGY',
    'Ethiopia': 'ETH',
    'Ghana': 'GHA',
    'Tanzania': 'TZA',
    'Uganda': 'UGA',
    'Rwanda': 'RWA',
    'Senegal': 'SEN'
}

export async function fetchWorldometerData(): Promise<EconomicData> {
    const data: EconomicData = {}

    try {
        // 1. Fetch GDP Data
        const gdpResponse = await fetch('https://www.worldometers.info/gdp/gdp-by-country/')
        const gdpHtml = await gdpResponse.text()
        const $gdp = cheerio.load(gdpHtml)

        // Parse GDP table
        $gdp('#example2 tbody tr').each((_, row) => {
            const columns = $gdp(row).find('td')
            const countryName = $gdp(columns[1]).text().trim()

            if (COUNTRY_MAPPING[countryName]) {
                const code = COUNTRY_MAPPING[countryName]
                const gdpText = $gdp(columns[2]).text().trim() // e.g., "$101,043,000,000"

                // Clean and convert GDP to billions
                const gdpValue = parseFloat(gdpText.replace(/[\$,]/g, '')) / 1000000000

                if (!data[code]) {
                    data[code] = { gdp: 0, population: 0, gdpPerCapita: 0, growthRate: 0 }
                }
                data[code].gdp = gdpValue
            }
        })

        // 2. Fetch Population Data
        const popResponse = await fetch('https://www.worldometers.info/world-population/population-by-country/')
        const popHtml = await popResponse.text()
        const $pop = cheerio.load(popHtml)

        // Parse Population table
        $pop('#example2 tbody tr').each((_, row) => {
            const columns = $pop(row).find('td')
            const countryName = $pop(columns[1]).text().trim()

            if (COUNTRY_MAPPING[countryName]) {
                const code = COUNTRY_MAPPING[countryName]
                const popText = $pop(columns[2]).text().trim() // e.g., "54,985,698"

                const popValue = parseInt(popText.replace(/,/g, ''), 10)

                if (data[code]) {
                    data[code].population = popValue
                    // Calculate per capita if we have both
                    if (data[code].gdp > 0) {
                        data[code].gdpPerCapita = (data[code].gdp * 1000000000) / popValue
                    }
                }
            }
        })

        return data
    } catch (error) {
        console.error('Error scraping Worldometer:', error)
        return {}
    }
}
