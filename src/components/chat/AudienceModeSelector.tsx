'use client'

import { Baby, User, GraduationCap } from 'lucide-react'
import type { AudienceMode } from '@/lib/ai/prompt-builder'

interface AudienceModeSelectorProps {
    mode: AudienceMode
    onModeChange: (mode: AudienceMode) => void
}

const modes = [
    {
        value: 'child' as AudienceMode,
        label: 'Child',
        icon: Baby,
        description: 'Simple explanations',
        color: 'from-pink-500 to-purple-500',
    },
    {
        value: 'adult' as AudienceMode,
        label: 'Adult',
        icon: User,
        description: 'Balanced detail',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        value: 'expert' as AudienceMode,
        label: 'Expert',
        icon: GraduationCap,
        description: 'Technical analysis',
        color: 'from-orange-500 to-red-500',
    },
]

export default function AudienceModeSelector({ currentMode, onModeChange }: { currentMode: AudienceMode; onModeChange: (mode: AudienceMode) => void }) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-3 gap-2">
                {modes.map(m => {
                    const Icon = m.icon
                    const isActive = currentMode === m.value
                    return (
                        <button
                            key={m.value}
                            onClick={() => onModeChange(m.value)}
                            className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${isActive
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                                : 'border-gray-200 dark:border-earth-600 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-earth-800'
                                }`}
                        >
                            <div className="flex flex-col items-center space-y-1">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center ${isActive ? 'scale-110' : ''
                                    } transition-transform`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {m.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {m.description}
                                </div>
                            </div>
                            {isActive && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
