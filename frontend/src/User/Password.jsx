import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Password() {
  const obj={oldpassword:'',password:'',confirmPassword:''}
      const [data,setData]=useState(obj)
      const [error,setError]=useState(obj)
      const [uid,setUid]=useState('')
      const [message, setMessage] = useState({message:"",color:""});
    
      const iserror=()=>{
        if (data.oldpassword == '' || data.password == '' || data.confirmPassword=='') {
        setMessage({message:'Enter Password.',color:"text-danger"});
        return true
        }
        else if (data.password!= data.confirmPassword){
          setMessage({message:'Passwords do not match.',color:'text-danger'})
          return true
        }
      
      return false    
      }

      const API_URL=import.meta.env.VITE_API_URL;
    let url =API_URL+"user/"
      useEffect(()=>{
        let u=localStorage.getItem('user_id');
        if (u){
        setUid(u)
        }  },[])
      
      
    const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(url+"password/"+uid, data)
    .then((response)=>{
    console.log(response)
    if(response.data.responseStatus==1){
        setMessage({message:response.data.response, color:"text-success"})
    }
    else
          setMessage({message:response.data.response, color:"text-danger"})  
    })
    .catch((err)=>console.log(err))
    }  


    return (
      <>
        <div className='border p-3 mt-3'>
          <form action="" onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-3 px-4">
              <label className="form-label fw-semibold text-dark">Old Password</label>
              <input
                type="password"
                className="form-control px-3"
                placeholder="Old password"
                value={data.oldpassword}
                onChange={(e) => setData({...data,oldpassword:e.target.value})} />
              </div>
            <div className="mb-3 px-4">
              <label htmlFor="lastNameInput" className="form-label fw-semibold text-dark">Enter New Password </label>
              <input
                type="password"
                className="form-control   px-3"
                placeholder="New password"
                value={data.password}
                onChange={(e) => setData({...data,password:e.target.value})} />
              </div>
            <div className="mb-3 px-4">
              <label htmlFor="lastNameInput" className="form-label fw-semibold text-dark">Confirm your Password </label>
              <input
                type="password"
                className="form-control   px-3"
                placeholder="Confirm password"
                value={data.confirmPassword}
                onChange={(e) => setData({...data,confirmPassword:e.target.value})} />
              </div>
            
            <p className={message.color}>{message.message}</p>
            <div className="d-grid mb-3 px-4">
              <button type="submit" className="btn btn-primary py-2 fw-semibold">
                Change
              </button>
            </div>
          </form>
        </div>
        
      </>
    )
  
}

export default Password