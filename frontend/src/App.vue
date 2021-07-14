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
	background-size: 400%;
	background-image: linear-gradient(
		109.6deg,
		rgba(44, 83, 131, 0.3) 18.9%,
		rgba(95, 175, 201, 0.3) 91.1%
	);
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
