<script setup>
/** Components */
import Search from "./Search.vue"

/** Store */
import { useAppStore } from "@/store/app"
const appStore = useAppStore()

const emit = defineEmits(["toggleNavigation"])
defineProps({
	showNavigation: Boolean,
})

let root

onMounted(() => {
	root = document.querySelector("html")

	if (!localStorage.theme) {
		localStorage.theme = "dark"
	}

	switch (localStorage.theme) {
		case "dark":
		case "dimmed":
		case "light":
			appStore.theme = localStorage.theme
			root.setAttribute("theme", appStore.theme)

			break
	}
})

const toggleTheme = () => {
	const target = appStore.theme === "dark" ? "light" : "dark"
	root.setAttribute("theme", target)
	appStore.theme = target
	localStorage.theme = target
}
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

			<Flex align="center" gap="8">
				<Search />

				<Icon
					@click="toggleTheme"
					:name="appStore.theme === 'dark' ? 'sun' : 'moon'"
					size="16"
					color="primary"
					:class="$style.theme_btn"
				/>
			</Flex>
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

.theme_btn {
	height: 32px;
	box-sizing: content-box;

	border-radius: 8px;
	background: var(--op-5);
	box-shadow: inset 0 0 0 1px var(--op-5);
	cursor: pointer;

	padding: 0 8px;

	transition: all 0.2s ease;

	&:hover {
		box-shadow: inset 0 0 0 1px var(--op-8);
	}

	&.active {
		box-shadow: inset 0 0 0 1px var(--op-15);
	}

	&.active:hover {
		box-shadow: inset 0 0 0 1px var(--op-10);
	}
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
