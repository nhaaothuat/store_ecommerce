import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoutes from "./routes/foodRoute.js";
import userRoutes from "./routes/userRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
//sử dụng type:module trong package.json giúp viết code javascript hiện đại không dùng const nhiều để import
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//khai báo phải có .js đằng sau
connectDB();

app.use("/api/food", foodRoutes);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.get("/fails", (req, res) => {
  res.send("API not working");
});

app.listen(PORT, () => {
  console.log(`Server on listening on ${PORT}`);
});
