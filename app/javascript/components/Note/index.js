import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import TaskListItem from '../TaskListItem'

import './style.scss'

export default function Note(props) {
  return (
    <div className="note">
      <div className="navbar-note">
        <div className="note-title">
          <h1>{props.title}</h1>
        </div>

        <div className="container-icons">
          <Link>
            <AiOutlineMinusSquare size={24} style={{ color: "#FFFFFF", borderRadius: 15 }} />
          </Link>
        </div>
        
      </div>
      <div className="container-description">
        <TaskListItem description="Salvar gubitoso!" />
        <p>{props.description}</p>
      </div>
    </div>
  )
}
