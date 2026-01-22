'use client'

import ChatInterface from '@/components/chat/ChatInterface'
import { Sparkles, History, Settings, Info } from 'lucide-react'

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-background cyber-grid flex">
            {/* Minimalist Sidebar */}
            <aside className="w-20 hidden md:flex flex-col items-center py-8 border-r border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mb-12 shadow-[0_0_20px_-5px_rgba(139,92,246,0.6)]">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>

                <nav className="flex flex-col space-y-8">
                    <button className="p-3 text-primary-400 bg-primary-500/10 rounded-xl hover:text-white transition-colors">
                        <History className="w-6 h-6" />
                    </button>
                    <button className="p-3 text-primary-200/40 hover:text-white transition-colors">
                        <Settings className="w-6 h-6" />
                    </button>
                    <button className="p-3 text-primary-200/40 hover:text-white transition-colors">
                        <Info className="w-6 h-6" />
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center relative">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-primary-600/5 blur-[120px] pointer-events-none rounded-full" />

                <div className="container max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col relative z-10">
                    <ChatInterface />
                </div>
            </main>
        </div>
    )
}
