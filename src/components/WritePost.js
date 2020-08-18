import React,{useState,useEffect} from 'react'
import {db,auth} from '../firebase'
import {useHistory} from 'react-router-dom'
import './css/WritePost.css'
import firebase from 'firebase'
function WritePost() {
    const history=useHistory();
    const [user,setUser]=useState(null);
    const [placeholder,setPlaceholder]=useState('');
    const [content,setContent]=useState('')
    const [show,setShow]=useState(false);
    const [option,setOption]=useState('');
    const [value,setValue]=useState('')
    const [title,setTitle]=useState('')
    const [image,setImage]=useState('');
    useEffect(()=>{
        const unsusbcribe = auth.onAuthStateChanged(authUser=>{
          if(authUser){
            console.log(authUser.uid)
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
      const add=()=>{
        if(value==''){
            setValue('')
        setOption('')
        setShow(false)
        return;
        }
        let con=content;
        if(option=='image'){
            con+=`<img src="${value}" width="100%" height="400px"/>`
        }else if(option=='heading'){
            con+=`<h3>${value}</h3>`;
            console.log(con)
        }else if(option=='subheading'){
            con+=`<h4>${value}</h4>`
        }
        setContent(con);
        setValue('')
        setOption('')
        setShow(false)
      }
      const submitPost=()=>{
          if(title=='' || content=='' || image=='')return;
          db.collection('posts').add({
            authorId:user.uid,
            authorName:user.displayName,
            category:'Programming',
            content:content,
            date:firebase.firestore.Timestamp.now(),
            image:image,
            title:title
          }).then(()=>{
              history.push('/home');
          })
      }
    return (
        <div className="write-post">
            <input type="text" placeholder="Enter Title" value={title} onChange={e=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Post Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/>
            <textarea placeholder="start writing a paragraph..." value={content} onChange={(e)=>setContent(e.target.value)}>{content}</textarea>
            <div className="buttons">
                <button onClick={()=>{setShow(true);setOption('image')}}>Add Image</button>
                <button onClick={()=>{setShow(true);setOption('heading')}}>Add Heading</button>
                <button onClick={()=>{setShow(true);setOption('subheading')}}>Add Sub-heading</button>
            </div>
            <div className="extras" style={{'display':show?'flex':'none'}}>
                <input type="text" placeholder={placeholder} onChange={(e)=>setValue(e.target.value)} value={value}/>
                <button onClick={()=>add()}>Add</button>
            </div>
            <button id="post-btn" onClick={submitPost}>POST</button>
        </div>
    )
}

export default WritePost
