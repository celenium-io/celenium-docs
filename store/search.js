export const useSearchStore = defineStore("search", () => {
	const isIndexed = ref(false)
	const indexes = ref({})

	return { indexes, isIndexed }
})
