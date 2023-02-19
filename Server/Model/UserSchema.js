const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      default: [],
    },
    likedSongs: {
      type: [String],
      default: [],
    },
    playlist: {
      type: [String],
      default: [],
    },
    followedArtist: {
      type: [String],
      default: [],
    },
    profilepic: {
      type: String,
    },
    album: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = { User };
