import React from 'react'
import logo from '../../assets/Remind.svg'
import './style.scss'

export default function SignIn() {
  return (
    <div className="outer-container">
      <div className="container">
        <div className="inner-container">
          <img src={logo} alt=""/>
          <form action="submit" className="inner-container-form">
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="password" placeholder="Password"/>
            <input type="text" name="password-confirmation" placeholder="Password confirmation"/>
            <div className="inner-container-button">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}