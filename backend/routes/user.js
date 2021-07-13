/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router();

/*IMPORT FONCTIONS*/
const userCtrl = require("../controllers/user");
const regexCtrl = require("../middleware/regex");
const authCtrl = require("../middleware/auth");
const adminOwner = require("../middleware/AdminOwner");

/*APPEL FONCTIONS*/
//création
router.post("/sign", regexCtrl.authValidation, userCtrl.signup);
//connection
router.post("/log", userCtrl.login);
//recherche
router.get("/facts", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
//modification
router.put("/:id", authCtrl, adminOwner, regexCtrl.authValidation, userCtrl.modifyUser);
//suppression
router.delete("/:id", authCtrl, adminOwner, userCtrl.deleteUser);

module.exports = router;
