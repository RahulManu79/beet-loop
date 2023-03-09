/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const conn = mongoose.connection;

    // Create GridFS Bucket instance
    let gfs;
    conn.once("open", () => {
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "BeatLoop",
      });
    });
    // await mongoose.connect(process.env.LOCAL_DATABASE)
    console.log(`Mongodb connected `.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb server issue ${error}`.bgRed.white);
  }
};

module.exports = ConnectDb;
