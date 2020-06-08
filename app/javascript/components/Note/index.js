import React, { useState, useRef } from 'react'
import api, { apiUrl } from '../../services/api'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import TaskListItem from '../TaskListItem'
import './style.scss'

export default function Note(props) {
  const [posX, setPosX] = useState(window.innerWidth * props.positionX/1920)
  const [posY, setPosY] = useState(window.innerHeight * props.positionY/942)
  const contentRef = useRef(null)
  let offsetX, offsetY
  

  function movingNote(event) {
    setPosX(event.pageX - offsetX)
    
    if (event.pageY - offsetY <= 64)
      setPosY(64)
    else
      setPosY(event.pageY - offsetY)
  }

  function setNotePosition(event) {
    offsetY = event.clientY - contentRef.current.getBoundingClientRect().top
    offsetX = event.clientX - contentRef.current.getBoundingClientRect().left
    document.onmousemove = movingNote
  }

  function cancelNoteSelection() {
    console.log('alo')
    document.onmouseup = null
    document.onmousemove = null
    changeNotePosition()
  }

  async function changeNotePosition() {
    if (!props.isTask) {
      const response = await api.put(`${apiUrl}/environment/${props.environment_id}/note/${props.id}`, {
        note: {
          title: props.title,
          description: props.description,
          positionX: posX,
          positionY: posY   
        }
      })
    }
    else {
      const response = await api.put(`${apiUrl}/environment/${props.environment_id}/task_list/${props.id}`, {
        task_list: {
          title: props.title,
          positionX: posX,
          positionY: posY   
        }
      })
    }
  }
 
  
  return (
    <div style={{ top: posY, left: posX }} ref={contentRef} className="note">
      <div onMouseDown={setNotePosition} onMouseUp={cancelNoteSelection} className="navbar-note" id="navbar">
        <div className="note-title">
          <h1>{props.title}</h1>
        </div>

        <div className="container-icons">
          <AiOutlineMinusSquare size={24} style={{ color: "#FFFFFF", borderRadius: 15 }} />
        </div>
        
      </div>
      <div className="container-description">
        {props.isTask && props.items.map(item => 
          <TaskListItem key={item.id} description={item.description} />
        )}
        {!props.isTask && <p>{props.description}</p>}
      </div>
    </div>
  )
}
