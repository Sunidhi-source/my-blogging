import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'


function Profile() {
    const API_URL=import.meta.env.VITE_API_URL;
    let url =API_URL+"user"
    const obj={firstname:'',lastname:'',contactnum:'',dob:'',city:'',about:''}
    const [data,setData]=useState(obj)
    const [error,setError]=useState(obj)
    const [uid,setUid]=useState("")
    const [message, setMessage] = useState({message:"",color:""});
  
    const iserror=()=>{
      if (data.firstname == '' || data.lastname == '' || data.contactnum == '' || data.city =='') {
      setMessage({message:'Please fill in all required fields.',color:"text-danger"});
      return true 
    }
    return false    
    }


    useEffect(()=>{
        let u=localStorage.getItem('user_id');
        if (u){
        setUid(u)
        axios.get(url+'/'+u)
        .then((res)=>{console.log(res.data.response); setData(res.data.response)}) 
        .catch((err)=>console.log(err))
          }

        },[])
    
  const handleSubmit=(e)=>{
  e.preventDefault()
  if(!iserror()){
    axios.put(url+"/"+uid,data)
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
  
  }
  return (
    <>
      <div className='border p-3 mt-3'>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="row">
            <div className="col mb-3 px-4">
            <label className="form-label fw-semibold text-dark">First Name </label>
            <input
              type="text"
              className="form-control px-3"
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
              placeholder="Last Name"
              value={data.lastname}
              onChange={(e) => setData({...data,lastname:e.target.value})}
            />
            </div>
          
          </div>
          <div className="row mb-3 px-4">
            <div className="col">
            <label  className="form-label fw-semibold text-dark">contactnum
              </label>
            <input
              type="text"
              className="form-control px-3"
              placeholder="0123654789"
              value={data.contactnum }
              onChange={(e) => setData({...data,contactnum:e.target.value})}
            />
            </div>
            <div className="col">
            <label  className="form-label fw-semibold text-dark">DOB 
            </label>
            <input
              type="date"
              className="form-control px-3"
               value={data.dob }
              onChange={(e) => setData({...data,dob:e.target.value})}
            />
          </div>
          <div className="col mb-4 px-4">
            <label  className="form-label fw-semibold text-dark">City </label>
            <input
              type="text"
              className="form-control   px-3"
              placeholder="Enter city"
              value={data.city}
              onChange={(e) => setData({...data,city:e.target.value})}
            />
            </div>
            <div className="mb-4 px-3">
            <label  className="fw-semibold text-dark">About </label>
            <textarea
              className="form-control px-3"
              placeholder="Write something about you here..."
              style={{height: '80px'}}
              value={data.about}
              onChange={(e) => setData({...data,about:e.target.value})}
            />
          </div>
          <p className={message.color}>{message.message}</p>
          </div>
          <div className="d-grid mb-3 px-4">
            <button type="submit" className="btn btn-primary py-2 fw-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>

    </>
  )
}


export default Profile