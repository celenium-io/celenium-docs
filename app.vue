<script setup>
/** Vendor */
import { Document } from "@akryum/flexsearch-es"

/** Utils */
import { parseArticles } from "@/utils/search"

/** Store */
import { useSearchStore } from "@/store/search"
const searchStore = useSearchStore()

onMounted(async () => {
	const articles = await queryContent("/").find()
	const parsedArticles = parseArticles(articles)

	searchStore.indexes.page = new Document({
		cache: 100,
		tokenize: "full",
		document: {
			id: "id",
			index: "content",
			store: ["title"],
		},
		context: {
			resolution: 9,
			depth: 2,
			bidirectional: true,
		},
	})

	searchStore.indexes.section = new Document({
		cache: 100,
		tokenize: "full",
		document: {
			id: "id",
			index: "content",
			tag: "pageId",
			store: ["title", "content", "url", "display"],
		},
		context: {
			resolution: 9,
			depth: 2,
			bidirectional: true,
		},
	})

	searchStore.isIndexed = true

	Object.keys(parsedArticles).forEach(async (pageId) => {
		const page = parsedArticles[pageId]

		await searchStore.indexes.page.addAsync({
			id: pageId,
			title: page.title,
			content: `${page.title} ${page.plainText}`,
		})

		Object.keys(page.sections).forEach(async (sectionId) => {
			const section = page.sections[sectionId]
			const paragraphs = section.content.split("\n").filter(Boolean)

			await searchStore.indexes.section.addAsync({
				id: `${page.path}#${sectionId}@s`,
				url: page.path,
				title: section.title,
				pageId: `pg_${pageId}`,
				content: section.title,
				...(paragraphs[0] && { display: paragraphs[0] }),
			})

			paragraphs.forEach(async (paragraph, idx) => {
				await searchStore.indexes.section.addAsync({
					id: `${page.path}#${sectionId}@${idx}`,
					url: page.path,
					title: section.title,
					pageId: `pg_${pageId}`,
					content: paragraph,
				})
			})
		})
	})
})
</script>

<template>
	<NuxtLoadingIndicator :height="2" color="#0ade71" />
	<NuxtLayout>
		<NuxtPage />

		<div id="tooltip" />
		<div id="dropdown" />

		<!-- <Notifications /> -->
	</NuxtLayout>
</template>
