const express = require("express");
const {
  AdminLogin,
  getUser,
  getArtist,
  userBlk,
  artistVerify,
  artistBlk,
} = require("../Controllers/admin/AdminControllers");

const router = express.Router();

router.post("/login", AdminLogin);

router.get("/getUser", getUser);

router.get("/getArtist", getArtist);

router.get("/userBlk/:id", userBlk);

router.get("/artistBlk/:id", artistBlk);

router.get("/doArtistVry/:id", artistVerify);

module.exports = router;
