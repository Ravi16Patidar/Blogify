import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'User',
    required:true,
  },
  author: { 
    type: String, 
    required: true 
  },
  image: {
    type: String,
    required: true,
  },

  publishDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
