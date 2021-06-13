<template>
	<div class="content-sign">
		<router-link :to="{ name: 'Log' }" class="btn-log">Se Connecter</router-link>

		<form class="left" method="post" v-on:submit.prevent="signup()">
			<h1>Créer un compte</h1>
			<label for="username">
				<input
					type="text"
					name="username"
					placeholder="Nom d'utilisateur"
					v-model="username"
				/>
				<span class="error" v-if="!$v.username.required && $v.username.$dirty && submited"
					>Merci de bien vouloir saisir votre pseudonyme !</span
				>
				<span class="error" v-if="!$v.username.alpha && $v.username.$dirty"
					>Merci de bien vouloir saisir un pseudonyme valide !</span
				>
			</label>
			<label for="email">
				<input type="email" name="email" placeholder="E-mail" v-model="email" />
				<span
					class="error"
					v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty && submited"
					>Merci de bien vouloir saisir un email valide !</span
				>
			</label>
			<label for="password">
				<input
					type="password"
					name="password"
					placeholder="Mot de passe"
					v-model="password"
				/>
				<span class="error" v-if="!$v.password.isPasswordStrong && $v.password.$dirty"
					>Un mot de passe doit contenir au minimum 8 caractères, une majuscule, un
					chiffre et un caractère spécial.</span
				>
			</label>

			<div>
				<button type="submit" class="connect">
					S'enregistrer
				</button>
			</div>
		</form>
	</div>
</template>

<script>
// import axios from "axios";
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, alpha, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
	name: "Sign",
	data() {
		return {
			username: "",
			email: "",
			password: "",
			contentError: "",
			submitted: true
		};
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
	methods: {
		signup() {
			this.$v.$touch();
			this.submited = true;
			const data = {
				username: this.username,
				email: this.email,
				password: this.password
			};
			console.log("hello");
			if (!this.$v.$invalid) {
				axios
					.post("http://localhost:3000/users/sign", data)
					.then(res => {
						console.log(res);
						alert(
							"Votre compte a bien été créé! Vous pouvez à présent vous connecter!"
						);
						this.$router.push("/users/log");
					})
					.catch(error => {
						this.contentError = true;
						console.log({ error });
					});
			}
		}
	}
};
</script>

<style lang="scss">
.content-sign {
	text-align: center;
	position: relative;
	margin-top: 50px;
	width: 300px;
	height: 330px;
	.btn-log {
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
	.left {
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 40px;
		width: 300px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		h1 {
			color: black;
			margin: 25px 0 20px 0;
			font-weight: 300;
			font-size: 28px;
		}
		input[type="text"],
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
		.connect {
			width: 130px;
			height: 35px;
			background: #2c3e5d;
			border: none;
			border-radius: 2px;
			color: #fff;
			font-family: "Roboto", sans-serif;
			text-transform: uppercase;
			transition: 0.1s ease;
			cursor: pointer;
			margin-top: 40px;
		}
		.error {
			color: #d15159;
			font-size: 10px;
		}
	}
}
</style>
