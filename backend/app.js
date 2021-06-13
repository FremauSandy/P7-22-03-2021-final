/*IMPORT PACKAGES*/
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./middleware/dbConfig");
const path = require("path");

/*IMPORT ROUTES*/
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

/*APPEL PACKAGES*/
const app = express();
app.use(helmet());

/*HEADERS*/
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

/*TEST CONNECTION DATABASE*/
try {
	db.authenticate();
	console.log("Connection base de donnée OK !");
} catch (error) {
	console.error("Impossible de se connecter à la base de données", error);
}

/*APPEL PACKAGES*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*APPEL ROUTES*/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/users", userRoutes);
app.use("/wall/posts", postRoutes);
app.use("/wall/comments", commentRoutes);

module.exports = app;
