import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css'; // Import the CSS file
import { baseUrl } from '../../Urls';

interface BlogFormData {
  title: string;
  content: string;
  category: string;
  author: string;
  image: File | null;
}

const predefinedCategories = ['Technology', 'Health', 'Lifestyle', 'Education', 'Business'];

const CreateBlog: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    category: '',
    author: '',
    image: null,
  });

  const [customCategory, setCustomCategory] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e: any) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'custom') {
      setCustomCategory(true);
      setFormData({ ...formData, category: '' });
    } else {
      setCustomCategory(false);
      setFormData({ ...formData, category: selectedCategory });
    }
  };

  const handleCustomCategoryChange = (e: any) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('author', formData.author);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${baseUrl}/createBlog`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data, 'response');
      setFormData({
        title: '',
        content: '',
        category: '',
        author: '',
        image: null,
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="blog-form-container">
      <h2 className="blog-form-title">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="form-textarea"
            rows={8}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={customCategory ? 'custom' : formData.category}
            onChange={handleCategoryChange}
            className="form-select"
            required
          >
            <option value="">-- Select Category --</option>
            {predefinedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="custom">Other</option>
          </select>
        </div>

        {customCategory && (
          <div className="custom-category-input">
            <label htmlFor="customCategory">Custom Category:</label>
            <input
              type="text"
              id="customCategory"
              name="customCategory"
              value={formData.category}
              onChange={handleCustomCategoryChange}
              className="form-input"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} className="form-file-input" />
        </div>

        <button type="submit" className="form-submit-btn">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
