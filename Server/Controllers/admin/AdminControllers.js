/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../Model/UserSchema");

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
};
