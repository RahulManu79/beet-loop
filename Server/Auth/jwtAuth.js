const jwt = require("jsonwebtoken");
const UserSchema = require("../Model/UserSchema");

UserSchema.methods.generaAuthToken = () => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
