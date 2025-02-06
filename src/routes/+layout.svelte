<script lang="ts">
	import '../app.css'
	let { children } = $props()
</script>

<div class="h-screen w-full bg-[url(/bg.jpg)] bg-cover text-white">
	{@render children()}
</div>
