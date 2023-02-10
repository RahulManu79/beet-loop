const mongoose = require("mongoose");
const color = require("colors");

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    // await mongoose.connect(process.env.LOCAL_DATABASE)
    console.log(`Mongodb connected `.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb server issue ${error}`.bgRed.white);
  }
};

module.exports = ConnectDb;
