<template>
	<div :class="$style.wrapper">
		<table :class="$style.table">
			<slot />
		</table>
	</div>
</template>

<style module>
.wrapper {
	overflow-x: auto;

	margin-bottom: 40px;
}

.table {
	width: 100%;
	border-spacing: 0;
	border-radius: 6px;
	overflow: hidden;

	background: var(--op-03);
}

.table td {
	font-size: 14px;
	line-height: 1.6;
	font-weight: 500;
	color: var(--txt-secondary);

	border-bottom: 1px solid var(--op-08);

	padding: 12px;
}

.table th {
	font-size: 14px;
	line-height: 1;
	font-weight: 600;
	color: var(--txt-primary);
	text-align: left;
	white-space: nowrap;

	border-bottom: 1px solid var(--op-10);

	padding: 12px;
}
</style>
