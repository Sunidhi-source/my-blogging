import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-5 mt-5">
      <div className="container">
        <h4 className="fw-bold mb-4" style={{ color: '#0d6efd' }}>
          Ink & Imagination
        </h4>
        <div className="mb-3">
          {/* Add links to your social media profiles */}
          <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-4"><i className="bi bi-twitter"></i></Link>
          <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-4"><i className="bi bi-instagram"></i></Link>
          <Link to="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="bi bi-linkedin"></i></Link>
        </div>
        <p className="mb-0 small">&copy; {new Date().getFullYear()} Ink & Imagination. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
