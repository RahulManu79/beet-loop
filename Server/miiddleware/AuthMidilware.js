const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    console.log("vnnooo");
    // eslint-disable-next-line dot-notation
    const token = req.headers["authorization"].split(" ")[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
        // eslint-disable-next-line no-else-return
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
