/*IMPORT PACKAGES*/
const db = require("../middleware/dbConfig");
const { Sequelize } = require("sequelize");

/*IMPORT MODELS*/
// const User = require("./user");
// const Post = require("./post");

/*DEFINITION COMMENTAIRE*/
const Comment = db.define("Comment", {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	postId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		requierd: true
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

Comment.sync();

module.exports = Comment;
