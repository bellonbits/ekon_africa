'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Sparkles } from 'lucide-react'
import { ChatMessage } from '@/lib/ai/client'

interface MessageBubbleProps {
    message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${isUser
                        ? 'bg-gradient-to-br from-indigo-500 to-primary-600'
                        : 'bg-gradient-to-br from-primary-600 to-accent-600'
                    }`}>
                    {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                </div>

                {/* Content Bubble */}
                <div className={`relative px-6 py-4 rounded-[2rem] border ${isUser
                        ? 'bg-primary-600/80 border-primary-500/50 text-white rounded-tr-none'
                        : 'bg-white/5 backdrop-blur-3xl border-white/10 text-primary-100 rounded-tl-none'
                    }`}>
                    {/* Subtle Internal Glow */}
                    {!isUser && <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none rounded-b-[2rem]" />}

                    <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
