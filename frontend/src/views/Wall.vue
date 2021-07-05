<template>
	<div id="main" v-if="ifConnect">
		<Banner />
		<div class="action-user">
			<Profileuser />
			<Addpost @add-post="addPost" />
		</div>
		<span class="empty-wall" v-if="emptyWall == true">
			Aucune publication n'est à l'honneur. <br />
			Soyer le premier a publier !
		</span>
		<div class="wall-post" :key="post.id" v-for="post in posts">
			<Post @delete-post="deletePost" @image-select="imageSelect" :post="post" />
		</div>

		<Footer />
	</div>
</template>

<script>
import axios from "axios";
import Banner from "../components/Banner";
import Profileuser from "../components/Profileuser";
import Addpost from "../components/Addpost";
import Post from "../components/Post";
import Footer from "../components/Footer";

export default {
	name: "Wall",
	components: {
		Banner,
		Profileuser,
		Addpost,
		Post,
		Footer
	},
	props: {
		post: Object
	},
	emits: ["add-post", "delete-post", "image-select"],
	data() {
		return {
			user: {
				userId: localStorage.getItem("userId"),
				username: localStorage.getItem("username"),
				isadmin: localStorage.getItem("isAdmin")
			},
			posts: [],
			emptyWall: true,
			userId: localStorage.getItem("userId")
		};
	},
	methods: {
		//Utilisateur
		ifConnect() {
			const token = localStorage.getItem("jwt");
			this.userId = localStorage.getItem("userId");
			if (token) {
				this.isLogged = true;
				this.getUser;
			} else {
				this.isLogged = false;
			}
		},
		getUser() {
			const id = localStorage.getItem("userId");
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
		//publications
		getAllPosts() {
			axios
				.get("http://localhost:3000/wall/posts/all")
				.then(res => {
					this.posts = res.data;
					console.log(res.data);
					if (this.posts.length !== 0) {
						this.emptyWall = false;
					}
				})
				.catch(error => console.log({ error }));
		},
		imageSelect(event) {
			this.post.image = event.target.files[0];
			console.log(this.post.image);
		},
		addPost(post) {
			this.submitted = true;
			const formData = new FormData();
			formData.append("userId", this.userId);
			formData.append("title", post.title);
			formData.append("content", post.content);
			formData.append("image", post.image);
			const token = localStorage.getItem("jwt");
			axios
				.post("http://localhost:3000/wall/posts/add", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`
					}
				})
				.then(res => {
					console.log(res);
					alert("Votre publication à bien été enregistrée !");
					document.location.reload(); //a changer !!  push dans tab posts!
				})
				.catch(error => console.log(error.response));
		},
		deletePost(id) {
			let postId = id;
			const token = localStorage.getItem("jwt");
			axios
				.delete("http://localhost:3000/wall/posts/" + postId, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then(() => {
					alert("Votre publication à bien été supprimée");
					if (this.posts.length == 0) {
						this.emptyWall = true;
					}
					document.location.reload(); // changer push dans tab posts
				})
				.catch(error => console.log(error));
		}
	},
	mounted() {
		this.getAllPosts();
	}
};
</script>

<style lang="scss">
#main {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 20px;
	.action-user {
		width: 70%;
		display: flex;
		justify-content: center;
		flex-direction: row;
		margin-bottom: 20px;
	}
	@media (max-width: 700px) {
		.action-user {
			width: 95%;
			flex-direction: column;
			align-items: center;
		}
		.wall-post {
			width: 95%;
		}
	}
	.wall-post {
		width: 76%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.empty-wall {
		text-align: center;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		margin-top: 20px;
		font-size: 20px;
		font-weight: 700;
		color: white;
	}
}
</style>
