const express = require("express");
const {
  ArtistRegister,
  LoginArtist,
  getProfile,
  updateProfile,
  addProfilepic,
} = require("../Controllers/artist/ArtistControler");

const { addTrack, getSongs } = require("../Controllers/AddTrack/AddTrack");
const AuthMidilware = require("../miiddleware/AuthMidilware");
const { getArtistSong } = require("../Controllers/AlbumControllers");

const router = express.Router();

router.post("/register", ArtistRegister);

router.post("/login", LoginArtist);

router.post("/addtrack/:id", addTrack);

router.get("/getprofile/:id", getProfile);

router.get("/getsongs", AuthMidilware, getSongs);

router.get("/getartist-song/:id", getArtistSong);

router.post("/updateprofile", updateProfile);

router.post("/addprofilpic", addProfilepic);

module.exports = router;
