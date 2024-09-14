import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, TextField, Box } from '@mui/material';
import { baseUrl } from '../Urls';
import { useParams, useNavigate } from 'react-router-dom';
import '../SideNav/Components/GetBlogs.css'

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
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null); // State for a single blog
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/getSingleBlog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        const blogData = response.data.data;
        console.log(blogData, 'res');

        // Set the blog data in state
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdateClick = () => {
    if (blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setCategory(blog.category);
      setDescription(blog.content);
      setOpenUpdateModal(true);
    }
  };

  const handleFormSubmit = async () => {
    if (blog) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${baseUrl}/updateBlog/${blog._id}`,
          {
            title,
            author,
            category,
            content: description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );

        // Update the blog in state
        setBlog({
          ...blog,
          title,
          author,
          category,
          content: description,
        });
        setOpenUpdateModal(false);
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (blog) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${baseUrl}/deleteBlog/${blog._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Navigate to a different route or show a message after deletion
        setOpenDeleteModal(false);
        navigate('/homePage'); // Redirect to blogs list page after deletion
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (!blog) {
    return null; // Do not show "Loading" or anything after deletion
  }

  return (
    <div className="blog-list-container">
      {/* Update Modal */}
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          className="modalFormContainer"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            width: '400px',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <h2 id="modal-title">Update Blog</h2>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              style={{ marginRight: '10px' }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenUpdateModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          className="modalContainer"
          style={{
            position: 'absolute',
            height: '150px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#283747',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <p id="delete-modal-description" style={{ color: 'white' }}>
            Are you sure you want to delete this blog?
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDelete}
              style={{ marginRight: '10px' }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Blog Content */}
      <div className="blog-item">
        {blog.image && (
          <div className="blog-image-container">
            <img
              className="blog-image"
              src={`${baseUrl}/uploads/${blog.image}`}
              alt={blog.title}
            />
          </div>
        )}
        <div className="blog-content">
          <h3 className="blog-title">Title: {blog.title}</h3>
          <p className="blog-category">Category: {blog.category}</p>
          <p className="blog-author">Author: {blog.author}</p>
          <p className="blog-date">
            Published on: {new Date(blog.publishDate).toLocaleDateString()}
          </p>
          <p className="blog-description">Description: {blog.content}</p>
        </div>
        
        <div className="blog-actions">
          <button
            className="btn-update"
            onClick={handleUpdateClick}
          >
            <FontAwesomeIcon icon={faEdit} /> Update
          </button>
          <button
            className="btn-delete"
            onClick={handleDeleteClick}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
