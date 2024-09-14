import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogs, getSingleBlog, updateBlog } from '../controllers/BlogController.js';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../middleware/auth.js';
const router=express.Router();

router.post('/createBlog',authenticateToken,upload,createBlog)
router.get('/getBlogs',authenticateToken,upload,getBlogs)
router.get('/getAllBlogs',upload,getAllBlogs)
router.delete('/deleteBlog/:id',deleteBlog)
router.put('/updateBlog/:id',updateBlog)
router.get('/getSingleBlog/:id',upload,getSingleBlog)
export default router;