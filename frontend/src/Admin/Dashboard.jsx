import React, { useState, useEffect } from 'react';
import axios from 'axios';

// A small component for the stat cards to keep the main component clean
const StatCard = ({ title, value, iconClass }) => (
  <div className="col-md-6 col-xl-3 mb-4">
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body text-center p-4">
        <i className={`bi ${iconClass} fs-1 text-primary mb-3 d-block`}></i>
        <h3 className="card-title fw-bold mb-2">{value}</h3>
        <p className="card-text text-muted">{title}</p>
      </div>
    </div>
  </div>
);

function Dashboard() {
  // State for the stats, loading, and errors
  const [stats, setStats] = useState({
    MonthUsers: 0,
    AllUsers: 0,
    MonthArticles: 0,
    AllArticles: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make sure this URL matches your backend stats route
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"stats" 
  
    axios.get(url)
      .then(res => {
        // The backend sends the data directly as an object
        if (res.data) {
          setStats(res.data);
        } else {
          setError('Received an unexpected data format.');
        }
      })
      .catch(err => {
        console.error("Error fetching stats:", err);
        setError('Could not load dashboard stats. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty array ensures this runs only once

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
        <h1 className="display-4 fw-bold">Admin Dashboard</h1>
        <p className="lead text-muted">A quick overview of your blog's activity.</p>
      </div>

      <div className="row">
        <StatCard title="Total Articles" value={stats.AllArticles} iconClass="bi-file-earmark-text-fill" />
        <StatCard title="Total Users" value={stats.AllUsers} iconClass="bi-people-fill" />
        <StatCard title="New Articles This Month" value={stats.MonthArticles} iconClass="bi-calendar-plus-fill" />
        <StatCard title="New Users This Month" value={stats.MonthUsers} iconClass="bi-person-plus-fill" />
      </div>
    </div>
  );
}

export default Dashboard;
