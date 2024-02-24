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

	list-style: none;

	padding-inline-start: 16px;
}

.wrapper li {
	margin: 16px 0;

	position: relative;
}

.wrapper li::before {
	position: absolute;
	top: 0.75rem;
	left: -1rem;
	height: 0.125rem;
	width: 0.5rem;
	border-radius: 0.25rem;
	background-color: var(--op-15);
	content: "";
}
</style>
