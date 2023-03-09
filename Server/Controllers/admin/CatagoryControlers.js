/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
const { User } = require("../../Model/UserSchema");
const { CatagoryModel } = require("../../Model/CatagoryModal");
const { SongModel } = require("../../Model/SongModal");

module.exports = {
  getCatagory: async (req, res) => {
    try {
      const Catagory = await CatagoryModel.find();
      res.json({ catagory: Catagory });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in finding user", success: false });
    }
  },
  addCatagory: async (req, res) => {
    const name = req.body.Category;
    const { discription } = req.body;
    console.log(name, discription);
    try {
      const newCategory = await CatagoryModel({
        name: name,
        discription: discription,
      });
      await newCategory.save();
      res.status(200).send({
        message: "Category added successfully",
        success: true,
      });
    } catch (error) {
      return res
        .status(200)
        .send({ message: "Error in adding category", success: false });
    }
  },
};
