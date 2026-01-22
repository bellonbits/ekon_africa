import { NextRequest, NextResponse } from 'next/server'
import { buildMessages, type AudienceMode } from '@/lib/ai/prompt-builder'
import { createStreamingChatCompletion } from '@/lib/ai/client'

export const runtime = 'edge'

interface ChatRequestBody {
    message: string
    mode: AudienceMode
    history?: Array<{ role: 'user' | 'assistant'; content: string }>
}

export async function POST(req: NextRequest) {
    try {
        const body: ChatRequestBody = await req.json()
        const { message, mode, history } = body

        if (!message || !mode) {
            return NextResponse.json(
                { error: 'Message and mode are required' },
                { status: 400 }
            )
        }

        // Build messages with system prompt
        const messages = buildMessages({ mode, history }, message)

        // Create streaming response
        const stream = await createStreamingChatCompletion({ messages })

        // Create a readable stream for the response
        const encoder = new TextEncoder()
        const customStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content || ''
                        if (content) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                } catch (error) {
                    console.error('Streaming error:', error)
                    controller.error(error)
                }
            },
        })

        return new Response(customStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        })
    } catch (error) {
        console.error('Chat API error:', error)
        return NextResponse.json(
            { error: 'Failed to process chat request' },
            { status: 500 }
        )
    }
}
