/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../Model/UserSchema");

module.exports = {
  userRegister: async (req, res) => {
    try {
      console.log(req.body);
      if (req.body.ConfirmPassword !== req.body.password) {
        res
          .status(400)
          .send({ message: "passwords does not match ", success: false });
        console.log("password dose not mach");
      }
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        console.log("user already und");
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
      console.log(error);
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
            });
          } else {
            return res
              .status(200)
              .send({ message: "password incorrect", success: false });
          }
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
