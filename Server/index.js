const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");
const UserRouter = require("./routes/userRoutes");
const ArtistRouter = require("./routes/ArtistRouter");
const AdminRouter = require("./routes/AdminRouter");
const DB = require("./MongodbConfig/Config");

dotenv.config();

DB();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.path, req.method);
  next();
});

app.use("/", UserRouter);
app.use("/artist", ArtistRouter);
app.use("/admin", AdminRouter);
// eslint-disable-next-line no-console
app.listen(
  process.env.PORT,
  () =>
    // eslint-disable-next-line comma-dangle, implicit-arrow-linebreak, no-console
    console.log("Listening at 3000".bgBlue.white)
  // eslint-disable-next-line function-paren-newline
);
module.exports = app;
