<template>
	<strong :class="$style.wrapper">
		<slot />
	</strong>
</template>

<style module>
.wrapper {
	color: var(--txt-primary);
}
</style>
