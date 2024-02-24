<script setup>
/** Components */
import TheHeader from "@/components/main/TheHeader.vue"
import TheNavigation from "@/components/main/TheNavigation.vue"
import Toc from "@/components/main/Toc.vue"
</script>

<template>
	<Flex align="center" direction="column">
		<TheHeader />

		<Flex wide justify="center" :class="$style.wrapper">
			<Flex align="start" wide :class="$style.container">
				<TheNavigation />

				<slot />

				<Toc :class="$style.toc_desktop" />
			</Flex>

			<Flex :class="$style.bg" />
		</Flex>
	</Flex>
</template>

<style module>
.wrapper {
	position: relative;

	min-height: calc(100vh - 56px);
}

.container {
	max-width: 1420px;
}

.bg {
	position: absolute;
	top: 28px;
	left: 40px;
	right: 40px;
	height: 600px;
	z-index: -1;

	background-image: radial-gradient(circle at 2px 2px, var(--op-5) 2px, transparent 0);
	background-size: 48px 48px;
	-webkit-mask-image: -webkit-gradient(linear, left 0%, left bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}
</style>
