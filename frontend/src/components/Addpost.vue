<template>
	<div class="bloc-new-post">
		<div class="post-profil">
			<div class="profil-picture">{{ username | truncate(1) }}</div>
			<h1>{{ username | capitalize }}</h1>
		</div>
		<form class="form-post" @submit="onSubmit">
			<label for="title" class="hidden">titre</label>
			<input id="title" type="text" placeholder=" Titre" v-model="post.title" required />
			<label for="content" class="hidden">contenu</label>
			<input
				id="content"
				type="textarea"
				placeholder=" Contenu "
				v-model="post.content"
				required
			/>
			<label for="image" class="hidden">image</label>
			<div class="file-input">
				<input id="image" type="file" name="image" @change="imageSelected" />
			</div>

			<div class="add">
				<button type="submit" class="post-btn">Publier</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "Addpost",
	data() {
		return {
			post: {
				userId: localStorage.getItem("userId"),
				title: "",
				content: "",
				image: null
			},
			username: localStorage.getItem("username"),
			submited: false
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
		imageSelected(event) {
			this.post.image = event.target.files[0];
			console.log(this.post.image);
		},
		onSubmit(e) {
			//avant requete post publication
			e.preventDefault();
			const newPost = {
				userId: this.post.userId,
				title: this.post.title,
				content: this.post.content,
				image: this.post.image
			};

			this.$emit("add-post", newPost);

			this.post.title = "";
			this.post.content = "";
			this.post.image = "";
			this.submitted = true;
		}
	}
};
</script>

<style lang="scss">
.bloc-new-post {
	width: 100%;
	background-color: white;
	border-radius: 10px;
	margin-left: 30px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.post-profil {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 10px 0 10px 0;
		width: 100%;
		.profil-picture {
			text-align: center;
			border-radius: 100%;
			border: 5px solid #ddd;
			background-image: linear-gradient(to top, #00ecbc 0%, #42b983 100%);
			color: white;
			font-size: 40px;
			height: 50px;
			width: 50px;
			margin: 0 10px 0 15px;
		}
		h1 {
			font-size: 14px;
		}
	}
	.form-post {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 229px;
		width: 100%;
		.hidden {
			opacity: 0;
		}
		input[type="text"],
		input[type="textarea"] {
			border-radius: 20px;
			border: 1px solid rgba(0, 0, 0, 0.3);
			width: 90%;
			margin-bottom: 5px;
		}
		input[type="text"] {
			height: 30px;
		}
		input[type="textarea"] {
			height: 50px;
		}
		.file-input {
			display: inline-block;
			text-align: left;
			background: lightgrey;
			padding: 15px;
			width: 90%;
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
		.file-input:hover > .button {
			background: #2c3e5d;
			color: white;
		}
		.file-input.-chosen > .label {
			opacity: 1;
		}
		.add {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			height: 60px;
			width: 100%;
			background-color: #2c3e5d;
			border-radius: 0 0 5px 5px;
			.post-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #253645;
				color: white;
				width: 40%;
				height: 40px;
				border-radius: 10px;
				border: none;
				cursor: pointer;
				&:hover {
					background-color: #42b983;
					color: white;
				}
			}
		}
		.error {
			color: #d15159;
			font-size: 10px;
			margin: 5px;
		}
	}
}
@media (max-width: 700px) {
	.bloc-new-post {
		width: 100%;
		margin-left: 0;
	}
	.file-input {
		width: 80%;
	}
}
</style>
