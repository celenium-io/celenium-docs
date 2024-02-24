<script setup>
import { useRuntimeConfig } from "#imports"

defineProps({
	id: String,
})

const heading = 1
const { anchorLinks } = useRuntimeConfig().public.content

const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>

<template>
	<h1 :class="$style.wrapper">
		<a v-if="id && generate" :href="`#${id}`">
			<slot />

			<div :id="id" :class="$style.anchor" />
		</a>

		<slot v-else />
	</h1>
</template>

<style module>
.wrapper {
	margin: 0 0 2rem;
}

.anchor {
	display: block;
	position: relative;
	top: -126px;
	visibility: hidden;
}
</style>
