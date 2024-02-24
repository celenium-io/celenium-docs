<script setup>
/**
 * Services
 */
import { nodeToText } from "@/utils/search"

definePageMeta({
	layout: "default",
})

const route = useRoute()

const { next, prev, page } = useContent()

const description = nodeToText(page.value?.body.children.find((node) => node.tag === "p") || "")

useHead({
	link: [
		{
			rel: "canonical",
			href: `https://docs.celenium.io${route.path}`,
		},
	],
	meta: [
		{
			name: "description",
			content: description,
		},
		{
			property: "og:title",
			content: `${page.value?.title} - Celenium Docs`,
		},
		{
			property: "og:description",
			content: description,
		},
		{
			property: "og:url",
			content: `https://docs.celenium.io${route.path}`,
		},
		{
			property: "og:image",
			content: `https://docs.celenium.io${route.path}/__og_image__/og.png`,
		},
		{
			name: "twitter:title",
			content: `${page.value?.title} - Celenium Docs`,
		},
		{
			name: "twitter:description",
			content: description,
		},
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
	],
})
</script>

<template>
	<Flex direction="column" gap="24" :class="$style.wrapper">
		<ContentDoc>
			<template #not-found>
				<Text size="14" weight="500" color="tertiary">
					It looks like we don't have a <Text color="secondary">{{ route.path }}</Text> page. Check the path or use the search.
				</Text>
			</template>
		</ContentDoc>

		<Flex align="center" gap="16" :class="$style.nav_btns">
			<NuxtLink v-if="prev" :to="prev._path" :class="$style.nav_btn">
				<Flex align="center" justify="between">
					<Icon name="arrow-circle-broken-right" size="16" color="tertiary" :style="{ transform: `rotate(180deg)` }" />

					<Flex direction="column" align="end" gap="8">
						<Text size="13" weight="500" color="tertiary">Previous</Text>
						<Text size="14" weight="600" color="primary">{{ prev.name }}</Text>
					</Flex>
				</Flex>
			</NuxtLink>
			<NuxtLink v-if="next" :to="next._path" :class="$style.nav_btn">
				<Flex align="center" justify="between">
					<Flex direction="column" gap="8">
						<Text size="13" weight="500" color="tertiary">Next</Text>
						<Text size="14" weight="600" color="primary">{{ next.name }}</Text>
					</Flex>

					<Icon name="arrow-circle-broken-right" size="16" color="tertiary" />
				</Flex>
			</NuxtLink>
		</Flex>
	</Flex>
</template>

<style module>
.wrapper {
	width: 100%;
	max-width: 690px;

	z-index: 5;
	user-select: text;

	margin: 0 auto;
	padding-top: 32px;
}

.wrapper h1 {
	font-size: 32px;
	margin-block-start: 0;
	margin-block-end: 0;
}

.wrapper h1,
h2,
h3,
h4 {
	color: var(--txt-primary);

	margin-top: 32px;
	margin-bottom: 16px;
}

.wrapper p {
	font-size: 15px;
	line-height: 1.6;
	font-weight: 400;
	color: var(--txt-secondary);

	margin-bottom: 12px;
}

.nav_btns {
	margin-bottom: 40px;
}

.nav_btn {
	width: 100%;
	border-radius: 8px;
	background: var(--op-5);
	cursor: pointer;

	padding: 16px;

	transition: all 0.2s var(--bezier);

	&:hover {
		background: var(--op-8);
	}

	&:active {
		background: var(--op-10);
	}
}

.nav_btn:hover {
	border-color: var(--op-10);
}

@media (max-width: 600px) {
	.wrapper {
		padding-top: 40px;
	}

	.nav_btns {
		flex-direction: column;
	}
}
</style>
