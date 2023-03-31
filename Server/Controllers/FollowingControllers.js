const Following = require("../Model/FollowingSchema");

module.exports = {
  addFollowing: async (req, res) => {
    console.log(req.body);
    try {
      const followerId = req.body.userId;
      const followingId = req.body.artistId;
      const newFollowing = new Following({
        follower: followerId,
        artist: followingId,
      });

      await newFollowing.save();

      res.status(200).send({ message: "Following Artist", success: true });

      // console.log("New following relationship added successfully");
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
      console.error("Error adding following relationship:", error);
    }
  },
  unFollowing: async (req, res) => {
    console.log(req.body);
    try {
      const followerId = req.body.userId;
      const followingId = req.body.artistId;
      const unFollowing = await Following.deleteOne({
        artist: followingId,
        follower: followerId,
      });
      unFollowing.save();

      res.status(200).send({ message: "Following Artist", success: true });

      // console.log("New following relationship added successfully");
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error in getting  song", success: false });
      console.error("Error adding following relationship:", error);
    }
  },

  isFollowing: async (req, res) => {
    console.log(req.params);
    const following = await Following.find({ follower: req.params.id });
    console.log(following);
    res.status(200).send({ success: true, following });
  },
};
