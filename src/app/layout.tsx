import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Ekon Africa - African Economic Expertise',
    description: 'Expert economic analysis and education for African economies. Learn about GDP, inflation, trade, and development with AI-powered insights.',
    keywords: ['African economics', 'economic analysis', 'GDP', 'inflation', 'development economics', 'African development'],
    authors: [{ name: 'Ekon Africa' }],
    openGraph: {
        title: 'Ekon Africa - African Economic Expertise',
        description: 'Expert economic analysis and education for African economies',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
