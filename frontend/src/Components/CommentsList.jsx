import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentsList({ articleid }) {
    
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"comments/";
    const [comments, setComments] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        axios.get(url + articleid)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError("Could not load comments.");
            })
            .finally(() => {
                setIsLoading(false);
            });
       }, [articleid]);

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading comments...</span>
                </div>
            </div>
        );
    }
    
    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
    <div className="mt-5">
        <h3 className="mb-4 border-bottom pb-2">
            Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
            <div className="alert alert-secondary">
                No comments yet. Be the first to share your thoughts!
            </div>
        ) : (
              comments.map((comment) => (
              <div className="card mb-3 border-0" key={comment._id}>
              <div className="card-body p-3">
              <div className="d-flex align-items-start">
              <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=0D8ABC&color=fff`}
              alt={`${comment.name}'s avatar`}
              className="rounded-circle me-3" 
              width="45" 
              height="45"
              />
              <div className="w-100">
              <div className="d-flex justify-content-between">
              <h6 className="mb-0 fw-bold text-primary">{comment.name}</h6>
              <small className="text-muted">
              {/* {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : } */}
              {comment.date.slice(0,10)}
              </small>
              </div>
              <p className="mt-2 mb-0">
              {comment.comment}
              </p>
              </div>
              </div>
        </div>
                </div>
            ))
        )}
    </div>
  );
}

export default CommentsList;