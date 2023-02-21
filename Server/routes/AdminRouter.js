const express = require("express");
const {
  AdminLogin,
  getUser,
  userBlk,
} = require("../Controllers/admin/AdminControllers");

const router = express.Router();

router.post("/login", AdminLogin);

router.get("/getUser", getUser);

router.get("/userBlk/:id", userBlk);
module.exports = router;
