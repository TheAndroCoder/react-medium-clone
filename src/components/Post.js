import React from 'react'
import './css/Post.css'
import { useHistory } from 'react-router-dom'
import ReadPost from './ReadPost';
function Post({post}) {
    const history = useHistory();
    const getStyle={
        'background':`linear-gradient(to right,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('${post.image}')`,
        'background-position':'center',
        'background-size':'cover'
    }
    return (
        <div className="post-container" style={getStyle}>
            <img src={post.image} width="50%" height="100%"/>
            <div className="post-info-div">
                <p className="title">{post.title}</p>
                
                <p className="author">{post.authorName}</p>
                <p className="date">{post.date}</p>
                <p className="category">{post.category}</p>
            </div>
        </div>
    )
}

export default Post
