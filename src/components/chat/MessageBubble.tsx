'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Sparkles } from 'lucide-react'
import EconomicChart from './EconomicChart'
import MetricCard from './MetricCard'
import ShapeIllustration from './ShapeIllustration'

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
    id?: string | number
}

interface MessageBubbleProps {
    message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    // Simple parsing logic for Generative UI (EconomicChart)
    // Looking for a specific JSON block in the markdown
    const renderContent = () => {
        // 1. Try new robust double-bracket format first: [[CHART: JSON ]]
        const robustRegex = /\[\[CHART:([\s\S]*?)\]\]/
        // 2. Legacy format for backward compatibility: [ECONOMIC_CHART: JSON ]
        const legacyRegex = /\[ECONOMIC_CHART:([\s\S]*)\]/ // Greedier to handle internal brackets

        let match = message.content.match(robustRegex)
        let currentRegex = robustRegex

        if (!match) {
            match = message.content.match(legacyRegex)
            currentRegex = legacyRegex
        }

        if (match && !isUser) {
            try {
                // For the legacy greedy match, we might have over-captured if there's trailing text
                // But usually the AI sends the chart as a block.
                let jsonStr = match[1].trim()

                // If the greedy match captured extra trailing brackets from the text, 
                // we try to find the last closing brace of the JSON
                if (currentRegex === legacyRegex) {
                    const lastBrace = jsonStr.lastIndexOf('}')
                    if (lastBrace !== -1) {
                        jsonStr = jsonStr.substring(0, lastBrace + 1)
                    }
                }

                const chartData = JSON.parse(jsonStr)
                const cleanContent = message.content.replace(match[0], '').trim()

                return (
                    <div className="flex flex-col gap-4 w-full">
                        {cleanContent && (
                            <div className="relative px-6 py-4 rounded-[2rem] border bg-white/5 backdrop-blur-3xl border-white/10 text-primary-100 rounded-tl-none">
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none rounded-b-[2rem]" />
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {cleanContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                        <div className="w-full max-w-2xl animate-up">
                            <EconomicChart {...chartData} />
                        </div>
                    </div>
                )
            } catch (e) {
                console.error("Failed to parse chart data in MessageBubble", e)
            }
        }

        // 3. Try Metric format: [[METRIC: JSON ]]
        const metricRegex = /\[\[METRIC:([\s\S]*?)\]\]/
        let metricMatch = message.content.match(metricRegex)

        if (metricMatch && !isUser) {
            try {
                const metricData = JSON.parse(metricMatch[1].trim())
                const cleanContent = message.content.replace(metricMatch[0], '').trim()

                return (
                    <div className="flex flex-col gap-4 w-full">
                        {cleanContent && (
                            <div className="relative px-6 py-4 rounded-[2rem] border bg-white/5 backdrop-blur-3xl border-white/10 text-primary-100 rounded-tl-none">
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none rounded-b-[2rem]" />
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {cleanContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                        <div className="w-full max-w-sm animate-up">
                            <MetricCard {...metricData} />
                        </div>
                    </div>
                )
            } catch (e) {
                console.error("Failed to parse metric data in MessageBubble", e)
            }
        }

        // 4. Try Diagram format: [[DIAGRAM: JSON ]]
        const diagramRegex = /\[\[DIAGRAM:([\s\S]*?)\]\]/
        let diagramMatch = message.content.match(diagramRegex)

        if (diagramMatch && !isUser) {
            try {
                const diagramData = JSON.parse(diagramMatch[1].trim())
                const cleanContent = message.content.replace(diagramMatch[0], '').trim()

                return (
                    <div className="flex flex-col gap-4 w-full">
                        {cleanContent && (
                            <div className="relative px-6 py-4 rounded-[2rem] border bg-white/5 backdrop-blur-3xl border-white/10 text-primary-100 rounded-tl-none">
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none rounded-b-[2rem]" />
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {cleanContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                        <div className="w-full animate-up">
                            <ShapeIllustration {...diagramData} />
                        </div>
                    </div>
                )
            } catch (e) {
                console.error("Failed to parse diagram data in MessageBubble", e)
            }
        }

        return (
            <div className={`relative px-6 py-4 rounded-[2rem] border ${isUser
                ? 'bg-primary-600/80 border-primary-500/50 text-white rounded-tr-none'
                : 'bg-white/5 backdrop-blur-3xl border-white/10 text-primary-100 rounded-tl-none'
                }`}>
                {!isUser && <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none rounded-b-[2rem]" />}

                <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${isUser
                    ? 'bg-gradient-to-br from-indigo-500 to-primary-600'
                    : 'bg-gradient-to-br from-primary-600 to-accent-600'
                    }`}>
                    {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                </div>

                {renderContent()}
            </div>
        </div>
    )
}
