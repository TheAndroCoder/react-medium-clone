/* eslint react/prop-types: 0 */
import React from 'react'
import './css/Trending.css'
import { useHistory } from 'react-router-dom'
function Trending({post}) {
    const history=useHistory();
    return (
        <div onClick={()=>history.push('/post/'+post.id)}>
            <div className="post">
                <img src={post.image}/>
                <div className="desc">
                    <p className="muted">{post.category}</p>
                    <p className="title">{post.title}</p>
                    <p className="author">{post.authorName}</p>
                    <p className="date">{post.date}</p>
                </div>
            </div>
        </div>
    )
}

export default Trending
