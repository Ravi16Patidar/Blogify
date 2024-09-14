import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../SideNav/Components/GetBlogs.css"; // Import the CSS file
import { baseUrl } from '../Urls';
import { useParams } from 'react-router-dom';

// Define the Blog type
interface Blog {
  _id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  publishDate: string;
  image?: string;
}

const BlogList: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null); // For a single blog

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/getSingleBlog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        setBlog(response?.data?.data); // Set the single blog object
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]); // Make sure to include id as a dependency

  return (
    <div className="blog-list-container">
      {/* Blog Details */}
      {blog ? (
        <div className="blog-item">
          <div className="blog-content">
            {blog.image && (
              <div className="blog-image-container">
                <img className="blog-image" src={`${baseUrl}/uploads/${blog.image}`} alt={blog.title} />
              </div>
            )}
            <h3 className="blog-title">Title: {blog.title}</h3>
            <p className="blog-category">Category: {blog.category}</p>
            <p className="blog-author">Author: {blog.author}</p>
            <p className="blog-date">
              Published on: {new Date(blog.publishDate).toLocaleDateString()}
            </p>
            <p className="blog-description">Description: {blog.content}</p>
          </div>
        </div>
      ) : (
        <p>No blog found.</p>
      )}
    </div>
  );
};

export default BlogList;
