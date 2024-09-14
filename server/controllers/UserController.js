import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { password, ...restData } = req.body;
    const isEmailExist=await UserModel.findOne({email:req.body.email})
    if(isEmailExist){
    return res.status(409).json({
      message:"Email already exist",
      status:409
    })
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const userData = {
      ...restData,
      password: hashPassword,
    };
    let result = await UserModel.create(userData);
    res.status(201).json({
      data: result,
      message: "Signup successfully",
      status: 201,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
      error: err,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userData = await UserModel.findOne({ email });
    if (userData) {
      bcrypt.compare(password, userData.password, function (err, result) {
        if (result) {
          let payload = { userData };
          let token = jwt.sign(payload, process.env.SECREAT_KEY);
          res.status(200).json({
            message: "login successfully",
            status: 200,
            token:token
          });
        } else {
          res.status(400).json({
            message: "password Incorrect",
            status: 400,
          });
        }
      });
    } else {
      res.status(400).json({
        message: "user not found",
        status: 400,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
      error: err,
    });
  }
};

export const userData=async (req,res)=>{
  try{
    let userId=req.params.id;
    const user=await UserModel.findById(userId)
    if(!user){
      return res.status(400).res.send('user not found')
    }
    res.status(200).json({message:'user Data',user})
  }catch(err){
    res.status(500).json({error:err})
  }
}