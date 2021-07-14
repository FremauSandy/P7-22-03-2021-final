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
				<button class="edit-btn" aria-label="editer" @click="showForm = !showForm">
					<i class="fas fa-pen"></i>
				</button>
				<!-- suppression compte -->
				<button aria-label="supprimer" @click="deleteUser(user.id)" class="delete-btn">
					<i class="fas fa-trash"></i>
				</button>
			</div>

			<!-- photo profil -->
			<div class="face-photo">
				<div class="avatar-img">{{ user.username | truncate(1) }}</div>
			</div>

			<!-- infos utilisateur et formulaire -->
			<form class="infos-user" v-on:submit.prevent="updateUser">
				<!-- pseudonyme -->
				<span class="error-infos" v-if="!showForm"
					>Merci de bien vouloir renseigner tous les champs</span
				>
				<h1 v-if="showForm">Pseudonyme: {{ user.username }}</h1>
				<span class="error" v-if="!$v.username.alpha && $v.username.$dirty"
					>Merci de bien vouloir saisir un pseudonyme valide !</span
				>
				<input
					v-model="username"
					class="form-profil"
					type="text"
					placeholder="Pseudonyme"
					v-if="!showForm"
				/>

				<!-- adresse mail -->
				<h2 class="user-email" v-if="showForm">Email: {{ user.email }}</h2>
				<span
					class="error"
					v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty && submited"
					>Merci de bien vouloir saisir une autre adresse mail</span
				>
				<input
					v-model="email"
					class="form-profil"
					type="text"
					placeholder="Email"
					v-if="!showForm"
				/>

				<!-- mot de passe -->
				<h2 class="user-password" v-if="showForm">Password: *****</h2>
				<span class="error" v-if="!$v.password.isPasswordStrong && $v.password.$dirty"
					>Un mot de passe doit contenir au minimum 8 caractères, une majuscule, un
					chiffre et un caractère spécial.</span
				>
				<input
					class="form-profil"
					placeholder="Password"
					type="text"
					v-model="password"
					v-if="!showForm"
					required
				/>

				<div class="form-btn" v-if="!showForm">
					<button class="valid btn-form">
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
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, alpha, email } from "vuelidate/lib/validators";

export default {
	name: "Userprofil",
	components: {
		Nav,
		Footer
	},
	validations: {
		username: {
			required,
			alpha
		},
		email: {
			required,
			email
		},
		password: {
			required,
			isPasswordStrong(password) {
				const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_]){8,}/;
				return regex.test(password);
			}
		}
	},
	data() {
		return {
			user: {
				username: localStorage.getItem("username"),
				userId: localStorage.getItem("userId"),
				email: localStorage.getItem("email")
			},
			userId: localStorage.getItem("userId"),
			//form user par défaut
			username: "",
			email: "",
			password: "",
			showForm: true,
			//si erreurs form
			contentError: "",
			submitted: true
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
			const id = this.userId;
			axios
				.get("http://localhost:3000/users/" + id)
				.then(res => {
					this.user = res.data;
					console.log(res.data);
				})
				.catch(e => {
					console.log(e);
				});
		},
		updateUser() {
			this.$v.$touch();
			this.submited = true;
			const userId = localStorage.getItem("userId");
			const token = localStorage.getItem("jwt");
			let data = {
				username: this.username,
				email: this.email,
				password: this.password
			};
			if (!this.$v.$invalid) {
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
						document.location.reload();
					})
					.catch(error => {
						this.contentError = true;
						console.log({ error });
					});
			}
		},
		deleteUser(id) {
			const userId = id;
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
		this.user.userId;
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
			left: 40%;
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
			border: 5px solid lightgray;
			background-image: linear-gradient(to top, #00ecbc 0%, #42b983 100%);
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
			margin-top: 20px;
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
				margin: 5px 0 10px 0;
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
			.error-infos,
			.error {
				font-size: 12px;
				color: #d15159;
				text-align: center;
				width: 90%;
				margin-top: 5px;
			}
			.error-infos {
				margin-bottom: 10px;
			}
			.valid {
				background-color: #42b983;
			}
		}
	}
}
@media (max-width: 700px) {
	#user-profil {
		width: 100%;
		.front {
			width: 95%;
		}
	}
}
</style>
