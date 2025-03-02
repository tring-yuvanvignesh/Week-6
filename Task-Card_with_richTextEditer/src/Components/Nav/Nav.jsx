import React from 'react'
import './nav.css'
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom'
import SignIn from '../../Pages/Signin/SignIn'

const Nav = () => {
  return (
    <div className='Nav-container'>
      <div className='Nav-logo'>
          <img src={logo} alt="logo" />
      </div>
      <div>
        <ul  className='nav-li'>
          <Link to='/SignIn'><li className='nav-li-items'>SignIn</li></Link>
          <Link to='/SignUP'><li className='nav-li-items'>SignUp</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Nav