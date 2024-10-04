import foodModel from "../models/foodModel.js";
import fs from "fs/promises";

export const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,

    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error " });
  }
};

export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const removeFood = async (req, res) => {
  
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    console.log(food)
     fs.unlink(`uploads/${food.image}`, () => {})
      // console.log(fs.unlink(`uploads/${food.image}`, () => {}))

    
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }


  
};

export default { addFood, listFood, removeFood };
