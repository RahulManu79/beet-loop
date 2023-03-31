/* eslint-disable no-undef */
const { User } = require("../../Model/UserSchema");

module.exports = {
  addProfilepic: async (req, res) => {
    const userId = req.body.id;
    const { img } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { profilepic: img }
    );
    console.log(user);
  },
};
