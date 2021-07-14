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

/*ASSOCIATIONS*/
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User);

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { onDelete: "cascade", hooks: true });

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { onDelete: "cascade", hooks: true });

Post.sync();

module.exports = Post;
