import React from 'react';

function Contact() {
  return (
    <div className="bg-light py-5">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            <h1 className="display-4 fw-bold" style={{ color: '#0d6efd' }}>
              Contact Ink & Imagination
            </h1>
            <p className="lead text-muted">
              Connecting with you, one story at a time.
            </p>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Content Card - Mimicking the style of the 'About' section card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h4 className="card-title fw-bold mb-4">Our Contact Details</h4>
                
                <div className="mb-4">
                  <h6 className="fw-bold">Our Office</h6>
                  <p className="text-muted mb-0">
                    123 Imagination Lane, Storyville, IN 45678
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold">Email Us</h6>
                  <p className="text-muted mb-0">
                    For inquiries, collaborations, or feedback, please email us at:
                    <br />
                    <a href="mailto:hello@inkandimagination.com" className="text-primary">
                      hello@inkandimagination.com
                    </a>
                  </p>
                </div>

                <div>
                  <h6 className="fw-bold">Call Us</h6>
                  <p className="text-muted mb-0">
                    You can reach us by phone during business hours at (123) 456-7890.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
