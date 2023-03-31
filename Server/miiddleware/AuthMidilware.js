const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    console.log("jwt");
    // eslint-disable-next-line dot-notation
    const token = req.headers["authorization"];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        console.log(err, "jwt potti");
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
        // eslint-disable-next-line no-else-return
      } else {
        console.log("jwt kazhinjeen");
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("jwt catch");
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
