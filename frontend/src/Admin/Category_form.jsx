import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Category_form({setInsResponse,insresponse}) {
    const obj={title:'',description:''}
    const [data,setData]=useState(obj)
    const [error,setError]=useState(obj)
    const [message, setMessage] = useState({message:"",color:""});
  
    const iserror=()=>{
      if (data.title == '') {
        setMessage({message:'Please fill title.',color:"text-danger"});
        return true 
      }
    return false    
    }

  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"category" 
    const handleSubmit=(e)=>{
  e.preventDefault()
  if(!iserror()){
    axios.post(url,data).
  then((response)=>{ 
    if(response.data.responseStatus==1){
      setMessage({message:response.data.response, color:"text-success"})
      setInsResponse(!insresponse)
    }
    else
      setMessage({message:response.data.response, color:"text-danger"})  
  })
  .catch((err)=>console.log(err))
  console.log(data)
}}     

return (
    <>
      <div className='border p-3 mt-3'>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="mb-2 px-4">
            <label className="form-label fw-semibold text-dark">Title </label>
            <input
              type="text"
              className="form-control px-3"
              placeholder="title"
              value={data.title}
              onChange={(e) => setData({...data,title:e.target.value})}
              />
          <div className="my-3">
            <label htmlFor="lastNameInput" className="form-label fw-semibold text-dark">Description </label>
            <textarea
              type="text"
              className="form-control px-3"
              style={{height:'150px'}}
              placeholder="Add more details here..."
              value={data.description}
              onChange={(e) => setData({...data,description:e.target.value})}
            />
          </div>
          <p className={message.color}>{message.message}</p>
          </div>
          <div className="d-grid gap-2 mb-3 px-4">
            <button className="btn btn-primary py-2 fw-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>

    </>
  )
}

export default Category_form