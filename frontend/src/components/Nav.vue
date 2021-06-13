<template>
	<nav>
		<Banner />
		<ul>
			<li class="choice-nav">
				<router-link :to="{ name: 'Wall' }"><i class="fas fa-home"></i>Acceuil</router-link>
			</li>
			<li class="choice-nav">
				<router-link :to="{ name: 'Userprofil' }"
					><i class="fas fa-user"></i>Profil
				</router-link>
			</li>
			<li class="choice-nav" v-on:click="logout()">
				<i class="fas fa-sign-out-alt"></i>Logout
			</li>
		</ul>
	</nav>
</template>

<script>
import Banner from "../components/Banner";
export default {
	name: "Nav",
	components: {
		Banner
	},
	data() {
		return {
			userId: localStorage.getItem("userId"),
			username: localStorage.getItem("username")
		};
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push("/users/log");
		}
	}
};
</script>

<style lang="scss">
nav {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-content: center;
	width: 100%;
	margin-top: 10px;
	ul {
		padding: 0;
		text-align: center;
		margin-bottom: 30px;
		background-color: #2c3e5d;
		border-radius: 8px;
		width: 100%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		.choice-nav {
			line-height: 50px;
			font-size: 14px;
			display: inline-block;
			text-transform: uppercase;
			text-align: center;
			cursor: pointer;
			color: white;
			&:hover {
				background-color: #42b983;
			}
			.fas {
				margin-right: 5px;
			}
		}
		.choice-nav:nth-child(1) {
			width: 100px;
		}
		.choice-nav:nth-child(2) {
			width: 110px;
		}
		.choice-nav:nth-child(3) {
			width: 100px;
		}
	}
}
</style>
