/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router();

/*IMPORT FONCTIONS*/
const commentCtrl = require("../controllers/comment");
const authCtrl = require("../middleware/auth");
const regexCtrl = require("../middleware/regex");

/*APPEL FONCTIONS*/
//création
router.post("/add", authCtrl, regexCtrl.Validation, commentCtrl.createComment);
//recherche
router.get("/:id", commentCtrl.findOneComment);
router.get("/all", commentCtrl.findAllComments);
//modification
router.put("/:id", authCtrl, commentCtrl.modifyComment);
//supprimer
router.delete("/:id", authCtrl, commentCtrl.deleteComment);

module.exports = router;
