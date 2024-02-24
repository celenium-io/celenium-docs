<script setup>
import { useRuntimeConfig } from "#imports"

defineProps({
	id: String,
})

const heading = 2
const { anchorLinks } = useRuntimeConfig().public.content

const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>

<template>
	<h2 :class="$style.wrapper">
		<a v-if="id && generate" :href="`#${id}`" id="head">
			<Flex align="center" gap="8">
				<slot />
				<Icon name="anchor" size="16" color="tertiary" :class="$style.anchor_icon" />
			</Flex>

			<div :id="id" :class="$style.anchor" />
		</a>
		<slot v-else />
	</h2>
</template>

<style module>
.wrapper {
	margin: 3rem 0 1rem;
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
