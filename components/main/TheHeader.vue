<script setup>
/** Components */
import Search from "./Search.vue"

const emit = defineEmits(["toggleNavigation"])
defineProps({
	showNavigation: Boolean,
})
</script>

<template>
	<Flex wide justify="center" :class="$style.wrapper">
		<Flex wide align="center" justify="between" :class="$style.container">
			<Flex align="center" gap="12">
				<Icon
					@click="emit('toggleNavigation')"
					:name="showNavigation ? 'close' : 'menu'"
					size="16"
					color="secondary"
					:class="$style.menu_icon"
				/>

				<NuxtLink to="/">
					<Icon name="logo" size="20" color="primary" />
				</NuxtLink>

				<Flex align="center" gap="12">
					<Text size="14" weight="600" color="primary">Docs</Text>
				</Flex>
			</Flex>

			<Search />
		</Flex>
	</Flex>
</template>

<style module>
.wrapper {
	position: sticky;
	top: 0;
	z-index: 100;

	height: 56px;

	background: var(--app-background);
	border-bottom: 2px solid var(--op-5);

	padding: 0 24px;
}

.container {
	max-width: 1420px;

	a {
		display: flex;
	}
}

.menu_icon {
	display: none;

	box-sizing: content-box;
	border-radius: 6px;
	background: var(--op-05);
	cursor: pointer;

	padding: 8px;

	transition: all 0.2s var(--bezier);
}

.menu_icon:hover {
	background: var(--op-10);
}

@media (max-width: 800px) {
	.menu_icon {
		display: initial;
	}
}

@media (max-width: 500px) {
	.wrapper {
		padding: 0 12px;
	}
}
</style>
