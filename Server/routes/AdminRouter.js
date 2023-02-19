const express = require("express");
const {
  AdminLogin,
  getUser,
} = require("../Controllers/admin/AdminControllers");

const router = express.Router();

router.post("/login", AdminLogin);

router.get("/getUser", getUser);
module.exports = router;
