<script lang="ts">
	import gemini from '$lib/gemini'

	let messages: { role: 'user' | 'assistant'; content: string }[] = [
		{ role: 'assistant', content: 'Hello! How can I assist you today?' }
	]
	let currentReply = ''

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const formData = new FormData(form)
		const prompt = formData.get('message') as string
		form.reset()

		messages.push({ role: 'user', content: prompt })
		currentReply = ''

		const geminiMessages = messages.map((msg) => ({
			role: msg.role,
			parts: [{ text: msg.content }] 
		}))

		const result = await gemini.generateContentStream({ contents: geminiMessages }) 
		for await (const chunk of result.stream) {
			const chunkText = chunk.text()
			currentReply += chunkText
			messages[messages.length - 1] = { role: 'assistant', content: currentReply }
			messages = messages
		}
	}
</script>

<div class="flex h-screen flex-col">
	<div class="flex-grow overflow-y-auto rounded-lg p-4 shadow-sm">
		<div class="space-y-4">
			{#each messages as message}
				<div
					class="self-start rounded-lg bg-blue-100 p-3 shadow"
					class:bg-blue-200={message.role === 'user'}
				>
					<p class="text-md text-gray-800">{message.content}</p>
				</div>
			{/each}
		</div>
	</div>

	<form on:submit={handleSubmit} class="flex items-center p-4">
		<input
			name="message"
			class="flex-grow resize-none rounded-md bg-black p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white"
			placeholder="Type your message..."
		/>
		<button type="submit" class="ml-2 rounded-md bg-black px-4 py-2 font-semibold text-white">
			Send
		</button>
	</form>
</div>
