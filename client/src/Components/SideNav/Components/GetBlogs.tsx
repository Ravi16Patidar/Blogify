import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Urls';
import '../../AllBlogs/AllBlogs.css';
import { useNavigate } from 'react-router-dom';

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]); // Ensure it's initialized as an array

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/getBlogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response?.data)
        setBlogs(response?.data || []); // Ensure blogs is an array
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleViewMoreButton = (id: string) => {
    navigate(`/userSingleBlog/${id}`);
  };

  return (
    <>
      <h2 className="blog-list-title">My Blog List</h2>
      <div className="blog-list">
        {blogs.length > 0 ? ( // Check if blogs has content
          blogs.map((blog: any) => (
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
                <hr className="horizontalLine" />
                <div className="view-more-container">
                  <button
                    className="view-more-button"
                    onClick={() => handleViewMoreButton(blog._id)}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p> // Display message if no blogs are found
        )}
      </div>
    </>
  );
};

export default BlogList;
