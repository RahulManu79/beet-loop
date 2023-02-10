const express = require("express");
const UserRouter = express.Router();

UserRouter.get("/user");

module.exports = UserRouter;
