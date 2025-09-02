import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

function Articles() {
    const API_URL=import.meta.env.VITE_API_URL;
    let url =API_URL+"article" 
const [data,setData]=useState([])
const [message, setMessage] = useState({message:"",color:""});
const [uid,setUid]=useState('')


useEffect(()=>{ 
let u=localStorage.getItem('user_id');
if (u)
setUid(u);
axios.get(url+"/author/"+u)
.then((res)=>{setData(res.data.response)}) 
.catch((err)=>console.log(err))
},[message])
 
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

const handlePublish=(id,s)=>{
    axios.patch(url+"/publish/"+id,{status:s})
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
    <div className="col-md-8">
        <h4>Articles</h4>
        <hr />
        <table className='table'>
          <thead><tr><th>Title</th><th>Publish/Unpublish</th><th className='px-5'>Edit</th><th>Delete</th></tr></thead>
          <tbody>
          {
            data.map((rec,index)=>{
              return ( 
              <tr key={index}><td>{rec.title}</td> 
              <td className='px-5'>
              {rec.publish ?  (<button className='btn btn-success'  onClick={()=>handlePublish(rec._id,false)}>
              <i className='bi bi-send'></i>  </button>)
              : <button className='btn btn-danger' onClick={()=>handlePublish(rec._id,true)}>
              <i className='bi bi-send-slash'></i>  </button>}
              </td>
              <td className='px-5'>
                <Link className='btn btn-primary'
                 to={'/user/edit/'+rec._id}><i className="bi bi-pencil-square">
                  </i></Link>
              </td>
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

export default Articles