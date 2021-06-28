/*IMPORT MODEL*/
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

/*CREATION D'UN COMMENTAIRE*/
exports.createComment = (req, res, next) => {
	const comment = req.file
		? {
				postId: postId,
				userId: req.token.userId,
				content: req.body.content
		  }
		: { ...req.body };
	Comment.create(comment)
		.then(comment => {
			res.send(comment);
		})
		.catch(error => res.status(500).json({ error: error }));
};

/*RECHERCHER UN COMMENTAIRE*/
exports.findOneComment = (req, res, next) => {
	Comment.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: User
			}
		],
		order: [
			["createdAt", "asc"],
			["createdAt", "DESC"]
		]
	})
		.then(post => res.status(200).json(post))
		.catch(error => res.status(404).json({ error: "getOne error : " + error }));
};

/*RECHERCHER TOUS LES COMMENTAIRES*/
exports.findAllComments = (req, res, next) => {
	Comment.findAll({
		include: [
			{
				model: User
			}
		],
		order: [
			["updatedAt", "desc"],
			["createdAt", "DESC"]
		]
	})
		.then(comment => res.status(200).json(comment))
		.catch(error => res.status(404).json({ error }));
};

/*MODIFIER UN COMMENTAIRE*/
exports.modifyComment = (req, res, next) => {
	const id = req.params.id;
	const modification = req.file
		? {
				userId: req.body.userId,
				postId: req.body.postId,
				content: req.body.content
		  }
		: {
				userId: req.body.userId,
				postId: req.body.postId,
				content: req.body.content
		  };
	Comment.update(modification, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Votre commentaire à bien été modifié "
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour le commentaire avec l'id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "erreur lors de la mise à jour du commentaire avec l'id=" + id
			});
		});
};

/*SUPPRIMER UN COMMENTAIRE*/
exports.deleteComment = (req, res, next) => {
	const id = req.params.id;

	Comment.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Votre commentaire à bien été supprimé!"
				});
			} else {
				res.send({
					message: `Impossible de supprimer le commentaire avec l'id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "erreur lors de la suppression du commentaire avec l'id=" + id
			});
		});
};
