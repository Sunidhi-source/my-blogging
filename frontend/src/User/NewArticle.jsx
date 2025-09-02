import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Editor from '../Components/Editor'

function NewArticle() {
    const obj={title:'',image:'',category:''}

    const [data,setData]=useState(obj)
    const [content,setContent]=useState("")
    const [message, setMessage] = useState({message:"",color:""});

    const [uid,setUid]=useState('')
    const API_URL=import.meta.env.VITE_API_URL;
    let curl =API_URL+"category" 

    const [categories,setCategory]=useState([])
  
    const iserror=()=>{
      if (data.title == '' || data.image == '' || data.content == '' || data.category =='') {
      setMessage({message:'Please fill in all required fields.',color:"text-danger"});
      return true 
      }
      else{
      let ext=data.image.name.split('.')[1];
      if(ext!="jpg"&&ext!="png"&&ext!='jpeg'){
      setMessage({message:'Only Images are allowed',color:"text-danger"});
      return true 
      }
    } 
    return false    
    }

    useEffect(()=>{
    let u=localStorage.getItem('user_id');
    if (u)
    setUid(u)
    axios.get(curl)
    .then((res)=>{setCategory(res.data)}) 
    .catch((err)=>console.log(err))

    },[])

    let url =API_URL+"article" 
  const handleSubmit=(e)=>{
  e.preventDefault()
  if(!iserror()){
    console.log(1)
    let fdata=new FormData()
    fdata.append('title',data.title)
    fdata.append('image',data.image)
    fdata.append('content',content)
    fdata.append('category',data.category)
    fdata.append('author',uid)
    console.log(fdata)
    
    axios.post(url,fdata).
  then((response)=>{ 
    if(response.data.responseStatus==1){
      setMessage({message:response.data.response, color:"text-success"})
    }
    else
      setMessage({message:response.data.response, color:"text-danger"})  
  })
  .catch((err)=>console.log(err))
  console.log(data)
}}    
  
  return (
    <>
      <div className="container border p-3 mt-3">
        <h4>New Article</h4><hr />
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="justify-content-center">
            <div className="col-10 mb-3 px-3">
            <label className="form-label fw-semibold text-dark">Title</label>
            <input
              type="text"
              className="form-control px-3"
              placeholder="title"
              value={data.title}
              onChange={(e) => setData({...data,title:e.target.value})}
              
            />
            </div>
            <div className="row">
          <div className="col-md-5 mb-3 px-4">
            <label className="form-label fw-semibold text-dark">Select Category </label>
            <select className='form-control'
              value={data.category}
              onChange={(e)=> setData({...data,category:e.target.value})} >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
              <option key={category._id} value={category._id}>
              {category.title}
              </option>
              ))}
              </select>
              </div>
            <div className="col-md-5 mb-3 px-4">
            <label className="form-label fw-semibold text-dark">Upload image </label>
            <input
              type="file"
              className="form-control   px-3" accept='.jpg,.png,.jpeg'
              onChange={(e) => setData({...data,image:e.target.files[0]})}
            />
            </div>
            </div>
          
            <div className="col-10 mb-4 px-3">
            <label  className="fw-semibold text-dark">Content </label>
            {/* <textarea
              className="form-control px-3"
              placeholder="Write something about your article..."
              style={{height: '80px'}}
              value={data.content}
              onChange={(e) => setData({...data,content:e.target.value})}
            /> */}
            <Editor setContent={setContent} text="Write Your Content Here ...."/>
          <p className={message.color}>{message.message}</p>
            <div className=" mb-3">
            <button type="submit" className="btn btn-primary py-2 fw-semibold">
              Save Article
            </button>
          </div>

          </div>
          </div>
        </form>
      </div>

    </>
  )
}


export default NewArticle