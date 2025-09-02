import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '../Components/Editor';
import { useParams } from 'react-router';

function UpdateArticle() {
  const { id } = useParams();
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // For the new image file
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // To display the existing image

  // State for categories list and messages
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMAGE_SRC;
  const categoryUrl = `${API_URL}category`;
  const articleUrl = `${API_URL}article`;

  // Fetch existing article data and categories on component mount
  useEffect(() => {
    // Fetch categories
    axios.get(categoryUrl)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

    // Fetch the specific article to edit
    axios.get(`${articleUrl}/${id}`)
      .then((res) => {
        const articleData = res.data.response;
        setTitle(articleData.title);
        setCategory(articleData.category._id); // Set the category ID for the dropdown
        setContent(articleData.content);
        setCurrentImageUrl(articleData.image); // Set the URL for the current image
      })
      .catch((err) => console.log(err));
  }, [id]); // Re-run if the ID changes

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData because we are sending a file
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    
    // Only append the image if a new one has been selected
    if (image) {
      formData.append('image', image);
    }

    axios.put(`${articleUrl}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      if (response.data.responseStatus === 1) {
        setMessage({ text: response.data.response, type: "success" });
      } else {
        setMessage({ text: response.data.response, type: "danger" });
      }
    }).catch((err) => {
      console.log(err);
      setMessage({ text: "An error occurred while updating.", type: "danger" });
    });
  };

  return (
    <div className="container border p-4 mt-3 rounded shadow-sm">
      <h4>Update Article</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className='form-control'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Update Image (Optional)</label>
            <input
              type="file"
              className="form-control"
              accept='.jpg,.png,.jpeg'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* --- FIX: Display the current image --- */}
        {currentImageUrl && (
          <div className="mb-3">
            <p className="fw-semibold small text-muted">Current Image:</p>
            <img 
              src={`${IMG_URL}${currentImageUrl}`} 
              alt="Current article visual" 
              style={{ maxWidth: '200px', borderRadius: '0.5rem' }} 
            />
          </div>
        )}

        <div className="mb-3">
          <label className="fw-semibold">Content</label>
          {/* --- FIX: Add a 'key' prop to force re-initialization of the editor --- */}
          {content && <Editor setContent={setContent} text={content} key={id} />}
        </div>
        
        <button type="submit" className="btn btn-primary py-2 fw-semibold">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateArticle;
