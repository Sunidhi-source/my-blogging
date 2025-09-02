import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

function Reset() {
  let navigate = useNavigate();
  
  const obj={password:'',confirmpassword:'',code:''}
      const [data,setData]=useState(obj)
      const [code,setCode]=useState("")
      const [uid,setUId]=useState("")
      const [message, setMessage] = useState({message:"",color:""});
    
      const iserror=()=>{
          if ( data.code != code) {
          setMessage({message:"Code doesn't match",color:"text-danger"});
          return true 
        }  

        else if ( data.password == '' || data.confirmpassword =='') {
          setMessage({message:'Please fill in all required fields.',color:"text-danger"});
          return true 
        }  
        else if(data.password != data.confirmpassword){
          setMessage({message:'Passwords do not match.',color:'text-danger'})
          return true
        }
      return false    
      }
      
    useEffect(()=>{
      let u=localStorage.getItem('r_user_id');
      let c=localStorage.getItem('code');
      setCode(c)
      setUId(u)
    },[])
      
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"user/reset/" 
  
const handleSubmit=(e)=>{
e.preventDefault()
if(!iserror()){
axios.put(url+uid,{password:data.password})
.then((response)=>{
console.log(response)
if(response.data.responseStatus==1){
      localStorage.removeItem('r_user_id')
      localStorage.removeItem('code')
      setMessage({message:response.data.response, color:"text-success"})
      setTimeout(()=>{navigate("/auth");},2000)
}
else
setMessage({message:response.data.response, color:"text-danger"})  
})
.catch((err)=>console.log(err))
}
}

  
  return (
    <>
<form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-3 px-4">
            <label className="form-label fw-semibold text-dark">Code </label>
            <input
              type="text"
              className="form-control px-3"
              maxLength={4}
              placeholder="Code"
              value={data.code}
              onChange={(e)=>setData({...data,code:e.target.value})}
            />
          </div>
          <div className="mb-3 px-4">
            <label className="form-label fw-semibold text-dark">Password </label>
            <input
              type="password"
              className="form-control px-3"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e)=>setData({...data,password:e.target.value})}
            />
          </div>
          <div className="mb-4 px-4">
            <label className="form-label fw-semibold text-dark">Confirm Password </label>
            <input
              type="password"
              className="form-control px-3"
              placeholder="Confirm your password"
              value={data.confirmpassword}
              onChange={(e)=>setData({...data,confirmpassword:e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mb-3 px-4">
            <p className={message.color}>{message.message}</p>
            <button type="submit" className="btn btn-primary py-2 fw-semibold">
              Reset Password
            </button>
          </div>
          </form>
  </>

  )
}

export default Reset