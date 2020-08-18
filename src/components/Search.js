import React,{useState,useEffect} from 'react'
import './css/Search.css'
import {db,auth} from '../firebase'
import {useHistory} from 'react-router-dom'
import Post from './Post'
function Search() {
    const [user,setUser]= useState(null)
    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')
    const history = useHistory();
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
        if(search!=''){
            db.collection('posts').onSnapshot(snapshot=>{
                setPosts(snapshot.docs.map(doc=>{
                    const data = doc.data();
                    data.id=doc.id;
                    console.log(data)
                    return data
                }))
                
            })
        }else{
            setPosts([])
        }
    },[search])
    return (
        <div>
            <div className="search-box">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F93%2F93634.png&f=1&nofb=1" width="30px" height="30px" onClick={()=>history.goBack()}/>
                <input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                {search!=''?(
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fstatus%2F100%2Fclose_4-512.png&f=1&nofb=1" width="40px" height="40px" onClick={()=>setSearch('')}/>
                ):''}
            </div>
            <div class="posts-div">
            {
                posts.map(post=>(
                    <Post post={post} key={post.id}/>
                ))
            }
            </div>
        </div>
    )
}

export default Search
