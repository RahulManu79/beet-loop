/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../Model/UserSchema");
const { Artist } = require("../../Model/ArtistModel");

module.exports = {
  userRegister: async (req, res) => {
    try {
      if (req.body.ConfirmPassword !== req.body.password) {
        res
          .status(400)
          .send({ message: "passwords does not match ", success: false });
      }
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        res
          .status(400)
          .send({ message: "User already Exists", success: false });
      } else {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
        });
        await newUser.save();

        res
          .status(200)
          .send({ message: "user created successfully", success: true });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "user already exists", success: false, error });
    }
  },

  // eslint-disable-next-line consistent-return
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      // eslint-disable-next-line object-shorthand
      const user = await User.findOne({ email: email });

      if (!user) {
        res
          .status(200)
          .send({ message: "No User Found in this email", success: false });
      } else {
        // eslint-disable-next-line no-lonely-if
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
      const user = await User.findById(userId);
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

  resetPass: async (req, res) => {
    try {
      const { email } = req.body;
      const pass = req.body.Password;
      const Role = req.body.role;
      if (Role === "fan") {
        console.log(email, pass);
        const user = await User.find({ email });
        if (!user) {
          res
            .status(200)
            .send({ message: "No User in this Email", success: false });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(pass, salt);
          await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } }
          ).then(() => {
            res
              .status(200)
              .send({ message: "Password Changed Successful", success: true });
          });
        }
      } else {
        console.log(email, pass);
        const artist = await Artist.find({ email });
        if (!artist) {
          res
            .status(200)
            .send({ message: "No User in this Email", success: false });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(pass, salt);
          await Artist.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } }
          ).then(() => {
            res
              .status(200)
              .send({ message: "Password Changed Successful", success: true });
          });
        }
      }
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error in updating password", success: false });
    }
  },

  updateProfile: async (req, res) => {
    console.log(req.body, req.query);
    const { id } = req.query;
    const { email, name, phone } = req.body;
    try {
      // eslint-disable-next-line object-shorthand
      await User.findOneAndUpdate(
        { _id: id },
        { $set: { name: name, email: email, phone: phone } }
      ).then(async () => {
        const ruser = await User.findOne({ _id: id });
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
};
