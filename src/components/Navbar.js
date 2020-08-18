import React from 'react'
import './css/Navbar.css'
import {useHistory} from 'react-router-dom'
function Navbar({user,signupClick,signinClick,logoutClick}) {
    const history=useHistory();
    return (
        
        <div className="navbar">
            <div className="navbar-container">
                <h1>Medium</h1>
                <ul>
                    <li>Subscribe</li>
                    {!user?(<li onClick={signinClick}>Write</li>):(<li onClick={()=>history.push('/write')}>Write</li>)}
                    {!user?(<li onClick={signinClick}>Sign in</li>):''}
                    {!user?(<li><button onClick={signupClick}>Get started</button></li>):''}
                    {user?(
                        <li className="my-account">
                            My Account
                            <div className="menu">
                                <p>{`Hi, ${user.displayName}`}</p>
                                <p>Settings</p>
                                <p>Statistics</p>
                                <p onClick={logoutClick}>Logout</p>
                            </div>
                        </li>
                    ):''}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
