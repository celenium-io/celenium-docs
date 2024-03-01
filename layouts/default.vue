<script setup>
/** Components */
import TheHeader from "@/components/main/TheHeader.vue"
import TheFooter from "@/components/main/TheFooter.vue"
import TheNavigation from "@/components/main/TheNavigation.vue"
import Toc from "@/components/main/Toc.vue"

const showNavigation = ref(false)
</script>

<template>
	<Flex align="center" direction="column">
		<TheHeader @toggleNavigation="showNavigation = !showNavigation" :showNavigation="showNavigation" />

		<Flex wide justify="center" :class="$style.wrapper">
			<Flex align="start" wide gap="24" :class="$style.container">
				<TheNavigation :toggle="showNavigation" @hideNavigation="showNavigation = false" />

				<Flex direction="column" :class="$style.inner">
					<Toc :class="$style.toc_mobile" />

					<slot />

					<TheFooter />
				</Flex>
			</Flex>

			<Toc :class="$style.toc_desktop" />

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

	margin: 0 24px;
}

.inner {
	margin: 0 auto;
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

.toc_mobile {
	display: none;
	opacity: 0;
	visibility: hidden;
}

@media (max-width: 1600px) {
	.toc_mobile {
		display: flex;
		opacity: 1;
		visibility: visible;
	}

	.toc_desktop {
		display: none;
	}

	.container_wrapper {
		padding-right: 40px;
	}
}

@media (max-width: 800px) {
	.container_wrapper {
		padding-left: 40px;
	}
}

@media (max-width: 500px) {
	.container {
		margin: 0 12px;
	}
}
</style>
