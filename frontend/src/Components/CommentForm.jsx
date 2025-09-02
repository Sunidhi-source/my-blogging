import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ articleid }) {
  
  const initialState = { name: '', email: '', comment: '' };
  const [formData, setFormData] = useState(initialState);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"comments/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      setStatusMessage({ text: 'Please fill in all fields.', type: 'danger' });
      return;
    }
    const submissionData = { ...formData, article: articleid };
    axios.post(url, submissionData)
      .then((response) => {
        setStatusMessage({ text: "Your comment has been posted successfully!", type: 'success' });
        setFormData(initialState);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setStatusMessage({ text: 'Sorry, there was an error posting your comment.', type: 'danger' });
      });
  };


  return (
    //  👇 THIS IS THE LINE TO EDIT 👇
    <div 
      className="card bg-light p-4 border-0 shadow-sm mx-auto" 
      style={{ maxWidth: '720px' }}
    >
      <h5 className="card-title mb-3">Leave a Comment</h5>
      
      <form onSubmit={handleSubmit} noValidate>
        {/* ... The rest of your form code is perfect ... */}

        {statusMessage.text && (
          <div className={`alert alert-${statusMessage.type} alert-dismissible fade show`} role="alert">
            {statusMessage.text}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setStatusMessage({ text: "", type: "" })} 
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="comment" className="form-label fw-semibold">Comment</label>
          <textarea
            id="comment" name="comment" className='form-control'
            placeholder='What are your thoughts?' rows="4"
            value={formData.comment} onChange={handleInputChange} required
          />
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text" id="name" name="name" className="form-control"
              placeholder="Your Name" value={formData.name}
              onChange={handleInputChange} required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email" id="email" name="email" className="form-control"
              placeholder="you@example.com" value={formData.email}
              onChange={handleInputChange} required
            />
          </div>
        </div>

        <div className="d-flex justify-content mt-3">
          <button type="submit" className="btn btn-primary fw-semibold px-4 py-2">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;