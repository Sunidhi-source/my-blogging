import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios'
import { useNavigate } from 'react-router';

function Signup() {
    let navigate = useNavigate();

  const obj={firstname:'',lastname:'',email:'',password:'',confirmPassword:''}
  const [data,setData]=useState(obj)
  const [error,setError]=useState(obj)
  const [message, setMessage] = useState({message:"",color:""});

  const iserror=()=>{
    if (data.firstname == '' || data.lastname == '' || data.email == '' || data.password =='' || data.confirmPassword =='') {
      setMessage({message:'Please fill in all required fields (First Name, Last Name, Email, Password, Confirm Password).',color:"text-danger"});
      return true 
    }
    else if (data.password != data.confirmPassword) {
      setMessage({message:'Passwords do not match.',color:"text-danger"});
        return true 
    }
  return false    
  }

  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"user" 
const handleSubmit=(e)=>{
e.preventDefault()
if(!iserror()){
  axios.post(url,data).
  then((response)=>{ 
    if(response.data.responseStatus==1){
      setMessage({message:response.data.response, color:"text-success"})
      setTimeout(()=>{navigate("/auth");},2000)

    }
    else
      setMessage({message:response.data.response, color:"text-danger"})  
  })
  .catch((err)=>console.log(err))
  console.log(data)

}

}     

  return (
    <>
    
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="row mb-2 px-4">
            <div className="col">
            <label className="form-label fw-semibold text-dark">First Name </label>
            <input
              type="text"
              className="form-control px-3"
              id="firstnameInput"
              placeholder="First Name"
              value={data.firstname}
              onChange={(e) => setData({...data,firstname:e.target.value})}
              
            />
          </div>
          <div className="col mb-3 px-4">
            <label htmlFor="lastnameInput" className="form-label fw-semibold text-dark">Last Name </label>
            <input
              type="text"
              className="form-control   px-3"
              id="lastnameInput"
              placeholder="Last Name"
              value={data.lastname}
              onChange={(e) => setData({...data,lastname:e.target.value})}
            />
          </div>
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="emailInput" className="form-label fw-semibold text-dark">Email address 
              </label>
            <input
              type="email"
              className="form-control   px-3"
              id="emailInput"
              placeholder="example@xyz.com"
              value={data.email}
              onChange={(e) => setData({...data,email:e.target.value})}
            />
          </div>
          <div className="row mb-3 px-4">
            <div className="col">
            <label htmlFor="passwordInput" className="form-label fw-semibold text-dark">Password 
            </label>
            <input
              type="password"
              className="form-control px-3"
              id="passwordInput"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({...data,password:e.target.value})}
            />
          </div>
          <div className="col mb-4 px-4">
            <label htmlFor="confirmPasswordInput" className="form-label fw-semibold text-dark">Confirm Password </label>
            <input
              type="password"
              className="form-control   px-3"
              id="confirmPasswordInput"
              placeholder="Confirm your password"
              value={data.confirmPassword}
              onChange={(e) => setData({...data,confirmPassword:e.target.value})}
            />
          </div>
          </div>
          <div className="d-grid gap-2 mb-3 px-4">
            <button type="submit" className="btn btn-primary   py-2 fw-semibold">
              Sign Up
            </button>
          </div>
          <p className={message.color+" text-center"}>{message.message}</p>

          <div className="text-center">
            <p className="text-muted small mb-2">
              Already have an account? 
              <Link to="/auth" className="text-primary text-decoration-none fw-semibold">Sign In</Link>
            </p>
          </div>
        </form>

    </>
  )
}

export default Signup