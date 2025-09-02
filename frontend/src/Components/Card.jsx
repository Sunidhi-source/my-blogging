import React from 'react';
import { Link } from 'react-router';
import './../App/Home.css'

function Card({ rec }) {
  // Helper function to safely strip HTML tags from the content
  const stripTags = (htmlString) => {
    if (!htmlString) return '';
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  };
  const content = stripTags(rec.content);

  const imgurl = import.meta.env.VITE_IMAGE_SRC;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 card-hover">
        
        <div className="card-img-container">
          <img src={imgurl + rec.image} className="card-img-top" alt={rec.title} />
          
        </div>
        <div className="card-body p-4 d-flex flex-column">
          <div>

            <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
              {rec.category?.title || 'General'}
            </span>
            <p className="card-text text-muted small">{rec.date ? rec.date.slice(0, 10) : ''}</p>
          </div>
          
          <Link to={"/post/" + rec._id} className="text-decoration-none text-dark">
            <h5 className="card-title fw-bold mb-3">{rec.title}</h5>
          </Link>
          
          <p className="card-text text-muted flex-grow-1">
            {content.slice(0, 120)}...
          </p>
          
          <div className="mt-auto pt-3 border-top text-start">
            <Link to={"/post/" + rec._id} className="btn btn-sm btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
