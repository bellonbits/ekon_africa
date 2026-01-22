import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant'
    content: string
}

export interface ChatCompletionOptions {
    messages: ChatMessage[]
    temperature?: number
    maxTokens?: number
    stream?: boolean
}

export async function createChatCompletion(options: ChatCompletionOptions) {
    const {
        messages,
        temperature = 0.7,
        maxTokens = 2048,
        stream = false,
    } = options

    try {
        const completion = await groq.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages,
            temperature,
            max_tokens: maxTokens,
            stream,
        })

        return completion
    } catch (error) {
        console.error('Groq API Error:', error)
        throw new Error('Failed to generate response from AI')
    }
}

export async function createStreamingChatCompletion(options: ChatCompletionOptions) {
    const {
        messages,
        temperature = 0.7,
        maxTokens = 2048,
    } = options

    try {
        const stream = await groq.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages,
            temperature,
            max_tokens: maxTokens,
            stream: true,
        })

        return stream
    } catch (error) {
        console.error('Groq API Error:', error)
        throw new Error('Failed to generate streaming response from AI')
    }
}
