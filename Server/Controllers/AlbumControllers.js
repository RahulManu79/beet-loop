const Album = require("../Model/AlbumSchema");
const { SongModel } = require("../Model/SongModal");
const { Artist } = require("../Model/ArtistModel");

module.exports = {
  createAlbum: async (req, res) => {
    try {
      const newAlbum = await Album({
        title: req.body.name,
        songs: req.body.songId,
        imgUrl: req.body.imgUrl,
        createdBy: req.body.artistId,
      });
      await newAlbum.save();
      res
        .status(200)
        .send({ message: "Play created successfully", success: true });
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
    }
  },
  getArtistSong: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id).populate({
        path: "songs",
        model: "song",
      });
      console.log(artist);
      res.status(200).send({
        message: "Songs fetched successfully ",
        success: true,
        data: artist.songs,
      });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
    }
  },
};
