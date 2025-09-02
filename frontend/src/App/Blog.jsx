import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../Components/Card'
import { useParams } from 'react-router' 
 
function Blog() {
    const { type } = useParams()
    const API_URL=import.meta.env.VITE_API_URL;
    let url =API_URL+"article/" 
    const [data, setData] = useState([])

    const getData=(x)=>{  
        axios.get(url+x+"/"+type)
        .then((res) => {
        setData(res.data.response);
        }) 
        .catch((err) => {
        console.log(err);
        });
    }
    useEffect(() => { 
        if(type=='all')
        getData("latest") 
        else
        getData("category")
    }, [type]);


    return (
        <>
        <div className="container text-center py-4 mb-3" style={{ backgroundColor: '#f8f9fa',
             borderRadius: '0.5rem' }}>
      <h1 className="display-5 fw-bold">Our Blog</h1>
      <p className="lead text-muted">
        Explore our latest articles, stories, and insights from all categories.
      </p>
    </div>
            {/* <h2 className='px-4 m-2'></h2>
            <hr /> */}
            <div className="row justify-content-center p-5">
            {
                data.map((rec) => {
                    return (
                        <Card rec={rec} key={rec._id} />
                    )
                })
            }  
            </div>
        </>
    )
}

export default Blog
