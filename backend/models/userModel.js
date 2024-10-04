import mongoose from "mongoose";

const Schema = mongoose.Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: {type: Object,default:{}}
},{minimize:false});

export default mongoose.model("user", userSchema);
