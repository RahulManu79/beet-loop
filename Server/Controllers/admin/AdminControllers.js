/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../Model/UserSchema");
const { Artist } = require("../../Model/ArtistModel");

module.exports = {
  AdminLogin: async (req, res) => {
    const isAdmin = await User.findOne({ email: req.body.email });
    if (isAdmin.isAdmin !== true) {
      res
        .status(400)
        .send({ message: "No User Found in this email", success: false });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, isAdmin.password);
      if (isMatch) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
          expiresIn: "7d",
        });
        res.status(200).send({
          message: "Successfully logged in",
          success: true,
          data: token,
        });
      } else {
        return res
          .status(200)
          .send({ message: "password incorrect", success: false });
      }
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.find();
      res.json({ users: user });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in finding user", success: false });
    }
  },

  getArtist: async (req, res) => {
    try {
      const artist = await Artist.find();
      res.json({ artists: artist });
    } catch (error) {
      return res.status(200).send({ message: "error in listing Artist" });
    }
  },

  userBlk: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      user.isBanned = !user.isBanned;
      await user.save();
      res.json({ status: "success", message: "User Status has Changed" });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in Blocking user", success: false });
    }
  },

  artistBlk: async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findById(id);
      artist.isBanned = !artist.isBanned;
      await artist.save();
      res.json({ status: "success", message: "Artist Status has Changed" });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in Blocking Artist", success: false });
    }
  },

  artistVerify: async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findById(id);
      artist.isVerified = !artist.isVerified;
      await artist.save();
      res.json({ status: "success", message: "Artist Status has Changed" });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in Verify", success: false });
    }
  },
};
