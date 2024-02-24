<script setup>
const props = defineProps({
	href: {
		type: String,
		default: "",
	},
})

const isInternalLink = props.href.startsWith("https://docs.celenium.io") || props.href.startsWith("..")
</script>

<template>
	<NuxtLink :href="href" :target="isInternalLink ? null : '_blank'" :class="$style.wrapper">
		<slot />
	</NuxtLink>
</template>

<style module>
.wrapper {
	color: var(--txt-primary);
	font-weight: 500;

	text-decoration-line: underline;
	text-decoration-thickness: 2px;
	text-underline-offset: 4px;
	text-decoration-color: rgba(10, 222, 113, 35%);

	transition: text-decoration-color 0.2s ease;
}

.wrapper:hover {
	text-decoration-color: var(--green);
}
</style>
