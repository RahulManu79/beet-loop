const express = require("express");
const { AdminLogin } = require("../Controllers/admin/AdminControllers");

const router = express.Router();

router.post("/login", AdminLogin);

module.exports = router;
