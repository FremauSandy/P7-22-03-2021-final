<template>
	<div class="card-profile">
		<!-- action Compte -->
		<div v-if="user.isadmin == true" class="btn-inner">
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

		<!-- photo par défaut -->
		<div class="face-photo">
			<div class="avatar-img">{{ user.username | truncate(1) }}</div>
		</div>

		<!-- infos utilisateur connecté -->
		<form class="infos-user">
			<h1 class="profile-name" v-if="showForm">{{ user.username }}</h1>
			<!-- changer pseudonyme -->
			<input
				v-model="user.username"
				class="input-form input-A"
				type="text"
				v-if="!showForm"
				placeholder="Pseudonyme"
			/>
			<h2 class="profile-email" v-if="showForm">{{ user.email }}</h2>
			<!-- changer email -->
			<input
				v-model="user.email"
				class="input-form"
				type="text"
				v-if="!showForm"
				placeholder="Email"
			/>
			<!-- changer mot de passe -->
			<input
				class="input-form"
				placeholder="Password"
				type="text"
				v-model="password"
				v-if="!showForm"
				required
			/>
			<button class="valid-btn" v-if="!showForm" @click="updateUser">
				<i class="fas fa-check"></i>
			</button>
		</form>

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
export default {
	name: "Randomprofile"
};
</script>

<style lang="scss"></style>
