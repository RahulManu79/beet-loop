/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const { SongModel } = require("../../Model/SongModal");
const { Artist } = require("../../Model/ArtistModel");
const { CatagoryModel } = require("../../Model/CatagoryModal");

module.exports = {
  addTrack: async (req, res) => {
    try {
      console.log(req.body);
      const artistID = req.params.id;
      const category = await CatagoryModel.findOne({
        name: req.body.category,
      });
      console.log(category);
      const addSong = await SongModel({
        name: req.body.data.songName,
        artist: req.body.name,
        songURL: req.body.audio,
        imgURL: req.body.img,
        language: req.body.data.language,
        category: category._id,
        album: req.body.data.albumName,
      });
      const songSaved = await addSong.save();

      await Artist.findByIdAndUpdate(
        artistID,
        {
          $push: { songs: songSaved._id },
        },
        { new: true }
      ).then(() => {
        res.status(200).send({
          message: "Song added Successfully ",
          success: true,
        });
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "error logging in", success: false, error });
    }
  },
  getSongs: async (req, res) => {
    try {
      const songs = await SongModel.find();
      res.json({ song: songs });
    } catch (error) {
      return res.status(200).send({ message: "error in listing Artist" });
    }
  },
};
