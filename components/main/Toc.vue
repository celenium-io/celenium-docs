<script setup>
/**
 * Components
 */
import TocLinks from "./TocLinks.vue"

const route = useRoute()

const { data, refresh } = await useAsyncData(`${route.path}-toc`, () => queryCollection("content").path(route.path).first())

watch(
	() => route.path,
	() => {
		refresh()
	},
)

const show = ref(true)
</script>

<template>
	<Flex v-if="data.body.toc.links.length" direction="column" gap="12" :class="$style.wrapper">
		<Flex align="center" gap="8" :class="$style.header">
			<Text @click="show = !show" size="13" weight="600" color="tertiary">On this page</Text>
			<Icon name="chevron-down" size="12" color="secondary" :style="{ transform: `rotate(${show ? '180' : '0'}deg)` }" />
		</Flex>

		<TocLinks v-if="show" :links="data.body.toc.links" :class="$style.links" />
	</Flex>
</template>

<style module>
.wrapper {
	position: fixed;
	top: 124px;
	right: 0;

	overflow-y: auto;
	height: calc(100vh - 64px - 32px);
	min-width: 220px;
	max-width: 220px;

	box-sizing: content-box;

	margin: 0 64px 0 32px;
	padding: 0 8px;
}

.wrapper::-webkit-scrollbar {
	display: none;
}

.header {
	cursor: pointer;
}

.links {
	margin-left: -8px;
}

@media (max-width: 1600px) {
	.wrapper {
		position: initial;
		height: initial;

		width: 100%;
		min-width: initial;
		max-width: 770px;

		margin: 0 auto;
		margin-top: 32px;
	}
}
</style>
