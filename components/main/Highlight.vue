<script setup>
const props = defineProps({
	content: String,
	match: String,
})

const parsedText = ref([])
const splitText = ref([])

const handleHighlight = () => {
	if (!props.match.length) return

	splitText.value = props.content ? props.content.split("") : []
	const escapedSearch = props.match?.trim().replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
	const regex = RegExp("(" + escapedSearch.replaceAll(" ", "|") + ")", "ig")

	let index = 0
	let result

	parsedText.value = []

	while ((result = regex.exec(props.content)) !== null) {
		parsedText.value.push({
			text: splitText.value.splice(0, result.index - index).join(""),
			highlight: splitText.value.splice(0, regex.lastIndex - result.index).join(""),
		})
		index = regex.lastIndex
	}
}

onMounted(() => {
	handleHighlight()
})

watch(
	() => props.match,
	() => {
		handleHighlight()
	},
)
</script>

<template>
	<template v-for="r in parsedText">
		<span>{{ r.text }}</span>
		<span style="color: var(--green)">{{ r.highlight }}</span>
	</template>
	<span>{{ splitText.join("") }}</span>
</template>
