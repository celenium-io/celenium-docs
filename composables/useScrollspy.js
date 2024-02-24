export const useScrollspy = () => {
	const observer = ref()
	const visibleHeadings = ref([])
	const activeHeadings = ref([])

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			const id = entry.target.id

			if (entry.isIntersecting) {
				visibleHeadings.value.push(id)
			} else {
				visibleHeadings.value = visibleHeadings.value.filter((t) => t !== id)
			}
		})
	}

	const updateHeadings = (headings) => {
		headings.forEach((heading) => {
			observer.value.observe(heading)
		})
	}

	watch(
		visibleHeadings,
		(val, oldVal) => {
			if (val.length === 0) {
				activeHeadings.value = oldVal
			} else {
				activeHeadings.value = val
			}
		},
		{ deep: true },
	)

	onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback)))

	onBeforeUnmount(() => observer.value?.disconnect())

	return { visibleHeadings, activeHeadings, updateHeadings }
}
