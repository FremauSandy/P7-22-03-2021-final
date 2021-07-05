<template>
	<div class="card-profile">
		<!-- action Compte -->
		<div v-if="user.isadmin == true" class="btn-inner">
			<!-- si admin -->
			<div class="mark-admin">
				<i class="fas fa-crown"></i>
			</div>
		</div>

		<!-- photo par défaut -->
		<div class="face-photo">
			<div class="avatar-img">{{ user.username | truncate(1) }}</div>
		</div>

		<!-- infos utilisateur connecté -->
		<div class="infos-user">
			<h1 class="profile-name">{{ user.username }}</h1>
			<h2 class="profile-email">{{ user.email }}</h2>
		</div>

		<!-- naviguation -->
		<nav>
			<ul>
				<li class="choice-nav profil">
					<router-link :to="{ name: 'Userprofil' }"
						><i class="fas fa-user"></i>
					</router-link>
				</li>
				<li class="choice-nav logout" @click="logout">
					<i class="fas fa-sign-out-alt"></i>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "ProfileUser",
	filters: {
		truncate: function(data, num) {
			const reqdString = data
				.split("")
				.slice(0, num)
				.join("");
			return reqdString;
		}
	},
	data() {
		return {
			//connection utilisateur
			user: {
				username: localStorage.getItem("username"),
				userId: localStorage.getItem("userId"),
				email: localStorage.getItem("email")
			}
		};
	},
	methods: {
		//chargement de l'utilisateur connecté
		getUser() {
			const id = localStorage.getItem("userId");
			axios
				.get("http://localhost:3000/users/" + id)
				.then(res => {
					this.user = res.data;
				})
				.catch(e => {
					console.log(e);
				});
		},
		//déconnection
		logout() {
			localStorage.clear();
			this.$router.push("/users/log");
		}
	},
	mounted() {
		this.getUser();
	}
};
</script>

<style lang="scss">
.card-profile {
	text-align: center;
	position: relative;
	width: 250px;
	height: 300px;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	//infos compte
	.face-photo {
		margin-top: 20px;
		height: 90px;
		width: 90px;
		border-radius: 50%;
		border: 5px solid #ddd;
		background-color: #42b983;
		display: flex;
		justify-content: center;
		align-items: center;
		.avatar-img {
			font-size: 90px;
			color: white;
			padding-bottom: 10px;
		}
	}
	.infos-user {
		.profile-name {
			margin: 5px 0 5px 0;
			font-size: 18px;
		}
		.profile-email {
			margin: 5px 0 5px 0;
			font-size: 14px;
		}
		.input-form {
			border-radius: 20px;
			border: 1px solid rgba(0, 0, 0, 0.3);
			width: 80%;
			height: 25px;
			margin-bottom: 10px;
			padding-left: 10px;
		}
		.input-A {
			margin-top: 20px;
		}
		.valid-btn {
			width: 30px;
			height: 30px;
			border: none;
			border-radius: 20px;
			background: #ddd;
			color: white;
			margin-bottom: 20px;
			&:hover {
				background-color: #42b983;
			}
		}
	}
	//actions compte
	.btn-inner {
		display: flex;
		flex-direction: row;
		position: absolute;
		top: -25px;
		right: 10px;
		.mark-admin {
			width: 35px;
			height: 25px;
			background: #2c3e5d;
			border: none;
			border-radius: 5px 5px 0 0;
			font-size: 11px;
			color: #fff;
			font-family: "Roboto", sans-serif;
			text-transform: uppercase;
			transition: 0.1s ease;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.edit-btn,
		.delete-btn {
			width: 45px;
			height: 25px;
			border: none;
			border-radius: 5px 5px 0 0;
			font-size: 11px;
			font-family: "Roboto", sans-serif;
			text-transform: uppercase;
			transition: 0.1s ease;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #2c3e5d;
			color: white;
			cursor: pointer;
		}
		.edit-btn {
			background-color: #42b983;
		}
		.delete-btn {
			background-color: #d15159;
		}
	}
	//naviguation
	nav {
		width: 100%;
		ul {
			display: flex;
			flex-direction: row;
			padding: 0;
			margin: 0;
			text-align: center;
			background-color: #2c3e5d;
			border-radius: 0 0 10px 10px;
			.choice-nav {
				width: 100%;
				line-height: 40px;
				display: inline-block;
				cursor: pointer;
				color: white;
				&:hover {
					background-color: #42b983;
				}
			}
			.profil:hover {
				border-radius: 0 0 0 10px;
			}
			.logout:hover {
				border-radius: 0 0 10px 0;
			}
		}
	}
}
@media (max-width: 700px) {
	.card-profile {
		width: 50%;
		margin-bottom: 20px;
	}
	.infos-user {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
}
</style>
