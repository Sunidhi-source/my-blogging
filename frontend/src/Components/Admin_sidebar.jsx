import React from 'react'
import { Link,useNavigate } from 'react-router'
import {useAdmin} from '../Context/AdminContext'

function Admin_sidebar() {

  const navigate=useNavigate()
    const {isaLoggedin, setisaLoggedin}=useAdmin()

    const handleaLogout=()=>{
      localStorage.removeItem('admin_id')
      setisaLoggedin(false)
      navigate('/')
    }

  return (
    <>
<nav className="navbar bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        <Link className="navbar-brand fw-bold fs-2 text-primary mx-5" to="/">Ink & Imagination </Link>

    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Admin</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
          
          <li className="nav-item">
            <Link className="nav-link" to=''>My Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='articles/'>Articles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='categories/'>Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='user/'>User</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleaLogout}>LogOut</a>
          </li>
          </ul>
        
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Admin_sidebar