const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
      index: true,
    },
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Ensure that the combination of follower and following is unique
followingSchema.index({ follower: 1, artist: 1 }, { unique: true });

const Following = mongoose.model("Following", followingSchema);

module.exports = Following;
