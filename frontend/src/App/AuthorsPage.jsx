import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router'; // To link to individual author pages

function AuthorsPage() {
  // State to hold the list of authors, loading status, and any errors
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"user" 
   
    axios.get(url)
      .then(res => {
        // Based on your backend code, the data is in res.data.response
        if (res.data && res.data.response) {
          setAuthors(res.data.response);
        } else {
          setError('Received an unexpected data format.');
        }
      })
      .catch(err => {
        console.error("Error fetching authors:", err);
        setError('Could not load authors. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // The empty array [] ensures this effect runs only once

  // Show a loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show an error message if the API call fails
  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Meet Our Authors</h1>
        <p className="lead text-muted">The creative minds behind the words.</p>
      </div>

      {/* Authors Grid */}
      <div className="row g-4">
        {authors.map(author => (
          <div className="col-md-6 col-lg-4 col-xl-3" key={author._id}>
            <div className="card h-100 text-center border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center p-4">
                {/* Dynamically generated avatar from author's name */}
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=0D6EFD&color=fff&size=100`}
                  alt={`${author.name}'s avatar`}
                  className="rounded-circle mb-3"
                />
                <h5 className="card-title fw-bold">{author.name}</h5>
                <p className="card-text text-muted flex-grow-1">{author.bio || 'A passionate writer and storyteller.'}</p> 
                 
                {/* Link to view all articles by this author */}
                <Link to={`/authorarticles/${author._id}`} className="btn btn-outline-primary btn-sm mt-auto">
                  View Articles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsPage;
