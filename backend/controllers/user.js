/*IMPORT PACKAGES*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bouncer = require("express-bouncer")(120000, 1.8e6, 5);

/*IMPORT MODEL*/
const User = require("../models/user");
const Post = require("../models/post");

/*ENREGISTRER UN NOUVEL UTILISATEUR*/
exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10).then(async hash => {
		const newuser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hash
		});
		newuser
			.save()
			.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
			.catch(error => res.status(401).json({ error: "Adresse email déjà utilisée !" }));
	});
};

/*CONNECTION D'UN UTILISATEUR*/
exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						username: user.username,
						userId: user.id,
						isadmin: user.isAdmin,
						token: jwt.sign(
							// création token
							{ userId: user.id, isAdmin: user.isAdmin },
							process.env.SECRET_TOKEN,
							{
								expiresIn: "24h"
							}
						)
					});
				})
				.catch(error => res.status(401).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

/*TROUVER TOUS LES UTILISATEURS*/
exports.getAllUsers = (req, res, next) => {
	User.findAll()
		.then(users => res.status(200).json(users))
		.catch(error => res.status(400).json({ error }));
};

// /*TROUVER UN UTILISATEUR*/
exports.getOneUser = (req, res, next) => {
	User.findOne({
		where: { id: req.params.id }
	})
		.then(user => res.status(200).json(user))
		.catch(error => res.status(404).json({ error }));
};
/*MODIFIER UN UTILISATEUR*/
exports.modifyUser = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(hash => {
		const userId = req.params.id;
		const newProfile = {
			username: req.body.username,
			email: req.body.email,
			password: hash
		};
		User.update(newProfile, {
			where: { id: userId }
		})
			.then(num => {
				if (num == 1) {
					res.send({
						message: "Utilisateur modifié avec succès!"
					});
				} else {
					res.send({
						message: `Impossible de mettre à jour l'utilisateur avec l'identifiant = ${id}!`
					});
				}
			})
			.catch(err => {
				res.status(500).send({
					message: "Erreur lors de la mise à jour id=" + id
				});
				res.status(401).json({
					error: "Vous ne disposez pas des droits pour modifier cet utilisateur !"
				});
			});
	});
};

/*SUPPRIMER UN UTILISATEUR*/
exports.deleteUser = (req, res, next) => {
	User.findOne({
		where: { id: req.params.id }
	})
		.then(user => {
			if (user !== null) {
				Post.destroy({ where: { userId: user.id } }).then(() => {
					console.log(
						"Toutes les publications de cet utilisateur ont bien été supprimées!"
					);
				});
				User.destroy({ where: { id: user.id } }).then(() =>
					res.send({ message: "Utilisateur supprimé avec succès!" })
				);
			} else {
				res.send({
					message:
						"Impossible de supprimer l'utilisateur avec l'identifiant " + req.params.id
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Impossible de trouver l'utilisateur avec l'identifiant" + req.params.id
			});
		});
};
