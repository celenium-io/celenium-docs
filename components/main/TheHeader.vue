<script setup>
/** Components */
import Search from "./Search.vue"
</script>

<template>
	<Flex wide justify="center" :class="$style.wrapper">
		<Flex wide align="center" justify="between" :class="$style.container">
			<Flex align="center" gap="24">
				<NuxtLink to="/">
					<Icon name="logo" size="20" color="primary" />
				</NuxtLink>

				<Flex align="center" gap="12">
					<Text size="14" weight="600" color="primary">Docs</Text>
					<Text size="14" weight="600" color="secondary">Guides</Text>
					<Text size="14" weight="600" color="secondary">API</Text>
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
}

.container {
	max-width: 1420px;

	a {
		display: flex;
	}
}
</style>
