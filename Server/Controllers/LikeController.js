/* eslint-disable no-console */
const { User } = require("../Model/UserSchema");

module.exports = {
  likeSong: async (req, res) => {
    console.log(req.body);
    const { userId } = req.body;
  },
};
