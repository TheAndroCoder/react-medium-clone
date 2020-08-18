import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import {db,auth} from '../firebase'
import { useHistory } from 'react-router-dom'
import './css/Home.css'
import Trending from './Trending'
import Post from './Post'
import ReadPost from './ReadPost'
function Home() {
    const [posts,setPosts] = useState([
        
    ])
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
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>{
                const data = doc.data();
                data.id=doc.id;
                console.log(data)
                return data
            }))
        })
    },[])
    return (
        <div>
            {console.log(user)}
            <Navbar user={user} logoutClick={()=>auth.signOut()}/>
            <div className="search-container">
                <div className="search-div">
                    <input type="text" placeholder="Search..." onClick={()=>history.push('/search')}/>
                    <button>SEARCH</button>
                </div>
            </div>
            <div className="trending-div">
                {
                    posts.map(post=>(
                        <Trending key={post.id} post={post}/>
                    ))
                }
            </div>
            <div className="posts-div">
                {
                    posts.map(post=>(
                        <Post key={post.id} post={post}/>
                    ))
                }
            </div>
                
        </div>
    )
}

export default Home
