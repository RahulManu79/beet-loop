const express = require("express");
const {
  ArtistRegister,
  LoginArtist,
} = require("../Controllers/artist/ArtistControler");

const router = express.Router();

router.post("/register", ArtistRegister);

router.post("/login", LoginArtist);

module.exports = router;
