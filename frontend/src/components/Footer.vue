<template>
	<footer>
		<a class="link" href="#"><i class="fas fa-balance-scale-right"></i>Legals</a>
		<a class="link" href="https://openclassrooms.com/fr/"><i class="fas fa-users"></i>Projet</a>
		<a class="link" href="https://github.com/FremauSandy/P7-22-03-2021"
			><i class="fab fa-github"></i>Github</a
		>
		<a class="link" href="mailto:loly-skull@hotmail.fr"
			><i class="fas fa-envelope-open-text"></i>Contact</a
		>
	</footer>
</template>

<script>
export default {
	name: "Footer"
};
</script>

<style lang="scss">
footer {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: relative;
	height: 50px;
	background-color: #2c3e5d;
	border-radius: 8px;
	margin: 40px 0 10px 0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	.link {
		margin: 0 5px 0 5px;
		line-height: 50px;
		font-size: 10px;
		display: inline-block;
		text-transform: uppercase;
		text-align: center;
		cursor: pointer;
		&:hover {
			background-color: #42b983;
		}
		.fas,
		.fab {
			margin-right: 5px;
		}
	}
}
@media (max-width: 700px) {
	footer {
		border-radius: 0;
	}
}
</style>
