import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"category" 
  
    axios.get(url)
      .then(res => {
        if (res.data) {
          setCategories(res.data);
        } else {
          setError('Received an unexpected data format.');
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setError('Could not load categories. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); 

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Explore Our Categories</h1>
        <p className="lead text-muted">Find the stories and insights that matter most to you.</p>
      </div>

      <div className="row g-4">
        {categories.map(category => (
          <div className="col-md-6 col-lg-4" key={category._id}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4 d-flex flex-column">
                <h4 className="card-title fw-bold text-primary">{category.title}</h4>
                <p className="card-text text-muted flex-grow-1">
                  {category.description || 'Discover articles and stories from this category.'}
                </p>
                <Link to={"/blog/"+category._id} className="btn btn-outline-primary mt-auto">
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

export default CategoryPage;
