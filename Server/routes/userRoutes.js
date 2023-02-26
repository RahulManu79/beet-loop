const express = require("express");
const {
  userRegister,
  userLogin,
  getProfile,
} = require("../Controllers/user/userController");

const router = express.Router();

router.post("/userregister", userRegister);

router.post("/login", userLogin);

router.get("/getprofile/:id", getProfile);

module.exports = router;
