'use client'

import Link from 'next/link'
import { TrendingUp, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-background border-t border-white/5 text-white mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 overflow-hidden rounded-xl border border-white/10">
                                <img src="/logo.png" alt="Ekon Africa Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-display font-bold">Ekon Africa</span>
                        </div>
                        <p className="text-gray-300 max-w-md mb-4">
                            Expert economic analysis and education for African economies.
                            Making complex economics accessible to everyone.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/chat" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Ask Ekon
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/scenarios" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Scenarios
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Learn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-display font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                    <p>© {currentYear} Ekon Africa. All rights reserved.</p>
                    <p className="mt-2 text-sm">
                        Built with ❤️ for African economic education
                    </p>
                </div>
            </div>
        </footer>
    )
}
