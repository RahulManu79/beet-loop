/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Artist } = require("../../Model/ArtistModel");

module.exports = {
  ArtistRegister: async (req, res) => {
    try {
      console.log(req.body);
      if (req.body.ConfirmPassword !== req.body.password) {
        res
          .status(400)
          .send({ message: "passwords does not match ", success: false });
      } else {
        const user = await Artist.findOne({ email: req.body.email });

        if (user) {
          res
            .status(400)
            .send({ message: "Email Already used!!", success: false });
        } else {
          const { password } = req.body;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newArtist = new Artist({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
          });
          await newArtist.save();

          res
            .status(200)
            .send({ message: "user created successfully", success: true });
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "user already exists", success: false, error });
    }
  },

  LoginArtist: async (req, res) => {
    try {
      const { email, password } = req.body;
      // eslint-disable-next-line object-shorthand
      const user = await Artist.findOne({ email: email });
      if (!user) {
        res
          .status(400)
          .send({ message: "No User Found in this email", success: false });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
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
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "error logging in", success: false, error });
    }
  },
};
