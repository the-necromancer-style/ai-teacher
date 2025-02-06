<script lang="ts">
	import { generateText } from '$lib/gemini'

	let replies: string[] = []
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const formData = new FormData(form)
		const textAreaValue = formData.get('message') as string
		form.reset()
		replies = [...replies, await generateText(textAreaValue)]
	}
</script>

<div class="flex h-screen flex-col">
	<div class="flex-grow overflow-y-auto rounded-lg p-4 shadow-sm">
		<div class="space-y-4">
			<div class="self-start rounded-lg bg-blue-100 p-3 shadow">
				<p class="text-md text-gray-800">Hello! How can I assist you today?</p>
			</div>
			{#each replies as reply}
				<div class="self-start rounded-lg bg-blue-100 p-3 shadow">
					<p class="text-md text-gray-800">{reply}</p>
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
