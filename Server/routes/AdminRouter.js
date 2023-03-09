const express = require("express");
const {
  AdminLogin,
  getUser,
  getArtist,
  userBlk,
  artistVerify,
  artistBlk,
} = require("../Controllers/admin/AdminControllers");
const {
  getCatagory,
  addCatagory,
} = require("../Controllers/admin/CatagoryControlers");
const AuthMiddleware = require("../miiddleware/AuthMidilware");

const router = express.Router();

router.post("/login", AdminLogin);

router.get("/getUser", AuthMiddleware, getUser);

router.get("/getArtist", AuthMiddleware, getArtist);

router.get("/userBlk/:id", AuthMiddleware, userBlk);

router.get("/artistBlk/:id", AuthMiddleware, artistBlk);

router.get("/doArtistVry/:id", AuthMiddleware, artistVerify);

router.get("/getcatagory", AuthMiddleware, getCatagory);

router.post("/addcatagory", AuthMiddleware, addCatagory);

module.exports = router;
