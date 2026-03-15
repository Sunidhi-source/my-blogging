import React from 'react';
import './Home.css';
import { Link } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../Components/Card'


function Home(){
const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL
      const api=url+"article/latest" 
    console.log(api)
    
    const [data,setData]=useState([])

    useEffect(()=>{ 
    axios.get(api)
    .then((res)=>{setData(res.data.response);
    }) 
    .catch((err)=>console.log(err))
    },[])

  return (
    <>
      <main>
        
        <section
          className="creative-hero-section d-flex align-items-center text-center py-5"
          role="region"
          aria-label="Welcome to Ink & Imagination"
        >
          <div className="container">
            <div className="hero-content mx-auto" >
              <h1 className="text-white display-3 fw-bold mb-4">
                Ink & Imagination
              </h1>
              <p className="mb-4 fs-5">
                Where every word paints a picture, and every story sparks a thought.
              </p>
              <a
                href="#featured-articles"
                className="btn btn-primary btn-lg "
              > 
                Start Reading
              </a>
            </div>
          </div>
        </section>

        <section className="key-highlights-section py-5 bg-light" >
          <div className="container">
            <h2 className="text-center mb-5 display-5 fw-bold">Dive Deeper</h2>
            <div className="row justify-content-center">
              {/* Trending Topics */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-fire text-primary mb-3 d-block"></i>
                    <h5 className="card-title fw-bold">Trending Topics</h5>
                    <p className="card-text text-muted">Explore what's currently captivating our readers.</p>
                    <Link to="/blog/all" className="btn btn-outline-dark btn-sm mt-3">Discover Now</Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-book text-success mb-3 d-block"></i>
                    <h5 className="card-title fw-bold">Browse All Categories</h5>
                    <p className="card-text text-muted">Find articles tailored to your specific interests.</p>
                    <Link to="/categories" className="btn btn-outline-dark btn-sm mt-3">Explore Categories</Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-pencil-square text-info mb-3 d-block"></i>
                    <h5 className="card-title fw-bold">Meet Our Authors</h5>
                    <p className="card-text text-muted">Learn more about the creative minds behind the words.</p>
                    <Link to="/authors" className="btn btn-outline-dark btn-sm mt-3">Get Inspired</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured-articles" className="articles-preview-section pt-5" role="region" aria-label="Latest Articles">
          <div className="container">
            <h2 className="text-center mb-5 display-5 fw-bold">Our Latest Creations</h2>
            <div className="row justify-content-center">
          {
            data.map((rec,index)=>{
              return (
                  <Card rec={rec} key={index}/>
              )
            })
          }              
 
            </div>
            <div className="container text-center py-3">
        <Link to="/blog/all" className="btn btn-primary btn-lg shadow-sm cta-button">
          View All Articles
        </Link>
      </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;