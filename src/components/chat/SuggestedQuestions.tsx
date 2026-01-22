'use client'

import { Sparkles } from 'lucide-react'
import type { AudienceMode } from '@/lib/ai/prompt-builder'

interface SuggestedQuestionsProps {
    onQuestionClick: (question: string) => void
    mode: AudienceMode
}

const questions = {
    child: [
        "What is inflation and why do prices go up?",
        "How do countries make money?",
        "Why do some African countries have more money than others?",
        "What happens when a country borrows too much money?",
    ],
    adult: [
        "What are the main drivers of inflation in East Africa?",
        "How does currency devaluation affect ordinary citizens?",
        "What role does agriculture play in African GDP?",
        "How has debt affected African economic development?",
    ],
    expert: [
        "Analyze the impact of structural adjustment programs on African economies",
        "Compare monetary policy effectiveness across African central banks",
        "Evaluate the relationship between informal economy size and tax revenue",
        "Assess debt sustainability in Sub-Saharan Africa using DSA frameworks",
    ],
}

export default function SuggestedQuestions({ onQuestionClick, mode }: SuggestedQuestionsProps) {
    const modeQuestions = questions[mode]

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Suggested Questions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {modeQuestions.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionClick(question)}
                        className="text-left p-4 rounded-xl cyber-glass border border-white/5 hover:border-primary-500/50 hover:shadow-lg transition-all duration-200 group"
                    >
                        <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {question}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}
