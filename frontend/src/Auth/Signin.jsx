import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import { useNavigate } from "react-router";
import { useAuth } from '../Context/AuthContext';
import { useAdmin } from '../Context/AdminContext';

function Signin() {
    let navigate = useNavigate();
    const {isLoggedin, setisLoggedin}=useAuth()
    const {isaLoggedin, setisaLoggedin}=useAdmin()

  const obj={email:'',password:''}
    const [data,setData]=useState(obj)
    const [error,setError]=useState(obj)
    const [message, setMessage] = useState({message:"",color:""});
  
    const iserror=()=>{
      if ( data.email == '' || data.password =='') {
        setMessage({message:'Please fill in all required fields (Email, Password).',color:"text-danger"});
        return true 
      }  
    return false    
    }

  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"user/login"

  const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post(url,data).
  then((response)=>{
    if(response.data.responseStatus==1){
      setMessage({message:response.data.response, color:"text-success"})
      if(response.data.user.user_type=='user'){
      localStorage.setItem('user_id',response.data.user._id)
      setisLoggedin(true)
      }else if(response.data.user.user_type=='admin'){
      localStorage.setItem('admin_id',response.data.user._id)
       setisaLoggedin(true) 
      }

      setTimeout(()=>{navigate("/");},2000)

    
    }
    else
      setMessage({message:response.data.response, color:"text-danger"})  
  })
  .catch((err)=>console.log(err))
  console.log(data)
  }
 
  return (
    <>
          <form onSubmit={handleSubmit} >
          <div className="mb-3 p-3">
            <label htmlFor="emailInput" className="form-label fw-semibold text-dark">Email address</label>
            <input
              type="email"
              className="form-control px-3"
              placeholder="example@xyz.com"
              value={data.email}
              onChange={(e) => setData({...data,email:e.target.value})}    
            />
          </div>
          <div className="mb-3 px-3">
            <label htmlFor="passwordInput" className="form-label fw-semibold text-dark">Password</label>
            <input
              type="password"
              className="form-control px-3"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({...data,password:e.target.value})}
            />
          </div>
          <p className={message.color+" text-center"}>{message.message}</p>
          
          <div className="d-grid gap-2 m-3">
          <button type="submit" className="btn btn-primary py-2 fw-semibold">
              Sign In
            </button>
          </div>

          <div className="text-center mb-1">
            <Link to="forgot/" className="text-primary text-decoration-none small d-block mb-2">Forgot Password?</Link>
            <p className="text-muted small mb-0">
              Don't have an account? 
              <Link to="signup/" className="text-primary text-decoration-none fw-semibold"> Sign Up</Link>
            </p>
          </div>
        </form>

    </>
  )
}

export default Signin