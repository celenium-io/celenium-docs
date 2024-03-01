<script setup>
const route = useRoute()

const footerWidth = ref(route.path === "/docs" ? 1040 : 770)
watch(
	() => route.path,
	() => {
		if (route.path === "/docs") {
			footerWidth.value = 1040
		} else {
			footerWidth.value = 770
		}
	},
)
</script>

<template>
	<Flex direction="column" gap="24" wide :style="{ maxWidth: `${footerWidth}px` }" :class="$style.wrapper">
		<Flex align="center" gap="6">
			<Text size="12" color="tertiary" weight="500">Claim your ideas or suggestions:</Text>
			<Text size="12" color="secondary" weight="500">
				<a href="https://github.com/celenium-io/celenium-docs" target="_blank" rel="noopener noreferrer"> Issue Tracker </a>
			</Text>
		</Flex>

		<Flex align="center" justify="between" :class="$style.bottom">
			<Flex align="center" gap="12">
				<Text size="12" color="support" weight="600" :class="$style.link">
					<a href="https://github.com/celenium-io/celenium-interface/releases/" target="_blank" rel="noopener noreferrer"
						>Changelog</a
					>
				</Text>
				<Text size="12" color="support" weight="600" :class="$style.link">
					<a
						href="https://github.com/celenium-io/celenium-interface/blob/master/LICENSE"
						target="_blank"
						rel="noopener noreferrer"
						>License</a
					>
				</Text>
			</Flex>

			<Flex align="center" gap="12" :class="$style.social_icons">
				<a href="https://github.com/celenium-io" target="_blank" rel="noopener noreferrer">
					<Icon name="github" size="16" color="tertiary" />
				</a>
				<a href="https://discord.gg/NbANhqCJHA" target="_blank" rel="noopener noreferrer">
					<Icon name="discord" size="16" color="tertiary" />
				</a>
				<a href="https://twitter.com/celenium_io" target="_blank" rel="noopener noreferrer">
					<Icon name="twitter" size="16" color="tertiary" />
				</a>
			</Flex>
		</Flex>
	</Flex>
</template>

<style module>
.wrapper {
	margin: 0 auto;
	padding: 40px 0 80px 0;
}

.bottom {
	border-top: 1px solid var(--op-05);
}

.social_icons svg {
	display: flex;

	cursor: pointer;

	transition: all 0.2s var(--bezier);
}

.social_icons svg:hover {
	fill: var(--txt-secondary);
}

.link {
	transition: all 0.2s var(--bezier);
}

.link:hover {
	color: var(--txt-tertiary);
}

@media (max-width: 500px) {
	.bottom {
		flex-direction: column;
		gap: 24px;
	}
}
</style>
