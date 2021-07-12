<template>
	<div id="comment">
		<div class="infos-comment">
			<div class="comment-photo">
				{{ writeBy | truncate(1) }}
			</div>
			<form class="content">
				<p class="comment-author">{{ writeBy | capitalize }}</p>
				<div class="content-comment" v-if="showFormCom">{{ comment.content }}</div>
				<input
					class="comment-text"
					v-if="!showFormCom"
					type="text"
					v-model="comment.content"
				/>
			</form>
			<div class="comment-action" v-if="comment.userId == user.id || user.isadmin == true">
				<!-- <button class="valid-com" v-if="!showFormCom" @click="upComment">
					<i class="fas fa-check"></i>
				</button>
				<button class="close-com" v-if="!showFormCom" @click="showFormCom = true">
					<i class="fas fa-times"></i>
				</button> -->
				<!-- <button class="up-com" v-if="showFormCom" @click="showFormCom = !showFormCom">
					<i class="fas fa-pen"></i>
				</button> -->
				<button
					class="dlt-com"
					v-if="showFormCom"
					@click="$emit('delete-comment', comment.id)"
				>
					<i class="fas fa-trash"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Comment",
	props: {
		comment: Object
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
	data() {
		return {
			//utilisateur
			user: {
				userId: localStorage.getItem("userId"),
				username: localStorage.getItem("username"),
				isadmin: localStorage.getItem("isAdmin")
			},
			//auteur
			writeBy: this.comment.user.username,
			//envoi
			showFormCom: true
		};
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
		}
	},
	mounted() {
		this.getUser();
	}
};
</script>

<style lang="scss">
#comment {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: white;
	height: 60px;
	padding: 5px 0 10px 0;
	width: 100%;
	border-top: 2px solid lightgrey;
	.infos-comment {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		margin: 0 20px 0 20px;
		width: 100%;
		.comment-photo {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
			background-color: #42b983;
			color: white;
			height: 40px;
			width: 40px;
			font-size: 18px;
		}
		@media (max-width: 700px) {
			.comment-photo {
				width: 30px;
				height: 30px;
			}
		}
		.content {
			margin-left: 10px;
			width: 80%;
			.comment-author {
				margin: 0 0 5px 0;
				font-size: 14px;
				font-weight: 600;
			}
			.content-comment {
				font-size: 12px;
				border-radius: 20px;
				margin-left: 10px;
			}
			.comment-text {
				width: 90%;
				padding: 5px;
				border-radius: 20px;
				border: 1px solid rgba(0, 0, 0, 0.3);
			}
			@media (max-width: 700px) {
				.content-comment {
					margin: 0;
					width: 200px;
				}
			}
		}
	}
	.comment-action {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		button {
			margin-right: 5px;
		}
		.valid-com,
		.up-com,
		.close-com,
		.dlt-com {
			border: none;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			color: white;
			opacity: 0.5;
			&:hover {
				opacity: 1;
			}
		}
		.valid-com,
		.up-com {
			background-color: #42b983;
		}
		.close-com,
		.dlt-com {
			background-color: #d15159;
		}
		@media (max-width: 700px) {
			.dlt-com {
				background-color: inherit;
				color: #d15159;
				opacity: 1;
			}
		}
	}
}
</style>
