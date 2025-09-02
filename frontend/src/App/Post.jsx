import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import CommentForm from './../Components/CommentForm'
import CommentsList from '../Components/CommentsList'
import './Home.css'

function Post() {

  const { id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL;
  let url = API_URL + "article"
  const IMAGE_SRC = import.meta.env.VITE_IMAGE_SRC;
  let imgurl = IMAGE_SRC

  const [data, setData] = useState({ date: '' })
  const [category, setCategory] = useState()

  useEffect(() => {
    axios.get(url + "/" + id)
      .then((res) => {
        setData(res.data.response);
        setCategory(res.data.response.category.title)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <article>
            {/* Title and Metadata */}
            <h1 className="post-title">{data.title}</h1>
            <p className="post-meta">
              <span>{category}</span> | <span>{data.date.slice(0, 10)}</span>
            </p>

            {/* Featured Image */}
            <div className="post-image-container">
              <img src={imgurl + data.image} alt={data.title} className="post-image" />
            </div>

            {/* Article Content */}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </article>

          {/* Comments Section */}
          <div className="comments-section mt-5">
            <CommentForm articleid={id} />
            <CommentsList articleid={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;