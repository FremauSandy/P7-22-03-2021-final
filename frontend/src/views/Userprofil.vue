<template>
	<div id="user-profil">
		<Nav />
		<div class="front">
			<!-- actions compte -->
			<div v-if="user.userId == user.userId || user.isAdmin == true" class="btn-inner">
				<!-- si admin -->
				<div class="mark-admin" v-if="user.isadmin == true">
					<i class="fas fa-crown"></i>
				</div>
				<!-- modification infos user -->
				<button class="edit-btn" @click="showForm = !showForm">
					<i class="fas fa-pen"></i>
				</button>
				<!-- suppression compte -->
				<button @click="deleteUser(user.id)" class="delete-btn">
					<i class="fas fa-trash"></i>
				</button>
			</div>
			<!-- photo profil -->
			<div class="face-photo">
				<div class="avatar-img">{{ user.username | truncate(1) }}</div>
			</div>
			<!-- infos utilisateur et formulaire -->
			<form class="infos-user">
				<h1 v-if="showForm">Pseudonyme: {{ user.username }}</h1>
				<input
					v-model="user.username"
					class="form-profil top"
					type="text"
					v-if="!showForm"
				/>
				<h2 class="user-email" v-if="showForm">Email: {{ user.email }}</h2>
				<input v-model="user.email" class="form-profil" type="text" v-if="!showForm" />
				<h2 class="user-password" v-if="showForm">Password: *****</h2>
				<input
					class="form-profil"
					placeholder="Password"
					type="text"
					v-model="password"
					v-if="!showForm"
					required
				/>

				<div class="form-btn" v-if="!showForm">
					<button class="valid btn-form" @click="updateUser">
						<i class="fas fa-check"></i>
					</button>
				</div>
			</form>
		</div>
		<Footer />
	</div>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default {
	name: "Userprofil",
	components: {
		Nav,
		Footer
	},
	data() {
		return {
			user: {
				username: localStorage.getItem("username"),
				userId: localStorage.getItem("userId"),
				email: localStorage.getItem("email")
			},
			password: "*****",
			showForm: true
		};
	},
	filters: {
		truncate: function(data, num) {
			const reqdString = data
				.split("")
				.slice(0, num)
				.join("");
			return reqdString;
		}
	},
	methods: {
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
		updateUser() {
			const userId = localStorage.getItem("userId");
			const token = localStorage.getItem("jwt");
			let data = {
				username: this.user.username,
				email: this.user.email,
				password: this.password
			};
			axios
				.put("http://localhost:3000/users/" + userId, data, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then(res => {
					console.log(res);
					alert("Votre profil à bien été modifié !");
				})
				.catch(error => console.log(error.res));
		},
		deleteUser() {
			const userId = localStorage.getItem("userId");
			const token = localStorage.getItem("jwt");
			axios
				.delete("http://localhost:3000/users/" + userId, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then(() => {
					alert("L'utilisateur à bien été supprimé");
					localStorage.clear();
					this.$router.push("/users/sign");
				})
				.catch(error => console.log(error));
		}
	},
	mounted() {
		this.getUser();
	}
};
</script>

<style lang="scss">
#user-profil {
	width: 60%;
	display: flex;
	align-items: center;
	flex-direction: column;
	.front {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: white;
		border-radius: 5px;
		padding-bottom: 20px;
		margin-top: 40px;
		width: 100%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		//actions compte
		.btn-inner {
			display: flex;
			flex-direction: row;
			position: relative;
			top: -25px;
			left: 140px;
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
		.face-photo {
			height: 90px;
			width: 90px;
			border-radius: 50%;
			background-color: #42b983;
			display: flex;
			justify-content: center;
			align-items: center;
			.avatar-img {
				text-align: center;
				font-size: 80px;
				color: white;
				padding-bottom: 10px;
			}
		}
		.infos-user {
			width: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			h1 {
				margin: 25px 0 12px 16px;
				font-weight: 700;
				font-size: 20px;
			}
			h2 {
				font-weight: 300;
				margin: 12px 0 12px 16px;
				font-size: 16px;
			}

			.form-profil {
				width: 70%;
				padding-left: 15px;
				border-radius: 20px;
				height: 30px;
				border: 1px solid lightgrey;
				margin: 10px 0 5px 0;
			}
			.top {
				margin-top: 20px;
			}
			.btn-form {
				margin-top: 20px;
				width: 30px;
				height: 30px;
				color: white;
				border: none;
				border-radius: 20px;
				margin: 5px;
			}
			.file-input {
				display: inline-block;
				text-align: left;
				background: lightgrey;
				padding: 15px;
				width: 65%;
				height: 21px;
				border-radius: 3px;
				margin: 10px 0 10px 0;
				[type="file"] {
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
				.label {
					color: #2c3e5d;
					white-space: nowrap;
					opacity: 0.3;
				}
			}
			.valid {
				background-color: #42b983;
			}
			.close {
				background-color: #d15159;
			}
		}
	}
}
</style>
