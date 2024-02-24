<script setup>
/**
 * Components
 */
import TocLinks from "./TocLinks.vue"

const props = defineProps({
	links: Array,
})

const router = useRouter()

const { activeHeadings, updateHeadings } = useScrollspy()

const updateStyles = () => {
	setTimeout(() => {
		updateHeadings([...document.querySelectorAll("h2"), ...document.querySelectorAll("h3"), ...document.querySelectorAll("h4")])
	}, 200)
}
onMounted(() => {
	updateStyles()
})

const scrollToHeading = (id) => {
	router.push(`#${id}`)
}
</script>

<template>
	<Flex direction="column" gap="4">
		<Flex v-for="link in links" :key="link.text" :class="[$style.links, $style[`depth_${link.depth}`]]" direction="column" gap="4">
			<a :href="`#${link.id}`" :class="[activeHeadings.includes(link.id) && $style.active]" @click.prevent="scrollToHeading(link.id)">
				{{ link.text }}
			</a>

			<TocLinks v-if="link.children" :links="link.children" />
		</Flex>
	</Flex>
</template>

<style module>
.links a {
	display: flex;
	align-items: center;

	font-size: 13px;
	font-weight: 500;
	line-height: 22px;
	color: var(--txt-tertiary);

	border-radius: 6px;

	padding: 2px 8px;

	transition: background 0.2s ease;
}

.links a.active {
	color: var(--txt-primary);
}

.links a:hover {
	background: var(--op-08);
}

.depth_3 {
	padding-left: 16px;
}
</style>
