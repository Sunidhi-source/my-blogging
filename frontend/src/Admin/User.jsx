import React,{useState,useEffect} from 'react'
import axios from 'axios'

function User() {
  const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"user" 
    const [data,setData]=useState([])

  useEffect(()=>{ 
    axios.get(url)
    .then((res)=>{setData(res.data.response)}) 
    .catch((err)=>console.log(err))

  },[])

  return (
    <>
      <div className="row justify-content-evenly py-5">
        
        <div className="col-md-11">
            <h3>Users</h3>
            <hr />
            <table className='table'>
              <thead><tr>
                <th>User</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Contact Num</th>
                <th>Date</th>
              </tr></thead>
              <tbody>
               {
                data.map((rec,index)=>{
                   return (
                  <tr key={index}>
                  <td>{rec.firstname} {rec.lastname} </td> 
                  <td>{rec.email} </td>
                  <td>{rec.dob ? rec.dob.slice(0, 10) : 'N/A'}</td>
                  <td>{rec.contact}</td>
                  <td>{rec.date.slice(0,10)}</td>
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

export default User