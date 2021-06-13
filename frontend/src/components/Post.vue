<template>
	<!-- MODELE POST -->
	<article class="model-post">
		<!-- banniere publication -->
		<div class="model-profil">
			<div class="author">
				<div class="model-picture">{{ author | truncate(1) }}</div>
				<p>{{ post.user.username }}</p>
			</div>
			<!-- si admin ou auteur -->
			<div class="action" v-if="post.userId == user.id || user.isadmin == true">
				<button class="dlt-post" @click="$emit('delete-post', post.id)">
					<i class="fas fa-trash"></i>
				</button>
			</div>
		</div>
		<!-- contenu publication -->
		<div class="post-content">
			<h2 v-if="showForm">{{ post.title }}</h2>
			<p v-if="showForm">{{ post.content }}</p>
			<div class="content-form-file"></div>
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
			//commentaires
			Comments: [],
			postId: this.post.id,
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
		//publications
		imageSelect(event) {
			//permet la publication d'image dans un post
			this.post.image = event.target.files[0];
			console.log(this.post.image);
		},
		upPostSubmit(e) {
			//avant requete post publication dans "wall"
			e.preventDefault();
			const newPost = {
				userId: localStorage.getItem("userId"),
				title: this.post.title,
				content: this.post.content,
				image: this.post.image
			};

			this.$emit("update-post", newPost);

			this.post.title = "";
			this.post.content = "";
			this.post.image = "";
			this.submitted = true;
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
		.author {
			display: flex;
			flex-direction: row;
		}
		h1 {
			font-size: 16px;
		}
		.up-post {
			background-color: #42b983;
		}
		.up-post,
		.dlt-post {
			border: none;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			color: white;
			margin-right: 5px;
		}
		.dlt-post {
			background-color: #d15159;
		}
	}
	.post-content {
		padding: 0 20px 0 20px;
		margin-bottom: 10px;
		h2 {
			width: 100%;
			border-bottom: 2px solid lightgrey;
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
		.form-title {
			margin: 15px 20px 10px 0;
			padding-left: 10px;
			width: 98%;
			height: 25px;
			border-radius: 20px;
			border: 1px solid lightgrey;
		}
		.form-content {
			padding-left: 10px;
			width: 98%;
			height: 25px;
			border-radius: 20px;
			border: 1px solid lightgrey;
		}
		.btn-valid {
			border: none;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			color: white;
			background-color: #42b983;
			margin-right: 5px;
		}
		.content-form-file {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.file-input {
				display: inline-block;
				text-align: left;
				background: lightgrey;
				padding: 15px;
				width: 80%;
				height: 21px;
				border-radius: 3px;
				margin: 10px 15px 10px 0;
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
}
@media (max-width: 700px) {
	.model-post {
		width: 100%;
	}
}
</style>
