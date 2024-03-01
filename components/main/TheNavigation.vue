<script setup>
defineProps({
	toggle: {
		type: Boolean,
		default: false,
	},
})

const { navigation } = useContent()

const route = useRoute()

const highLevelLinks = ref(navigation.value.filter((item) => !item.children))
const blocks = ref({})

/** Find all blocks */
navigation.value
	.filter((item) => item.children)
	.forEach((item) => {
		blocks.value[item.title] = item
	})

const isActiveLink = (link) => {
	return link._path === route.path
}
</script>

<template>
	<Flex :class="[$style.wrapper, toggle && $style.force_show]">
		<Flex direction="column" gap="24" :class="$style.container">
			<Flex direction="column" gap="4" :class="$style.links">
				<NuxtLink v-for="link in highLevelLinks" :to="link._path" :class="[$style.link, isActiveLink(link) && $style.active]">
					<Flex align="center" gap="8">
						<Icon :name="link.icon" size="14" color="secondary" />
						<Text size="13" weight="600" color="primary">{{ link.name }}</Text>
					</Flex>
				</NuxtLink>
			</Flex>

			<Flex v-for="block in blocks" direction="column" gap="8">
				<Text size="12" weight="500" color="tertiary">{{ block.title }}</Text>

				<Flex direction="column" gap="4" :class="$style.links">
					<NuxtLink
						v-for="link in blocks[block.title].children"
						:to="link._path"
						:class="[$style.link, isActiveLink(link) && $style.active]"
					>
						<Flex align="center" gap="8">
							<Icon :name="link.icon" size="14" color="secondary" />
							<Text size="13" weight="600" color="primary">{{ link.name }}</Text>
						</Flex>
					</NuxtLink>
				</Flex>
			</Flex>
		</Flex>
	</Flex>
</template>

<style module>
.wrapper {
	position: sticky;
	top: 56px;
	height: calc(100vh - 56px);

	z-index: 1000;
}

.container {
	width: 220px;

	border-right: 2px solid var(--op-5);

	padding-top: 24px;
	padding-right: 24px;
}

.links {
}

.link {
	border-radius: 6px;
	cursor: pointer;

	padding: 8px;
	margin-left: -8px;

	transition: all 0.2s ease;

	&:hover {
		background: var(--op-8);
	}

	&.active {
		background: var(--op-5);
	}
}

@media (max-width: 800px) {
	.wrapper {
		display: none;
	}

	.wrapper.force_show {
		display: flex;

		position: fixed;
		top: 64px;
		left: 0;
		right: 0;

		min-width: initial;

		& .container {
			background: var(--app-background);
		}
	}

	.container {
		padding: 24px;
	}
}
</style>
