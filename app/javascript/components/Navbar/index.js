import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight } from 'react-icons/bs'
import './style.scss'

export default function Navbar(props) {
  const [menu, setMenu] = useState('')
  const [isMenuShowing, setIsMenuShowing] = useState(false)

  useEffect(() => {
    if (isMenuShowing)
      setMenu();
    else
      setMenu('');
  }, [isMenuShowing])

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link>
          <BsChevronDoubleRight size={24} style={{ color: "#FFFFFF" }} />
        </Link>

        <div className="container-environment" onMouseDown={() => setIsMenuShowing(true)}>
          <h1>{props.currentEnvironment}</h1>
          {menu}
        </div>
      </div>
      
      <Link>
        <RiSettings2Line size={24} style={{ color: "#FFFFFF" }} />
      </Link>
    </div>
  )
}
