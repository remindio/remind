import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/Remind.svg'
import api from '../../services/api'
import './style.scss'

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  function handleEmail(event) {
    const email = event.target.value
    setEmail(email)
  }

  function handlePassword(event) {
    const password = event.target.value
    setPassword(password)
  }

  function handleRememberMe(event) {
    const rememberMe = event.target.checked;
    setRememberMe(rememberMe)
  }

  async function handleLogin(event) {
    event.preventDefault();

    const response = await api.post('users/sign_in', {
      user: {
        email,
        password,
        remember_me: rememberMe
      }
    });

    history.push('/');
  }

  return (
    <div className="outer-container">
      <div className="container">
        <div className="inner-container">
          <img src={logo} alt="" style={{ width: 250, height: 100 }}/>
          <form onSubmit={handleLogin} className="inner-container-form">
            <input type="text" name="email" placeholder="Email" onChange={handleEmail}/>
            <input type="password" name="password" placeholder="Password" onChange={handlePassword}/>
            <div className="inner-container-options">
              <label class="container-checkbox">Remember me
                <input type="checkbox" onChange={handleRememberMe}/>
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