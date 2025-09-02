import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

function Articles() {
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"article" 
  const [data,setData]=useState([])
  const [message,setMessage]=useState('')

  useEffect(()=>{ 
  axios.get(url)
  .then((res)=>{setData(res.data.response)}) 
  .catch((err)=>console.log(err))
  },[message]) 


    const handleHide=(id,s)=>{
    axios.patch(url+"/hidden/"+id,{status:s})
    .then((response)=>{
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
    <div className="row justify-content-evenly py-5">
    <div className="col-md-9">
        <h4>Articles</h4>
        <hr />
        <table className='table'>
          <thead><tr><th>Title</th><th>View</th><th>Hide/Show</th></tr></thead>
          <tbody>
          {
            data.map((rec,index)=>{
              return ( 
              <tr key={index}><td>{rec.title}</td> 
              <td>
                <Link to={'/post/'+rec._id} className='btn btn-outline-primary' target='none'>View Article</Link>
              </td>
              <td>
              {rec.hidden ?  (<button className='btn btn-outline-success'  onClick={()=>handleHide(rec._id,false)}>
              <i className='bi bi-eye'></i> Show </button>)
              : <button className='btn btn-outline-danger' onClick={()=>handleHide(rec._id,true)}>
              <i className='bi bi-eye-slash'></i> Hide </button>}
              </td>
              </tr>
              )
            })
          } 
            
          </tbody>
        </table>
    </div>
  </div>

    </>
  )
}

export default Articles