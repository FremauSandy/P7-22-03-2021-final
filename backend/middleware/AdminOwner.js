/*IMPORT PACKAGES*/
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
		const userId = decodedToken.userId;
		User.findOne({ where: { id: userId } })
			.then(user => {
				if (
					user.isadmin == true ||
					(req.body.userId && parseInt(req.body.userId) == userId)
				) {
					next();
				} else {
					throw "userId incorrect";
				}
			})
			.catch(error => res.status(401).json({ error }));
	} catch {
		res.status(401).json({
			error: new Error("Requête incorrect!")
		});
	}
};
