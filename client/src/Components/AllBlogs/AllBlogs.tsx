
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../SideNav/Components/GetBlogs.css'; // Import the CSS file
import { baseUrl } from '../Urls' ;
import './AllBlogs.css'
import { useNavigate } from 'react-router-dom';

const BlogList: React.FC = () => {
  const navigate=useNavigate()
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getAllBlogs`);
        setBlogs(response?.data?.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []); 
  const handleViewMorebutton=(id:string)=>{
    navigate(`/singleBlog/${id}`)
  }
  return (
    // <div className="blog-list-container">
    <>
      <h2 className="blog-list-title">All Blog List</h2>
      <div className="blog-list">
        {blogs.map((blog: any) => (
          <div key={blog._id} className="blogMainContainer">
            <div className="blog-image-container">
              <img
                className="blog-image"
                src={`${baseUrl}/uploads/${blog.image}`}
                alt={blog.title}
              />
            </div>
            <div className="blog-info">
              <h3 className="blog-title">Title: {blog.title}</h3>
              <p className="blog-author">Author: {blog.author}</p>
              <p className="blog-category">Category: {blog.category}</p>
              <p className="blog-date">
                Published on: {new Date(blog.publishDate).toLocaleDateString()}
              </p>
              <hr className='horizontalLine' />
              <div className="view-more-container">
                <button className="view-more-button" onClick={()=>handleViewMorebutton(blog._id)}>View More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    {/* // </div> */}
    </>
  );
};

export default BlogList;
