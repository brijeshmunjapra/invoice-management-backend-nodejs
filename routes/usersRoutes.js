const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const registerController = require("../controllers/userControllers/register");
const loginController = require("../controllers/userControllers/login");

router.post("/register", registerController.registerData);

router.post("/login", loginController);
router.put("/changepassword/:id", registerController.updateUserPassword);
router.put("/updateuser/:id", registerController.updateUserData);

module.exports = router;
