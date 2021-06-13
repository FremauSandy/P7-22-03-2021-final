/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router();

/*IMPORT FONCTIONS*/
const userCtrl = require("../controllers/user");
const regexCtrl = require("../middleware/regex");
const authCtrl = require("../middleware/auth");
const multerCtrl = require("../middleware/multer-config");
// const bouncer = require("express-bouncer")(120000, 1.8e6, 5);

/*LIMITE CONNECTIONS*/
// bouncer.blocked = function (req, res, next, remaining) {
// 	res.send(429, "Trop de requêtes, " + "Veuillez patienter " + remaining / 1000 + " secondes");
// };

/*APPEL FONCTIONS*/
//création
router.post("/sign", regexCtrl.authValidation, userCtrl.signup);
//connection
router.post("/log", userCtrl.login); // ajout bouncer
//recherche
router.get("/facts", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
//modification
router.put("/:id", authCtrl, regexCtrl.authValidation, userCtrl.modifyUser);
//suppression
router.delete("/:id", authCtrl, userCtrl.deleteUser);

module.exports = router;
