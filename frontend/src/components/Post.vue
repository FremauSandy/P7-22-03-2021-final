<template>
	<!-- MODELE POST -->
	<article class="model-post">
		<!-- banniere publication -->
		<div class="model-profil">
			<div class="author">
				<div class="model-picture">{{ author | truncate(1) }}</div>
				<div class="pseudo">
					{{ post.user.username | capitalize }}
					<button
						v-if="user.isadmin == true"
						@click="deleteUser(user.id)"
						class="delete-user"
					>
						<i class="fas fa-trash"></i>
					</button>
				</div>
			</div>
			<!-- si admin ou auteur -->
			<div class="action" v-if="post.userId == user.id || user.isadmin == true">
				<!-- <button class="up-post" @click="showForm = !showForm">
					<i class="fas fa-pen"></i>
				</button> -->
				<button class="dlt-post" @click="$emit('delete-post', post.id)">
					<i class="fas fa-trash"></i>
				</button>
			</div>
		</div>
		<!-- contenu publication -->
		<div class="post-content">
			<!-- titre -->
			<h2 v-if="showForm">{{ post.title }}</h2>
			<!-- si changement -->
			<!-- <input
				class="post-text"
				v-if="!showForm"
				placeholder="Titre"
				type="text"
				v-model="post.title"
			/> -->
			<!-- contenu -->
			<p v-if="showForm">{{ post.content }}</p>
			<!-- si changement -->
			<!-- <input
				class="post-text"
				v-if="!showForm"
				placeholder="Contenu"
				type="text"
				v-model="post.content"
			/> -->
			<div class="file-change" v-if="!showForm">
				<input id="image" type="file" name="image" @change="imageSelected" />
			</div>
			<!-- <button class="valid-btn" v-if="!showForm">
				<i class="fas fa-check"></i>
			</button> -->

			<!-- image -->
			<div class="img-content" v-if="post.image !== 'null'">
				<img :src="post.image" class="model-file" />
			</div>
		</div>
		<!-- AJOUTER COMMENTAIRE -->
		<Addcomment @add-comment="addComment" />
		<!-- COMMENTAIRES RESPECTIFS -->
		<div class="wall-comment" :key="comment.id" v-for="comment in post.Comments">
			<Comment @delete-comment="deleteComment" :comment="comment" />
		</div>
	</article>
</template>

<script>
import axios from "axios";
import Addcomment from "../components/Addcomment";
import Comment from "../components/Comment";

export default {
	name: "Post",
	props: {
		post: Object
	},
	components: {
		Addcomment,
		Comment
	},
	emits: ["delete-comment", "add-comment"],
	data() {
		return {
			//utilisateur
			user: {
				userId: localStorage.getItem("userId"),
				username: localStorage.getItem("username"),
				isadmin: localStorage.getItem("isAdmin")
			},
			//publication
			author: this.post.user.username,
			postId: this.post.id,
			//commentaires
			Comments: [],
			//envoi
			showForm: true,
			submitted: false
		};
	},
	filters: {
		truncate: function(data, num) {
			const reqdString = data
				.split("")
				.slice(0, num)
				.join("");
			return reqdString;
		},
		capitalize: function(value) {
			if (!value) return "";
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
	methods: {
		//utilisateur
		getUser() {
			// droits admin ou auteur: permet la suppression des posts
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
		},
		//commentaires
		addComment(comment) {
			this.submitted = true;
			let data = {
				userId: localStorage.getItem("userId"),
				username: this.user.username,
				postId: this.postId,
				content: comment.content
			};
			console.log(data);
			const token = localStorage.getItem("jwt");
			axios
				.post("http://localhost:3000/wall/comments/add", data, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then(res => {
					console.log(res);
					window.location.reload();

					alert("Votre commentaire à bien été enregistré !");
				})
				.catch(error => console.log(error));
		},
		getAllComments() {
			axios
				.get("http://localhost:3000/wall/comments/all")
				.then(res => {
					this.comments = res.data;
					console.log(res.data);
				})
				.catch(error => console.log({ error }));
		},
		deleteComment(id) {
			let commentId = id;
			const token = localStorage.getItem("jwt");
			axios
				.delete("http://localhost:3000/wall/comments/" + commentId, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then(() => {
					alert("Votre commentaire à bien été supprimé");
					document.location.reload();
				})
				.catch(error => console.log(error));
		}
	},
	mounted() {
		this.user.userId;
		this.getUser();
		this.getAllComments;
	}
};
</script>

<style lang="scss">
.model-post {
	border-radius: 10px;
	width: 80%;
	background-color: white;
	margin-bottom: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	.model-profil {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #2c3e5d;
		color: white;
		border-radius: 5px 5px 0 0;
		padding: 10px;
		.model-picture {
			text-align: center;
			color: white;
			font-size: 40px;
			border-radius: 100%;
			background-color: #42b983;
			height: 50px;
			width: 50px;
			margin: 0 15px 0 15px;
		}
		@media (max-width: 700px) {
			.model-picture {
				margin: 0 10px 0 5px;
			}
			.delete-user {
				color: #d15159;
				background-color: none;
			}
		}
		.author {
			display: flex;
			flex-direction: row;
			.pseudo {
				color: white;
				margin-top: 10px;
				.delete-user {
					margin-left: 10px;
					border: none;
					border-radius: 50%;
					width: 30px;
					height: 30px;
					color: white;
					background-color: #d15159;
					opacity: 0.5;
					&:hover {
						opacity: 1;
					}
				}
				@media (max-width: 700px) {
					.delete-user {
						color: #d15159;
						background-color: inherit;
						margin-left: 0;
						opacity: 1;
						width: 0;
					}
				}
			}
		}
		h1 {
			font-size: 16px;
		}
		.up-post,
		.dlt-post {
			border: none;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			color: white;
			margin-right: 5px;
			opacity: 0.5;
			&:hover {
				opacity: 1;
			}
		}
		.up-post {
			background-color: #42b983;
		}
		.dlt-post {
			background-color: #d15159;
		}
		@media (max-width: 700px) {
			.action {
				background-color: #42b983;
				border-radius: 20px;
			}
			.up-post {
				background-color: inherit;
				color: #2c3e5d;
				opacity: 1;
				margin-left: 5px;
			}
			.dlt-post {
				background-color: inherit;
				color: #d15159;
				opacity: 1;
			}
		}
	}
	.post-content {
		padding: 0 20px 0 20px;
		margin-bottom: 10px;
		h2 {
			width: 100%;
			border-bottom: 2px solid lightgrey;
		}
		.post-text {
			margin: 15px 0 5px;
			width: 95%;
			padding: 10px;
			border-radius: 20px;
			border: 1px solid rgba(0, 0, 0, 0.3);
		}
		.img-content {
			width: 100%;
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			.model-file {
				max-width: 100%;
				max-height: 100%;
			}
		}
		.valid-btn {
			border: none;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			color: white;
			background-color: #42b983;
			margin-left: 15px;
		}
		.file-change {
			display: inline-block;
			text-align: left;
			background: lightgrey;
			padding: 15px;
			width: 80%;
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
	}
}
@media (max-width: 700px) {
	.model-post {
		width: 100%;
	}
}
</style>
