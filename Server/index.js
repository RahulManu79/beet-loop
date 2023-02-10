const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const color = require("colors");
const UserRouter = require("./routes/userRoutes");
const DB = require("./MongodbConfig/Config");
dotenv.config();

DB();
const app = express();

app.use(
  cors({
    origin: ["localhost://5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", UserRouter);

app.listen(process.env.PORT, () =>
  console.log("Listening at 3000".bgBlue.white)
);
module.exports = app;
