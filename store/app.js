export const useAppStore = defineStore("app", () => {
	const theme = ref("dark")

	return { theme }
})
