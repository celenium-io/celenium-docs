<template>
	<ul :class="$style.wrapper">
		<slot />
	</ul>
</template>

<style module>
.wrapper {
	font-size: 16px;
	line-height: 1.6;
	color: var(--txt-secondary);

	padding-inline-start: 20px;
}

.wrapper li {
	position: relative;

	list-style-type: decimal;
	counter-increment: list;
	position: relative;

	margin: 16px 0;
}

.wrapper li::marker {
	color: var(--txt-tertiary);
	font-weight: 600;
}
</style>
