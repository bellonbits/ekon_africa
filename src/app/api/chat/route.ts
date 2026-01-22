import { Groq } from 'groq-sdk'
import { buildMessages } from '@/lib/ai/prompt-builder'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
    try {
        const { message, mode, history } = await req.json()

        const messages = buildMessages({ mode, history }, message)

        const stream = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: messages.map(m => ({
                role: m.role as any,
                content: m.content as string
            })),
            stream: true,
        })

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
    } catch (error: any) {
        console.error('Chat API Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
