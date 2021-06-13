/*IMPORT*/
const db = require("../middleware/dbConfig");
const { Sequelize } = require("sequelize");

/*IMPORT MODELS*/
// const Post = require("./post");
// const Comment = require("./comment");

/*DEFINITION USER*/
const User = db.define("user", {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isadmin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
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

User.sync();

module.exports = User;
