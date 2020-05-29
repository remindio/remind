import React from 'react'
import { Link } from 'react-router-dom'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight } from 'react-icons/bs'
import './style.scss'

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="container">
        <Link>
          <BsChevronDoubleRight size={24} style={{ color: "#FFFFFF" }} />
        </Link>

        <div className="container-environment">
          <h1>{props.title}</h1>
        </div>
      </div>
      
      <Link>
        <RiSettings2Line size={24} style={{ color: "#FFFFFF" }} />
      </Link>
    </div>
  )
}
