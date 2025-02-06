import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyBEvFJbjUVoL0aT6g9lwz4TuUG3qsqHNZ4')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export async function generateText(prompt: string) {
	const result = await model.generateContent(prompt)
	return result.response.text()
}
