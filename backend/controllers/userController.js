import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


export const loginUser = async (req, res) => {
     const {email,password} = req.body;

     try {
          const user = await userModel.findOne({email})
          
          if(!user){
               return res.json({success:false,message: "User not found"})
          }

          const isMatch = await bcrypt.compare(password,user.password)
          if(!isMatch){
               return res.json({success:false,message:"Invalid credentials"})
          }

          const token = createToke(user._id)
          res.json({success:true,token})
     } catch (error) {
          console.log(error)
          res.json({success:false, messeger:"Error!"})
     }
}


const createToke = (id)=>{
     return jwt.sign({id},process.env.JWT_KEY)
}

export const registerUser = async (req, res) => {
   const {name, password, email} = req.body

   try {
       const exist = await userModel.findOne({email})

       if(exist){
          return res.json({success:false, messeger:"User already exist!"})
       }

       if(!validator.isEmail(email)){
          return res.json({success:false,messenger:"Please enter a valid email" })
       }

       if(password.length<8){
          return res.json({success:false,messeger:"Please enter password again"})
       }

       const salt = await bcrypt.genSalt(10)
       const hashedPassword =  await bcrypt.hash(password,salt)

       const newUser = new userModel({
          name:name,
          email:email,
          password:hashedPassword
       })   

     
      const user =  await newUser.save()
      const token = createToke(user._id)
      res.json({success:true, token})
   } catch (error) {
     console.log(error)
     res.json({success:false,messeger:"Error"})
     
   }

}

export default { loginUser, registerUser };


