import React from 'react'
import { Link, Outlet } from 'react-router'

function Auth_layout() {
  return (
    <>
      <div className="row justify-content-center pt-5">
        <div className="col-md-5 border p-5 shadow bg-white rounded">
         <h1 className='text-center'> <Link className="fw-bold fs-2 text-primary" to="/">
          Ink & Imagination 
          </Link> </h1>
          <hr />
          <div className='border'>
            <Link to="/auth" className='btn btn-light rounded-0 w-50 btn-lg'> 
            <i className="bi bi-box-arrow-in-right"></i> Sign In</Link>
            <Link to="signup/" className='btn btn-white rounded-0 w-50 btn-lg'> 
            <i className='bi bi-person-add'></i> Sign Up</Link>
         <Outlet/>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth_layout