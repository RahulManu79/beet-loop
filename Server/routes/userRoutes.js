const express = require("express");
const {
  userRegister,
  resetPass,
  userLogin,
  updateProfile,
  getProfile,
} = require("../Controllers/user/userController");
const AuthMiddleware = require("../miiddleware/AuthMidilware");

const router = express.Router();

router.post("/userregister", userRegister);

router.post("/login", userLogin);

router.post("/resetpass", resetPass);

router.get("/getprofile/:id", AuthMiddleware, getProfile);

router.post("/updateprofile", AuthMiddleware, updateProfile);

module.exports = router;
