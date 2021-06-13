/*IMPORT*/
const db = require("../middleware/dbConfig");
const { Sequelize } = require("sequelize");

/*IMPORT MODELS*/
const User = require("./user");
const Comment = require("./comment");

/*DEFINITION POST*/
const Post = db.define("post", {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	userId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		requierd: true
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});

/*JOINTURES*/
//commentaires
Comment.belongsTo(Post, { foreignKey: "postId" });
Comment.belongsTo(User, { foreignKey: "userId" });
//publications
Post.hasMany(Comment);
Post.belongsTo(User, { foreignKey: "userId", onDelete: "cascade" });
//utilisateurs
User.hasMany(Comment, { foreignKey: "userId", onDelete: "cascade" });
User.hasMany(Post);

Post.sync();

module.exports = Post;
