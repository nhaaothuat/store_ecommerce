import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {

     try {
          let userData = await userModel.findById(req.body.userId)
          let cartData = await userData.cartData;
          if(!cartData[req.body.itemId]){
               cartData[req.body.itemId] = 1
          }else{
               cartData[req.body.itemId] += 1
          }
          await userModel.findByIdAndUpdate(req.body.userId,{cartData})
          res.json({success:true, message:"Item added to cart successfully"})
          
     } catch (error) {
          console.log(error)
          res.json({success:false, message:"Error"})
     }
};

export const removeFromCart = async (req, res) => {
     try {
          let userData = await userModel.findById(req.body.userId)
          let cartData =  userData.cartData;
          if(cartData[req.body.itemId]>0){
               cartData[req.body.itemId] -= 1
          }
          await userModel.findByIdAndUpdate(req.body.userId,{cartData})
          res.json({success:true, message:"Item removed from cart successfully"})
     } catch (error) {
          console.log(error);
          res.json({success:false, message:"Error"})
          
     }
};

export const getCart = async (req, res) => {
     try {
          let userData = await userModel.findById(req.body.userId);
          let cartData = await userData.cartData
          res.json({success:false, cartData})
     } catch (error) {
          
          console.log(error);
          res.json({success:false, message:"Error"})
     }
};

export default { addToCart, removeFromCart, getCart };
