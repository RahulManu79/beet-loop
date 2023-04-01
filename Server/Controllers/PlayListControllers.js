/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { User } = require("../Model/UserSchema");
const { PlaylisModel } = require("../Model/PlaylisModel");

module.exports = {
  addPlaylist: async (req, res) => {
    try {
      const counted = await PlaylisModel.find({ owner: req.params.id }).count();
      const name = `My Playlist #${counted + 1}`;
      const NewPlaylist = await PlaylisModel({
        title: name,
        owner: req.params.id,
      });
      await NewPlaylist.save();
      res
        .status(200)
        .send({ message: "Play created successfully", success: true });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
    }
  },
  getPlaylist: async (req, res) => {
    try {
      const playList = await PlaylisModel.find({ owner: req.params.id });
      res.status(200).send({
        message: "Play get successfully",
        success: true,
        data: playList,
      });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
    }
  },

  // playlistAddSong: async (req, res) => {
  //   console.log(vannu);
  // },
  getCreatedplaylisted: async (req, res) => {
    console.log("vannu");
    const playlist = await PlaylisModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(1);
    console.log(playlist, "fdf");
    res.status(200).send({
      message: "Play get successfully",
      success: true,
      data: playlist,
    });
  },
  addSongToPlaylist: async (req, res) => {
    try {
      console.log(req.body);
      PlaylisModel.findOne({ _id: req.body.playid }).then((playlist) => {
        console.log(playlist.songs);
        console.log(playlist.songs.includes(req.body.songid));
        if (playlist.songs.includes(req.body.songid)) {
          res.status(200).send({
            message: "Song already Exists",
            success: false,
          });
        } else {
          playlist.songs.push(req.body.songid);
          playlist.save();
          console.log(playlist);
          res.status(200).send({
            message: "Song Added successfully",
            success: true,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(200).send({
        message: "Error in adding Songs",
        success: false,
      });
    }
  },
  getPlaylistsong: async (req, res) => {
    try {
      console.log(req.params.id);
      const playlist = await PlaylisModel.find({ _id: req.params.id }).populate(
        "songs"
      );
      console.log(playlist);
      res.status(200).send({
        message: "songs Fetched successfully",
        success: true,
        data: playlist,
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeSongfromplylist: async (req, res) => {
    try {
      console.log(req.body);
      const playlist = await PlaylisModel.findById({
        _id: req.body.playlistId,
      });

      const RmSong = playlist.songs.indexOf(req.body.songId);
      playlist.songs.splice(RmSong, 1);
      playlist.save();
      res.status(200).send({
        message: "songs removed successfully",
        success: true,
        data: playlist,
      });
    } catch (error) {
      res.status(200).send({
        message: "Something Went Wrong",
        success: true,
      });
    }
  },
};
