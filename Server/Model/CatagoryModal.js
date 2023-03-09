const mongoose = require("mongoose");

const Catagory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const CatagoryModel = mongoose.model("catagory", Catagory);
module.exports = { CatagoryModel };
