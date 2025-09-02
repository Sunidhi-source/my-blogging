import React from 'react'
import Image1 from './../assets/girl.jpg'

function About() {
  const blogName = "Ink & Imagination";
  const yourName = "Sunidhi Sharma";

  return (
    <>
    <div className="container-fluid py-4 py-sm-5 py-lg-5 bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg rounded-3 p-4 p-sm-5 p-lg-5 mx-auto" style={{ maxWidth: '1000px', width: '100%' }}>

        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3 rounded">
            About <span className="text-primary">{blogName}</span>
          </h1>
          <p className="lead text-muted">
            Connecting with you, one story at a time.
          </p>
        </header>

        <section className="bg-purple-subtle p-4 rounded-3 shadow-sm border border-purple mb-4">
          <h2 className="h4 fw-bold text-purple-emphasis mb-3">
            The Community Builder
          </h2>
          <p className="text-body-secondary lh-base mb-3">
            "Hello and welcome to <span className="fw-semibold">{blogName}</span>! This isn't just a blog; it's a vibrant community where <span className="fst-italic">['fellow adventurers,' 'aspiring entrepreneurs,' 'creative minds']</span> come together to share, learn, and grow. My name is <span className="fw-semibold">{yourName}</span>, and I started this space because I believe in the power of <span className="text-purple">['shared experiences,' 'collective knowledge,' 'supportive networks']</span>. Here, you'll find <span className="text-purple">['thought-provoking discussions,' 'collaborative projects,' 'guest features']</span> that encourage dialogue and connection. Let's build something amazing together!"
          </p>
          <p className="small text-muted fst-italic">
            (If fostering a community is a core aspect of your blog, this option highlights interaction and shared experiences.)
          </p>
        </section>
        <section className="bg-light-subtle p-4 rounded-3 shadow-sm border border-secondary">
        <img src={Image1} alt="" className='w-100' />
        </section>

      </div> 
    </div>
    </>
  )
}

export default About