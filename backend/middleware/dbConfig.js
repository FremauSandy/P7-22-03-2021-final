/*IMPORT*/
require("dotenv").config();
const { Sequelize } = require("sequelize");

/*APPEL BASE DE DONNEES*/
module.exports = new Sequelize({
	username: process.env.BDD_USER,
	password: process.env.BDD_PASS,
	database: process.env.BDD_NAME,
	host: "localhost",
	dialect: "mysql"
	//logging: false désactive les calls console de sequelize
});
