import React,{useState,useEffect} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import {db,auth} from '../firebase'
import './css/ReadPost.css'
function ReadPost() {
    const [post,setPost] = useState({})
    const postId =  useLocation().pathname.split('/')[2];
    const history = useHistory()
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const unsusbcribe = auth.onAuthStateChanged(authUser=>{
          if(authUser){
            console.log(authUser)
            setUser(authUser)
          }else{
            setUser(null)
            history.push('/')
          }
        })
        return ()=>{
          //history.push('/home');
          unsusbcribe()};
      },[user])
    useEffect(()=>{
        db.collection('posts').doc(postId).get().then(doc=>{
            setPost(doc.data())
        })
    },[])
    return (
        <div className="read-post">
            <img className="post-img" src={post.image}/>
            <div className="post-header-div">
              <h1>{post.title}</h1>
              <div className="post-info">
                <div>
                  <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.stickpng.com%2Fassets%2Fimages%2F585e4beacb11b227491c3399.png&f=1&nofb=1" width="30px" height="30px"/>
                  <p><b>{post.authorName}</b></p>
                </div>
                <b>{post.date}</b>
              </div>
            </div>
            <div className="post-content-div"dangerouslySetInnerHTML={{__html:post.content}}>
              
            </div>
        </div>
    )
}

export default ReadPost
