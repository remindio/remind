import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import './style.scss'
import Account from '../../components/Account/'
import Environments from '../../components/Environments/'
// import profilePicture from '../../assets/erickjohnson.jpg'


export default function Profile() {
  const [currentContent, setCurrentContent] = useState(<Account/>)


  function handleCurrentContent(component, event) {
    if (event.target.id === "") {
      document.getElementById("styled").id = ""
      event.target.id = "styled"
      setCurrentContent(component)
    }
  }
  

  return (
    <div className="profile">
      <nav>
        <Link to="/"><BsChevronDoubleLeft size={24} style={{ color: "#FFFFFF", cursor: "pointer", marginLeft: "32px"  }}/></Link>
      </nav>
      <div className="profile-picture">
        <div className="img"></div>
      </div>
      <div className="profile-container">
        <h1>Erick Johnson</h1>
        <div className="profile-options">
          <h2 id="styled" onClick={(event) => handleCurrentContent(<Account/>, event)}>Account</h2>
          <h2 id="" onClick={(event) => handleCurrentContent(<Environments/>, event)}>Environments</h2>
        </div>
      </div>
      <div className="profile-info">
        {currentContent}
      </div>
    </div>
  )
}
