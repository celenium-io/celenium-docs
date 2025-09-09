<script setup>
definePageMeta({
	layout: "default",
})

const route = useRoute()

const { data } = await useAsyncData(route.path, () => queryCollection("content").path(route.path).first())
const { data: surround } = await useAsyncData("surround", () => {
	return queryCollectionItemSurroundings("content", route.path)
})

useSeoMeta({
	title: data.value.seo.title,
	description: data.value.seo.description,

	ogTitle: data.value.seo.title,
	ogDescription: data.value.seo.description,
	ogImage: `https://docs.celenium.io${route.path}/__og_image__/og.png`,
	twitterCard: "summary_large_image",
})
</script>

<template>
	<Flex direction="column" gap="24" :class="$style.wrapper">
		<ContentRenderer :value="data">
			<template #not-found>
				<Text size="14" weight="500" color="tertiary">
					It looks like we don't have a <Text color="secondary">{{ route.path }}</Text> page. Check the path or use the search.
				</Text>
			</template>
		</ContentRenderer>

		<Flex align="center" gap="16" :class="$style.nav_btns">
			<NuxtLink v-if="surround[0]" :to="surround[0].path" :class="$style.nav_btn">
				<Flex align="center" justify="between">
					<Icon name="arrow-circle-broken-right" size="16" color="tertiary" :style="{ transform: `rotate(180deg)` }" />

					<Flex direction="column" align="end" gap="8">
						<Text size="13" weight="500" color="tertiary">Previous</Text>
						<Text size="14" weight="600" color="primary">{{ surround[0].title }}</Text>
					</Flex>
				</Flex>
			</NuxtLink>
			<NuxtLink v-if="surround[1]" :to="surround[1].path" :class="$style.nav_btn">
				<Flex align="center" justify="between">
					<Flex direction="column" gap="8">
						<Text size="13" weight="500" color="tertiary">Next</Text>
						<Text size="14" weight="600" color="primary">{{ surround[1].title }}</Text>
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

.wrapper g {
	fill: var(--txt-primary);
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
