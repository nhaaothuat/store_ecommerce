import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import PayOS from "@payos/node";

dotenv.config();

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

export const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    // Validate userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const paymentData = {
      orderId: newOrder._id.toString(),
      amount: Math.round(newOrder.amount * 100),
      orderCode: Date.now(),
      description: `Payment for: ${newOrder._id.toString().substring(0, 6)}`,
      returnUrl: "http://localhost:5173/test",
      cancelUrl: "http://localhost:5173/",
    };

    console.log("Payment Data:", paymentData);

    let paymentResponse;
    try {
      console.log("Attempting to create payment link with data:", paymentData);
      paymentResponse = await payOS.createPaymentLink(paymentData);
      console.log("Payment Response:", paymentResponse);
    } catch (paymentError) {
      console.error("PayOS Error:", paymentError);
      console.error(
        "PayOS Error Details:",
        JSON.stringify(paymentError, null, 2)
      );
      throw new Error(
        `Lỗi khi tạo liên kết thanh toán: ${paymentError.message}`
      );
    }

    console.log(paymentResponse);

    if (paymentResponse && paymentResponse.checkoutUrl) {
      newOrder.payment = false; // Payment is initiated but not completed
      await newOrder.save();

      res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
        paymentUrl: paymentResponse.checkoutUrl,
      });
    } else {
      throw new Error("Invalid payment response");
    }
  } catch (error) {
    console.error("Order Error:", error);
    console.error("Full Error Object:", JSON.stringify(error, null, 2));
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xử lý đơn hàng",
      error: error.message,
      fullError: JSON.stringify(error, null, 2),
    });
  }
};

export default { placeOrder };
