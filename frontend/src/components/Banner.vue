<template>
	<div class="banner">
		<img src="../assets/icon-white.png" alt="logo" class="logo-G" />
		<div class="text-banner">
			<h2 class="welcome">Bienvenue {{ user.username | capitalize }} sur le réseau</h2>
			<h1 class="group">Groupomania</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: "Banner",
	data() {
		return {
			user: {
				userId: localStorage.getItem("userId"),
				username: localStorage.getItem("username")
			}
		};
	},
	filters: {
		capitalize: function(value) {
			if (!value) return "";
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	}
};
</script>

<style lang="scss">
.banner {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 150px;
	margin-bottom: 30px;
	.logo-G {
		margin-top: 10px;
		width: 100px;
		height: 100px;
	}
	.text-banner {
		margin-left: 20px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		.welcome {
			color: white;
			margin: 30px 0 0 0;
		}
		.group {
			margin: 0;
			color: white;
		}
	}
	@media (max-width: 700px) {
		.banner {
			width: 90%;
		}
		.logo-G {
			position: absolute;
			opacity: 0.2;
			width: 100px;
			height: 100px;
		}
	}
}
</style>
