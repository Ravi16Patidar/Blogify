import blogModel from '../models/BlogModel.js';

// export const createBlog = async (req, res) => {
//   try {
//     const { title, content, category, author } = req.body;
//     console.log(req.file,'file')
//     // Check if an image was uploaded
//     const imagePath = req.file ? req.file.filename : null;

//     const newBlog = new blogModel({
//       title,
//       content,
//       category,
//       author,
//       image: imagePath, 
//     });
//    const result= await blogModel.create(newBlog)

//     // await newBlog.save();

//     res.status(201).json({ message: 'Blog created successfully', blogModel: result });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating blog', error });
//   }
// };

export const createBlog = async (req, res) => {
  try {
    console.log(req.user.userData._id,'requserdaata')   
    const { title, content, category,author } = req.body;
    const userId = req.user.userData._id; // This comes from the decoded JWT token

    const imagePath = req.file ? req.file.filename : null;

    const newBlog = new blogModel({
      title,
      content,
      category,
      user:userId, // Associate the blog with the logged-in user
      author, 
      image: imagePath,
    });

    const result = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// export const getBlogs=async(req,res)=>{
//   try{
//     const blogData=await blogModel.find(req.user.userData._id)
//     res.status(200).json(blogData)
//   }catch(err){
//     res.status(500).json(err)
//   }
// }
export const getBlogs = async (req, res) => {
  try {
    // Fetch blogs where the 'author' matches the logged-in user's ID
    const blogData = await blogModel.find({ user: req.user.userData._id });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err });
  }
};
export const getAllBlogs=async (req,res)=>{
  try{
    const allBlogs=await blogModel.find()
    if(allBlogs.length>0){
      res.status(200).json({data:allBlogs,status:200,message:'All Blogs'})
    }
    else{
      res.status(400).json({message:'No Blogs found',status:400})
    }
  }catch(err){
    res.status(500).json({err:err,status:500})
  }
}
export const deleteBlog=async (req,res)=>{
try{
    let userId=req.params.id
    console.log(userId)
    let userDeleted=await blogModel.findByIdAndDelete({_id:userId})
    res.send(userDeleted)
}catch(err){
res.json(err)
} 
}
export const updateBlog = async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params; // Destructure the _id from req.params
  const { title, content, author, category } = req.body;

  try {
    console.log("update id", id);  // Log the correct _id
    const blog = await blogModel.findByIdAndUpdate(
      { _id: id }, // Match the document by _id
      { title, content, author, category }, // Update fields
      { new: true } // Return the updated document
    );

    if (!blog) return res.status(404).send('Blog not found');

    res.json(blog);  // Respond with the updated blog
  } catch (error) {
    res.status(400).send(error.message);  // Handle errors
  }
};

export  const getSingleBlog=async (req,res)=>{
  try{
    const {id}=req.params;
    const singleBlog=await blogModel.findOne({_id:id})
    res.status(200).json({message:'your blog',data:singleBlog})
  }catch(err){
    res.status(500).json(err)
  }
}