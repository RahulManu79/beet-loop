const express = require("express");
const {
  userRegister,
  userLogin,
} = require("../Controllers/user/userController");

const router = express.Router();

router.post("/userregister", userRegister);

router.post("/login", userLogin);

module.exports = router;
