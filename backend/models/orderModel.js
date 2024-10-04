import mongoose from "mongoose";

const Schema = mongoose.Schema
const orderSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
     items: { type: [Object], required: true },
     amount: { type: Number, required: true },
     address: { type: Object, required: true },
     status: { type: String, default: "Food Processing" },
     date: { type: Date, default: Date.now },
     payment: { type: Boolean, default: false }
});

export default mongoose.model("order", orderSchema);
