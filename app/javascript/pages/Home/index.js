import React from 'react'
import logo from '../../assets/Remind.svg'
import homeImage from '../../assets/home_image.svg'
import './style.scss'

export default function Home() {
  return (
    <div className="home-page">
      <header>
        <nav>
          <img src={logo} style={{ width: 100, height: 64 }} alt="Remind"/>
          <div>
            <div className="about-container">
              <a href="#">About</a>
            </div>
            <div>
              <a href="/users/sign_in">Login</a>
              <a href="/users/sign_up">Sign up</a>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <div className="main-description">
          <h1>The complete productivity environment</h1>
          <div className="main-subdescription">
            <p>Everything you need, in one place</p>
            <button>Get Started</button>
          </div>
        </div>

        <img src={homeImage} style={{ width: 500, height: 400 }} alt="Home image"/>
      </section>
    </div>
  );
}
