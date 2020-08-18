/* eslint react/prop-types: 0 */
import React,{useState,useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Chips from './components/Chips'
import Modal from './components/Modal'
import {db,auth} from './firebase'
import { Redirect } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
function App() {
  const history = useHistory();
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const [user,setUser]=useState(null)
  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin]=useState(false);
  const [tags,setTags]=useState([
    {
      id:2,
      tag:'Technology'
    },
    {
      id:3,
      tag:'Narendra Modi'
    },
    {
      id:4,
      tag:'Donald Trump'
    },{
      id:5,
      tag:'Einstein'
    },{
      id:6,
      tag:'Corona Virus'
    },{
      id:11,
      tag:'Tata Consultancy'
    },{
      id:10,
      tag:'Ram Mandir'
    },{
      id:7,
      tag:'Swami Vivekananda'
    },{
      id:8,
      tag:'Programming'
    }
  ]);
  // useEffect(()=>{
  //   const unsusbcribe = auth.onAuthStateChanged(authUser=>{
  //     if(authUser){
  //       console.log(authUser)
  //       // TODO : set User
  //       setUser(authUser)
  //     }else{
  //       setUser(null)
  //     }
  //   })
  //   return ()=>{
  //     //history.push('/home');
  //     unsusbcribe()};
  // },[user])
  const signup=()=>{
    auth.createUserWithEmailAndPassword(email,password).then(authUser=>{
      setShowSignup(false);
      setShowSignin(true)
      console.log(authUser.user.uid)
      authUser.user.updateProfile({
        displayName:username
      })
      return authUser;
    })
    .then(authUser=>{
      return db.collection('users').doc(authUser.user.uid).set({
        email,password,
        displayName:username
      })
    }).then(()=>{
      setEmail('')
      setPassword('')
    })
    .catch(err=>alert(err.message))
  }
  const signin=()=>{
    
    auth.signInWithEmailAndPassword(email,password)
    .then(authUser=>{
      const dbUser = {
        uid:authUser.user.uid,
        displayName:authUser.displayName,
        email:email,
        password:password
      }
      setUser(dbUser)
      return setShowSignin(false)
    }).then(()=>{
      setPassword('')
      setUsername('')
      setEmail('')
      //console.log(history)
      return history.push('/home')
    }).catch(err=>alert(err.message))
  }
  return (
    <div className="App">
      <Navbar user={user} signupClick={()=>{setShowSignup(true)}} signinClick={()=>setShowSignin(true)} logoutClick={()=>auth.signOut()}/>
      <Hero/>
      <div className="chipsContainer">
        {
          tags.map(tag=>(
            <Chips key={tag.id} tag={tag.tag}/>
          ))
        }
      </div>
      <center><button className="app__getstarted" onClick={()=>setShowSignup(true)}>Get started</button></center>
      <center className="signin_center">Already have an account? <a href="#" onClick={()=>setShowSignin(true)}>Sign in</a></center>
      <div className="secondsection__container">
        <p className="heading">No ads. No problems.</p>
        <p className="subheading">Your privacy stays yours. We don't sell your data or target you with ads. Ever.</p>
        <p className="head1">We do things differently.</p>
        <p className="about">Medium is not like any other platform on the internet. <span>Our sole purpose is to help you find compelling ideas, knowledge, and perspectives.</span> We don’t serve ads—we serve you, the curious reader who loves to learn new things. Medium is home to thousands of independent voices, and we combine humans and technology to find the best reading for you—and filter out the rest.</p>
        <p className="head1">One Subscription. Unlimited Ideas.</p>
        <p className="about">Read unlimited stories with an optional subscription of <b>$5/month</b>. If it's not for you, cancel anytime.</p>
      </div>
      <center><button className="app__getstarted" onClick={()=>setShowSignup(true)}>Get started</button></center>
      <footer>
        <center><strong>Made by Sachin Rana</strong></center>
      </footer>

      <Modal show={showSignup}>
        <center><h1>Join Medium</h1></center>
        <input type="text" className="modal-input" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" className="modal-input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" className="modal-input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="signup-btn" onClick={signup}>Sign Up</button>
        <button className="close-btn" onClick={()=>setShowSignup(false)}>Close</button>
        <center className="signin_center">Already have an account? <a href="#" onClick={()=>{setShowSignup(false);setShowSignin(true)}}>Sign in</a></center>
      </Modal>
      <Modal show={showSignin}>
        <center><h1>Welcome back</h1></center>
        <input type="text" className="modal-input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" className="modal-input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="signup-btn" onClick={signin}>Sign In</button>
        <button className="close-btn" onClick={()=>setShowSignin(false)}>Close</button>
        <center className="signin_center">No account? <a href="#" onClick={()=>{setShowSignup(true);setShowSignin(false)}}>Create one</a></center>
      </Modal>
    </div>
  );
}

export default App;
