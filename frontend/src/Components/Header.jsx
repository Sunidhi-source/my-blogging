import React from 'react'
import { Link,useNavigate } from 'react-router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useAdmin } from '../Context/AdminContext';

function Header() {
    const navigate=useNavigate()
    const {isLoggedin, setisLoggedin}=useAuth()

    const handleLogout=()=>{
      localStorage.removeItem('user_id')
      setisLoggedin(false)
      navigate('/')
    }
    const {isaLoggedin, setisaLoggedin}=useAdmin()

    const handleaLogout=()=>{
      localStorage.removeItem('admin_id')
      setisaLoggedin(false)
      navigate('/')
    }

    const blogName = "Ink & Imagination";
    
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"category" 
  let aurl=API_URL+"article"
    const [data,setData]=useState([])

  useEffect(()=>{ 
    axios.get(url)
    .then((res)=>{setData(res.data)}) 
    .catch((err)=>console.log(err))
  },[])

  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container-fluid mx-auto" style={{ maxWidth: '1000px' }}>

        <Link className="navbar-brand fw-bold fs-2 text-dark" to="/">
          <span className="text-primary">{blogName}</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-semibold text-dark"
                href="/"
                id="navbarDropdownCategories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Categories</a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownCategories">
             {
                data.map((rec,index)=>{
                  return (
                  <li key={index}>  
                  <Link to={"blog/"+rec._id} className='dropdown-item'>{rec.title}</Link>
                  </li>
                  )
                })
              }                          
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/blog/all">View All</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="about/">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="contact/">Contact</Link>
            </li>
      {/* isaLoggedin ?
    <>
     
            </>:
            <> */}
    { isLoggedin ?
              <>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" to="user/">
                My Account
              </Link>
            </li>
              <li className="nav-item ms-lg-3">
              <a className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" onClick={handleLogout}>
                Logout
              </a>
            </li>   
            </> : 
            isaLoggedin ? <>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" to="admin/">
                Dashboard
              </Link>
            </li>
              <li className="nav-item ms-lg-3">
              <a className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" onClick={handleaLogout}>
                Logout
              </a>
            </li>  
            </>
            :
            <>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" to="auth/">
                SignIn
              </Link>
            </li>
              <li className="nav-item ms-lg-3">
              <Link className="btn btn-primary rounded-pill px-4 py-2 fw-semibold" to="auth/signup">
                SignUp
              </Link>
            </li>   
            </> 
}


          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Header