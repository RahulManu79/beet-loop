const express = require("express");
const {
  ArtistRegister,
  LoginArtist,
} = require("../Controllers/artist/ArtistControler");

const { addTrack, getSongs } = require("../Controllers/AddTrack/AddTrack");
const AuthMidilware = require("../miiddleware/AuthMidilware");

const router = express.Router();

router.post("/register", ArtistRegister);

router.post("/login", LoginArtist);

router.post("/addtrack/:id", addTrack);

router.get("/getsongs", AuthMidilware, getSongs);

module.exports = router;
