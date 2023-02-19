/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
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
    songs: {
      type: [String],
      default: [],
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
    followers: {
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
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = { Artist };
