import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Remind.svg'
import './style.scss'

export default function SignIn() {
  return (
    <div className="outer-container">
      <div className="container">
        <div className="inner-container">
          <img src={logo} alt="" style={{ width: 250, height: 100 }}/>
          <form action="submit" className="inner-container-form">
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="password" placeholder="Password"/>
            <div className="inner-container-options">
              <label class="container-checkbox">Remember me
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <Link className="inner-container-links">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
          </form>
          <p>Don't have an account? <Link>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}