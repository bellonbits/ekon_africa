'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, MessageSquare, BarChart3, TrendingUp, Lightbulb } from 'lucide-react'
import { animate, stagger } from 'animejs'
import MessageBubble from './MessageBubble'
import AudienceModeSelector from './AudienceModeSelector'
import { AudienceMode } from '@/lib/ai/prompt-builder'

const SUGGESTED_PROMPTS = [
    { text: "Help me to understand African GDP growth", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
    { text: "Explain inflation in simple terms", icon: Lightbulb, color: "from-purple-500 to-indigo-500" },
    { text: "Predict future economic scenarios", icon: TrendingUp, color: "from-orange-500 to-pink-500" }
]

export default function ChatInterface() {
    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<AudienceMode>('adult')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const emptyStateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messages.length === 0 && emptyStateRef.current) {
            animate(emptyStateRef.current.querySelectorAll('.animate-up'), {
                translateY: [20, 0],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 600,
                easing: 'easeOutExpo'
            })
        }
    }, [messages.length])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isLoading) return

        const userMsg = { role: 'user', content: text }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    mode,
                    history: messages
                }),
            })

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
        } catch (error) {
            console.error('Chat error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto h-[80vh] md:h-[85vh]">
            <div className="mb-8 flex justify-center">
                <AudienceModeSelector currentMode={mode} onModeChange={setMode} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide">
                {messages.length === 0 ? (
                    <div ref={emptyStateRef} className="h-full flex flex-col items-center justify-center py-12">
                        <div className="animate-up opacity-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="animate-up opacity-0 text-3xl md:text-5xl font-display font-bold text-white mb-4">
                            How can I help?
                        </h2>

                        <p className="animate-up opacity-0 text-primary-200/60 text-lg mb-12">
                            Select a topic below or start typing to begin
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                            {SUGGESTED_PROMPTS.map((prompt) => {
                                const Icon = prompt.icon
                                return (
                                    <button
                                        key={prompt.text}
                                        onClick={() => handleSend(prompt.text)}
                                        className="animate-up opacity-0 cyber-glass p-6 rounded-2xl group hover:border-primary-500/50 transition-all text-left flex flex-col space-y-4"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prompt.color} flex items-center justify-center group-hover:neon-glow-purple transition-all`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-primary-100/90 leading-tight">
                                            {prompt.text}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, i) => (
                            <MessageBubble key={i} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="flex items-center space-x-2 text-gray-500 p-4 cyber-glass rounded-2xl w-fit">
                                <Sparkles className="w-4 h-4 animate-spin text-primary-400" />
                                <span className="text-sm font-medium text-primary-200">Ekon is thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Bar */}
            <div className="p-6 relative">
                <div className="absolute inset-x-6 -top-10 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />

                <div className="relative max-w-3xl mx-auto flex items-center bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-2 shadow-2xl group focus-within:border-primary-500/50 transition-all duration-300">
                    <div className="p-3 text-primary-200/40">
                        <MessageSquare className="w-6 h-6" />
                    </div>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything about African economies..."
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-primary-200/30 flex-1 px-4 text-lg"
                    />

                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 p-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Send className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}
