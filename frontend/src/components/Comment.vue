<template>
	<div id="comment">
		<div class="infos-comment">
			<div class="comment-photo">
				{{ writeBy | truncate(1) }}
			</div>
			<div class="content">
				<p class="comment-author">{{ writeBy }}</p>
				<div class="content-comment">{{ comment.content }}</div>
			</div>
		</div>
		<button
			v-if="comment.userId == comment.user.id || user.isadmin == true"
			class="dlt-com"
			@click="$emit('delete-comment', comment.id)"
		>
			<i class="fas fa-trash"></i>
		</button>
	</div>
</template>

<script>
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
			writeBy: this.comment.user.username
		};
	}
};
</script>

<style lang="scss">
#comment {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
		margin-left: 20px;
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
		.content {
			margin-left: 10px;
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
		}
	}
	.dlt-com {
		border: none;
		background-color: #d15159;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		color: white;
		margin-right: 15px;
	}
}
</style>
