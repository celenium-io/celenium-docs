<script setup>
import { useRuntimeConfig } from "#imports"

defineProps({
	id: String,
})

const heading = 3
const { anchorLinks } = useRuntimeConfig().public.content

const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>

<template>
	<h3 :class="$style.wrapper">
		<a v-if="id && generate" :href="`#${id}`">
			<Flex align="center" gap="8">
				<slot />
				<Icon name="anchor" size="16" color="tertiary" :class="$style.anchor_icon" />
			</Flex>

			<div :id="id" :class="$style.anchor" />
		</a>
		<slot v-else />
	</h3>
</template>

<style module>
.wrapper {
	margin: 2rem 0 1rem;
}

.wrapper:hover .anchor_icon {
	opacity: 1;
}

.anchor {
	display: block;
	position: relative;
	top: -126px;
	visibility: hidden;
}

.anchor_icon {
	cursor: pointer;
	opacity: 0;

	transition: all 0.2s var(--bezier);
}
</style>
