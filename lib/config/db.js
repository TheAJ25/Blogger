import mongoose from "mongoose";

export const ConnectDB = async()=>{
  await mongoose.connect("mongodb+srv://abhijit:abhi123@cluster0.xzu1u.mongodb.net/blog_app")
  console.log("DB Connected !");
}