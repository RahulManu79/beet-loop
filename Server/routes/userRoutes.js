const express = require("express");
const {
  userRegister,
  resetPass,
  userLogin,
  updateProfile,
  getProfile,
} = require("../Controllers/user/userController");
const { addProfilepic } = require("../Controllers/user/Profilecontroller");
const {
  addPlaylist,
  getPlaylist,
  getCreatedplaylisted,
  addSongToPlaylist,
  getPlaylistsong,
  removeSongfromplylist,
} = require("../Controllers/PlayListControllers");
const AuthMiddleware = require("../miiddleware/AuthMidilware");
const {
  addFollowing,
  isFollowing,
  unFollowing,
} = require("../Controllers/FollowingControllers");
const { likeSong } = require("../Controllers/LikeController");

const router = express.Router();

router.post("/userregister", userRegister);

router.post("/login", userLogin);

router.post("/resetpass", resetPass);

router.get("/getprofile/:id", AuthMiddleware, getProfile);

router.post("/updateprofile", AuthMiddleware, updateProfile);

router.post("/addprofilpic", AuthMiddleware, addProfilepic);

router.post("/add-playlist/:id", addPlaylist);

router.get("/get-playlist/:id", AuthMiddleware, getPlaylist);

router.get("/created-playlist", getCreatedplaylisted);

router.post("/addsong-playlist", addSongToPlaylist);

router.get("/get-playlistsongs/:id", getPlaylistsong);

router.post("/playlist-removesong", removeSongfromplylist);

router.post("/follow-artist", addFollowing);

router.post("/unfollow-artist", unFollowing);

router.get("/check-isfollwed/:id", isFollowing);

router.post("/like", likeSong);

module.exports = router;
