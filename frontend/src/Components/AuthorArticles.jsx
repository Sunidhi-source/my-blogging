import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../Components/Card'
import { useParams } from 'react-router' 
 
function AuthorArticle() {
    const { id } = useParams()
    const API_URL=import.meta.env.VITE_API_URL;
    let url =API_URL+"article/author/" 
    const [data, setData] = useState([])

    useEffect(() => { 
        
        axios.get(url+id)
        .then((res) => {
        setData(res.data.response);
        }) 
        .catch((err) => {
        console.log(err);
        });
    }, [id]);


    return (
        <>
            <h2 className='px-4 m-2'>Blog</h2>
            <hr />
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

export default AuthorArticle
