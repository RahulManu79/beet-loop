const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
      unique: true,
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
