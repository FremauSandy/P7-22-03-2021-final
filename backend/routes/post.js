/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router();

/*IMPORT FONCTIONS*/
const postCtrl = require("../controllers/post");
const multerCtrl = require("../middleware/multerOriginal");
const authCtrl = require("../middleware/auth");
const regexCtrl = require("../middleware/regex");

/*APPEL FONCTIONS*/
// création
router.post("/add", authCtrl, multerCtrl, regexCtrl.Validation, postCtrl.createPost);
//recherche
router.get("/all", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
//modification
router.put("/:id", authCtrl, regexCtrl.Validation, multerCtrl, postCtrl.modifyPost);
//supprimer
router.delete("/:id", authCtrl, multerCtrl, postCtrl.deletePost);

module.exports = router;
