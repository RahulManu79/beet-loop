/* eslint-disable object-shorthand */
/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
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
            idurl: req.body.imageUrl,
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
          .status(200)
          .send({ message: "No User Found in this email", success: false });
      } else {
        if (user.isBanned) {
          res
            .status(200)
            .send({ message: "Your account has been baned", success: false });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            // eslint-disable-next-line no-underscore-dangle
            const token = jwt.sign(
              { _id: this._id },
              process.env.JWTPRIVATEKEY,
              {
                expiresIn: "7d",
              }
            );
            res.status(200).send({
              message: "Successfully logged in",
              success: true,
              data: token,
              name: user.name,
              id: user._id,
              pic: user.profilepic,
            });
          } else {
            return res
              .status(200)
              .send({ message: "password incorrect", success: false });
          }
        }
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "error logging in", success: false, error });
    }
  },
  getProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(req.params);
      const user = await Artist.findById(userId);
      if (user) {
        res.status(200).send({
          message: "Fetched User Profile",
          success: true,
          data: user,
        });
      } else {
        return res
          .status(200)
          .send({ message: "Error in Fetching User Profile ", success: false });
      }
    } catch (error) {
      res.status(500).send({
        message: "error in getting user Profile",
        success: false,
        error,
      });
    }
  },
  updateProfile: async (req, res) => {
    console.log(req.body, req.query);
    const { id } = req.query;
    const { email, name, phone } = req.body;
    try {
      // eslint-disable-next-line object-shorthand
      await Artist.findOneAndUpdate(
        { _id: id },
        { $set: { name: name, email: email, phone: phone } }
      ).then(async () => {
        const ruser = await Artist.findOne({ _id: id });
        console.log(ruser);
        res.status(200).send({
          message: "Profile Updated Successful",
          success: true,
          name: ruser.name,
          id: ruser._id,
        });
      });
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error in updating Profile", success: false });
    }
  },
  addProfilepic: async (req, res) => {
    const userId = req.body.id;
    const { img } = req.body;
    const user = await Artist.findOneAndUpdate(
      { _id: userId },
      { profilepic: img }
    );
    console.log(user);
    res.status(200).send({
      message: "Profile Updated Successful",
      success: true,
    });
  },
};
