/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router();

/*IMPORT FONCTIONS*/
const userCtrl = require("../controllers/user");
const regexCtrl = require("../middleware/regex");
const authCtrl = require("../middleware/auth");

/*APPEL FONCTIONS*/
//création
router.post("/sign", regexCtrl.authValidation, userCtrl.signup);
//connection
router.post("/log", userCtrl.login);
//recherche
router.get("/facts", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
//modification
router.put("/:id", authCtrl, regexCtrl.authValidation, userCtrl.modifyUser);
//suppression
router.delete("/:id", authCtrl, userCtrl.deleteUser);

module.exports = router;
