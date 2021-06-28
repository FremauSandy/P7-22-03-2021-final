<template>
	<div class="content-log">
		<router-link :to="{ name: 'Sign' }" class="btn-sign">S'enregistrer</router-link>

		<form class="right" v-on:submit.prevent="login()">
			<h1 class="connect-title">Se connecter</h1>
			<label for="email">
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					v-model="email"
					title="Veuillez renseigner une adresse valide"
				/>
				<span
					class="error"
					v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty && submited"
					>Veuillez saisir un email valide !</span
				>
			</label>
			<label for="password">
				<input
					type="password"
					name="password"
					placeholder="Mot de passe"
					v-model="password"
					title="Veuillez renseigner un mot de passe valide"
				/>
				<span class="error" v-if="!$v.password.required && $v.password.$dirty && submited"
					>Veuillez saisir votre mot de passe
				</span>
			</label>
			<span class="connection-error" v-if="idPassError == true"
				>Votre identifiant ou mot de passe est incorrect
			</span>
			<span class="connection-error" v-if="connectionError == true"
				>Ce compte n'existe pas!</span
			>
			<button type="submit" class="connection">
				Connexion
			</button>
		</form>
	</div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
import dotenv from "dotenv";
dotenv.config();

export default {
	name: "Log",
	data() {
		return {
			email: "",
			password: "",
			submited: false,
			contentError: false,
			connectionError: false,
			idPassError: false
		};
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required
		}
	},
	methods: {
		login() {
			this.submited = true;
			this.$v.$touch();
			if (!this.$v.$invalid) {
				axios
					.post(
						"http://localhost:3000/users/log",
						{
							email: this.email,
							password: this.password
						},
						{
							headers: { "Content-type": "application/json" }
						}
					)
					.then(res => {
						localStorage.setItem("username", res.data.username);
						localStorage.setItem("jwt", res.data.token);
						localStorage.setItem("userId", parseInt(res.data.userId));
						localStorage.setItem("isAdmin", res.data.isAdmin);
						console.log(localStorage);
						this.$router.push("/wall");
					})
					.catch(error => {
						console.log({ error });
						this.contentError = true;
						if (error.response.status === 404) {
							console.log("Ce compte n'existe pas!");
							this.connectionError = true;
						}
						if (error.response.status === 401) {
							console.log("Votre identifiant/mot de passe est incorrect ");
							this.idPassError = true;
						}
					});
			}
		}
	}
};
</script>

<style lang="scss">
.content-log {
	text-align: center;
	position: relative;
	margin-top: 50px;
	width: 300px;
	height: 330px;
	.btn-sign {
		position: absolute;
		top: -30px;
		right: 10px;
		width: 120px;
		height: 30px;
		background: #d15159;
		border: none;
		border-radius: 5px 5px 0 0;
		font-size: 11px;
		color: #fff;
		font-family: "Roboto", sans-serif;
		text-transform: uppercase;
		transition: 0.1s ease;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right {
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		padding: 40px;
		width: 300px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		h1 {
			color: black;
			font-weight: 300;
			font-size: 28px;
		}
		input[type="email"],
		input[type="password"] {
			display: block;
			box-sizing: border-box;
			margin-bottom: 20px;
			padding: 4px;
			width: 220px;
			height: 32px;
			border: none;
			border-bottom: 1px solid #aaa;
			font-family: "Roboto", sans-serif;
			font-weight: 400;
			font-size: 15px;
			transition: 0.2s ease;
		}
		.connection {
			width: 130px;
			height: 32px;
			background: #2c3e5d;
			border: none;
			border-radius: 2px;
			color: #fff;
			margin-top: 40px;
			font-family: "Roboto", sans-serif;
			text-transform: uppercase;
			transition: 0.1s ease;
			cursor: pointer;
		}
	}
	.connection-error,
	.error {
		color: #d15159;
		font-size: 10px;
	}
}
</style>
