<script setup>
/**
 * Store
 */
import { useSearchStore } from "@/store/search"
const searchStore = useSearchStore()

/**
 * Composables
 */
import { useOutside } from "@/composables/outside"

/**
 * Components
 */
import Highlight from "./Highlight.vue"

const searchRef = ref(null)
const inputEl = ref(null)

const search = ref("")
const isActive = ref(false)
const results = ref([])

onMounted(() => {
	document.addEventListener("keydown", (e) => {
		if (e.code === "Slash" && !isActive.value) {
			e.preventDefault()
			focus()
		}
		if (e.code === "Escape" && isActive.value) {
			e.preventDefault()

			handleClear()
		}
	})
})

const handleClear = () => {
	search.value = ""
	results.value = []

	blur()
}

const focus = () => {
	inputEl.value.focus()
}
const blur = () => {
	inputEl.value.blur()
}

const performSearch = () => {
	let result = []
	let pages = []

	pages = searchStore.indexes.page.search(search.value, 5, { enrich: true, suggest: true })[0]?.result || []

	pages.slice(0, 5).forEach((page) => {
		let sectionsSearchResult =
			searchStore.indexes.section.search(search.value, 5, { enrich: true, suggest: true, tag: `pg_${page.id}` })[0]?.result || []

		let dup = {}
		sectionsSearchResult = sectionsSearchResult.filter((s) => {
			const content = s.doc.display || s.doc.content
			if (dup[s.id.split("@")[0] + "@" + content]) {
				return false
			}
			dup[s.id.split("@")[0] + "@" + content] = true
			return true
		})

		result.push({
			title: page.doc.title,
			sections: sectionsSearchResult,
		})
	})

	results.value = result.filter((r) => r.sections.length)
}

watch(
	() => search.value,
	() => {
		if (search.value.length < 2) {
			results.value = []
			return
		}

		performSearch()
	},
)

let removeOutside = null
watch(
	() => results.value,
	() => {
		if (results.value.length) {
			nextTick(() => {
				removeOutside = useOutside(searchRef.value, handleClear)
			})
		} else {
			if (removeOutside) removeOutside()
		}
	},
)
</script>

<template>
	<div ref="searchRef" :class="$style.wrapper">
		<Flex
			@click="focus"
			align="center"
			justify="between"
			gap="8"
			:class="[$style.search, isActive && $style.active, !searchStore.isIndexed && $style.disabled]"
		>
			<input ref="inputEl" v-model="search" placeholder="Search" @focus="isActive = true" @blur="isActive = false" />

			<Flex align="center" gap="4">
				<Text size="12" weight="700" color="secondary" :class="$style.kbd">{{ isActive ? "ESC" : "/" }}</Text>
			</Flex>
		</Flex>

		<Transition name="search">
			<Flex v-if="results.length" direction="column" :class="$style.results">
				<Flex v-for="page in results" direction="column">
					<Text size="13" weight="600" color="tertiary" :class="$style.title">{{ page.title }}</Text>

					<Flex direction="column" gap="8" :class="$style.list">
						<NuxtLink v-for="section in page.sections" :to="section.id.split('@')[0]" @click="handleClear()">
							<Flex direction="column" gap="6" :class="$style.card">
								<Text size="16" weight="600" color="primary" style="line-height: 16px">
									<Highlight :content="section.doc.title" :match="search" />
								</Text>
								<Text size="14" weight="500" color="secondary" style="line-height: 22px">
									<Highlight :content="section.doc.display ? section.doc.display : section.doc.content" :match="search" />
								</Text>
							</Flex>
						</NuxtLink>
					</Flex>
				</Flex>
			</Flex>
		</Transition>
	</div>
</template>

<style module>
.wrapper {
	position: relative;
}

.results {
	position: absolute;
	top: 42px;
	right: 0;

	overflow-y: auto;

	width: 580px;
	max-height: 380px;
	border-radius: 8px;
	background: var(--card-background);
	border: 1px solid var(--op-10);
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.4);
}

.title {
	position: sticky;
	top: 0;

	background: var(--card-background);
	border-bottom: 1px solid var(--op-10);

	margin: 0 16px;
	padding: 16px 0 12px 0;
}

.list {
	padding: 12px 16px 16px 16px;
}

.list a:focus-visible {
	outline: none;
	background: var(--op-8);
	border: 2px solid var(--op-5);
}

.list a {
	border-radius: 6px;
	background: var(--op-5);
	border: 2px solid transparent;

	transition: all 0.2s var(--bezier);
}
.list a:hover {
	background: var(--op-8);
}

.card {
	padding: 12px 14px;
}

.search {
	width: 180px;
	height: 32px;

	background: var(--op-5);
	border-radius: 8px;
	cursor: text;
	border: 1px solid var(--op-5);

	padding: 0 6px 0 8px;

	transition: all 0.2s ease;
}

.search:hover {
	border: 1px solid var(--op-8);
}

.search.active {
	border: 1px solid var(--op-15);
}

.search.active:hover {
	border: 1px solid var(--op-10);
}

.search.disabled {
	pointer-events: none;
}

.search input {
	box-sizing: border-box;
	width: 100%;

	font-size: 13px;
	line-height: 1.1;
	font-weight: 500;
	color: var(--txt-primary);

	padding: 0;
}

.search .slash {
	background: var(--op-10);
	border-radius: 3px;

	padding: 4px 8px;
}

.kbd {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20px;

	background: var(--op-10);
	border-radius: 3px;

	border: 1px solid var(--op-5);
	border-bottom: 2px solid var(--op-10);

	padding: 0 6px;
}

@media (max-width: 700px) {
	.results {
		position: fixed;
		left: 16px;
		right: 16px;
		top: 72px;

		width: initial;
	}
}

@media (max-width: 550px) {
	.search {
		width: 170px;
	}

	.slash {
		display: none;
	}
}
</style>
