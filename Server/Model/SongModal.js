/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    songURL: { type: String, required: true },
    imgURL: { type: String, required: true },
    language: { type: String, required: true },
    // duration: { type: Number, required: true },
    album: { type: String },
    catagory: { type: mongoose.Schema.Types.ObjectId, ref: "catagory" },
  },
  {
    timestamps: true,
  }
);

const SongModel = mongoose.model("song", SongSchema);
module.exports = { SongModel };
