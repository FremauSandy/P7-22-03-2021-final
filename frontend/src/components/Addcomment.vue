<template>
	<form id="form-comment" @submit="setCommentSubmit">
		<!-- contenu commentaire  -->
		<div class="add-content-com">
			<!-- auteur  -->
			<div class="user-picture-com">{{ username | truncate(1) }}</div>
			<label for="text" class="hidden">text</label>
			<input
				id="text"
				type="text"
				class="add-commentary"
				placeholder="Souhaitez vous ajouter un commentaire ?"
				v-model="comment.content"
				required
			/>
			<!-- envoi  -->
			<button type="submit" class="btn-valid" aria-label="envoi">
				<i class="fas fa-check"></i>
			</button>
		</div>
	</form>
</template>

<script>
export default {
	name: "Addcomment",
	data() {
		return {
			comment: {
				userId: localStorage.getItem("userId"),
				postId: "",
				content: ""
			},
			username: localStorage.getItem("username"),
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
		setCommentSubmit(e) {
			//avant requete post commentaire
			e.preventDefault();
			const newComment = {
				userId: this.comment.userId,
				username: this.username,
				postId: this.comment.postId,
				content: this.comment.content
			};

			this.$emit("add-comment", newComment);

			this.comment.content = "";
			this.submitted = true;
		}
	}
};
</script>

<style lang="scss">
#form-comment {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	padding: 10px 0 10px 0;
	width: 100%;
	border-radius: 0 0 10px 10px;
	margin-bottom: 10px;
	border-top: 2px solid #42b983;
	.add-content-com {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		.user-picture-com {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
			border: 3px solid #ddd;
			background-image: linear-gradient(to top, #00ecbc 0%, #42b983 100%);
			color: white;
			height: 40px;
			width: 40px;
			font-size: 18px;
			margin: 0 15px 0 15px;
		}
		.hidden {
			opacity: 0;
		}
		.add-commentary {
			background-color: lightgray;
			border: none;
			width: 80%;
			padding: 10px;
			border-radius: 30px;
			margin: 10px 0 10px 0;
		}
		@media (max-width: 700px) {
			.user-picture-com {
				visibility: hidden;
				margin: 0px;
				width: 0;
				height: 0;
			}
			.add-commentary {
				margin-left: 15px;
			}
		}
		.btn-valid {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #42b983;
			border-radius: 100%;
			border: none;
			width: 25px;
			height: 25px;
			color: white;
			margin-left: 10px;
		}
	}
}
</style>
