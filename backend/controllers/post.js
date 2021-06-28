/*IMPORT PACKAGES*/
const fs = require("fs");

/*IMPORT MODEL*/
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

/*CREER UNE PUBLICATION*/
exports.createPost = (req, res, next) => {
	const post = req.file
		? {
				userId: req.body.userId,
				title: req.body.title,
				content: req.body.content,
				image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		  }
		: { ...req.body };
	Post.create(post)
		.then(post => {
			res.send(post);
		})
		.catch(error => res.status(500).json({ error: error }));
};

/*TROUVER TOUTES LES PUBLICATIONS*/
exports.getAllPosts = (req, res, next) => {
	Post.findAll({
		include: [
			{
				model: Comment,
				include: [
					{
						model: User
					}
				]
			},
			User
		],
		order: [
			["updatedAt", "desc"],
			["createdAt", "DESC"]
		]
	})
		.then(post => res.status(200).json(post))
		.catch(error => res.status(404).json({ error }));
};

/*TROUVER UNE PUBLICATION SPECIFIQUE*/
exports.getOnePost = (req, res, next) => {
	Post.findOne({
		where: { id: req.params.id },
		include: [
			User,
			{
				model: Comment,
				include: User
			}
		],
		order: [[{ model: Comment }, "createdAt", "asc"]]
	})
		.then(post => res.status(200).json(post))
		.catch(error => res.status(404).json({ error: "getOne error : " + error }));
};

/*MODIFIER UNE PUBLICATION*/ exports.modifyPost = (req, res, next) => {
	if (req.body.content.length < 3 || req.body.title.length < 3) {
		res.status(400).json({ error: "Ce changement est beaucoup trop court" });
	} else {
		Post.findOne({ where: { id: req.params.id } })
			.then(post => {
				console.log(res);
				if (post.userId === req.body.userId) {
					const postObject = req.file
						? {
								...req.body.post,
								image: `${req.protocol}://${req.get("host")}/images/${
									req.file.filename
								}`
						  }
						: { ...req.body };
					if (req.file) {
						if (post.image != null) {
							const filename = post.image.split("/images/")[1];
							fs.unlink(`./images/${filename}`, () => {
								Post.update(
									{
										...postObject
									},
									{ where: { id: req.params.id } }
								)
									.then(() =>
										res
											.status(200)
											.json({ message: "Publication modifiée avec succés " })
									)
									.catch(error => res.status(400).json({ error }));
							});
						} else {
							Post.update(
								{
									...postObject
								},
								{ where: { id: req.params.id } }
							)
								.then(() =>
									res
										.status(200)
										.json({ message: "Publication modifiée avec succés ! !" })
								)
								.catch(error => res.status(400).json({ error }));
						}
					} else {
						Post.update(
							{
								...postObject
							},
							{ where: { id: req.params.id } }
						)
							.then(() =>
								res
									.status(200)
									.json({ message: "Publication modifiée avec succés ! !" })
							)
							.catch(error => res.status(400).json({ error }));
					}
				} else {
					res.status(401).json({
						error: "Vous ne disposez pas des droits pour modifier cette publication !"
					});
				}
			})
			.catch(error => res.status(404).json({ error: "Publication introuvable !" + error }));
	}
};

/*SUPPRIMER UNE PUBLICATION*/
exports.deletePost = (req, res, next) => {
	const id = req.params.id;

	Post.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Publication supprimée!"
				});
			} else {
				res.send({
					message: `Impossible de supprimer la publication avec l'id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "erreur lors de la suppression de la publication avec l'id=" + id
			});
		});
};
