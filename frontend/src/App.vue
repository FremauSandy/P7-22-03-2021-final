<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>

<style lang="scss">
body {
	display: flex;
	justify-items: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	background: #ddd;
	margin: 0;
	#app {
		font-family: "Roboto", sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		max-width: 1024px;
		a {
			color: white;
			text-decoration: none;
		}
	}
}
</style>
