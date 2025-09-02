import React, { useEffect,useState } from 'react'
import Category from './Category_form.jsx'
import axios from 'axios'

function Categories() {
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"category" 
  const [data,setData]=useState([])
  const [message, setMessage] = useState({message:"",color:""});
  const [insresponse, setInsResponse] = useState(false);
  
  useEffect(()=>{ 
    axios.get(url)
    .then((res)=>{setData(res.data)}) 
    .catch((err)=>console.log(err))
  },[message,insresponse])
  
    const handleDelete=(id)=>{
    axios.delete(url+"/"+id)
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
        <div className="col-md-5">
          <h4>New Category</h4>
          <hr /> 
          <Category setInsResponse={setInsResponse} insresponse={insresponse}/>
        </div>
        <div className="col-md-5">
            <h4>Categories</h4>
            <hr />
            <table className='table'>
              <thead><tr><th>Category</th><th>Delete</th></tr></thead>
              <tbody>
              {
                data.map((rec,index)=>{
                  return (
                  <tr key={index}><td>{rec.title} <br /> {rec.description}</td> 
                  <td><button className='btn btn-danger' 
                  onClick={()=>handleDelete(rec._id)}>
                  <i className='bi bi-trash'></i></button></td>
                  
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

export default Categories