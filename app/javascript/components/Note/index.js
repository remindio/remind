import React, { useState, useEffect, useRef } from 'react'
import api, { apiUrl } from '../../services/api'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import TaskListItem from '../TaskListItem'
import './style.scss'

export default function Note(props) {
  const [posX, setPosX] = useState(window.innerWidth * props.positionX/1920)
  const [posY, setPosY] = useState(window.innerHeight * props.positionY/942)
  const [isContentMinimized, setIsContentMinimized] = useState(props.minimized)
  const noteRef = useRef(null)
  const contentRef = useRef(null)
  let offsetX, offsetY

  useEffect(() => {
    if (isContentMinimized) {
      contentRef.current.style.display = "none"
      noteRef.current.style.backgroundColor = "transparent"
      noteRef.current.style.zIndex = 0
    }
    else {
      contentRef.current.style.display = "block"
      noteRef.current.style.backgroundColor = "#FFFFFF"
      noteRef.current.style.zIndex = 1
    }
  }, [isContentMinimized])

  async function changeNoteDisplay() {
    console.log('alo')
    if (!props.isTask) {
      await api.put(`${apiUrl}/environment/${props.environment_id}/note/${props.id}`, {
        note: {
          "minimized?": !isContentMinimized
        }
      })
    }
    else {
      await api.put(`${apiUrl}/environment/${props.environment_id}/task_list/${props.id}`, {
        task_list: {
          "minimized?": !isContentMinimized
        }
      })
    }
  }

  async function deleteNote() {
    if (!props.isTask)
      await api.delete(`${apiUrl}/environment/${props.environment_id}/note/${props.id}`)
    else
      await api.delete(`${apiUrl}/environment/${props.environment_id}/task_list/${props.id}`)
    
    props.fetchEnvironmentContent(props.environment_id)
  }
  
  function movingNote(event) {
    setPosX(event.pageX - offsetX)
    
    if (event.pageY - offsetY <= 64)
      setPosY(64)
    else
      setPosY(event.pageY - offsetY)
  }

  function setNotePosition(event) {
    offsetY = event.clientY - noteRef.current.getBoundingClientRect().top
    offsetX = event.clientX - noteRef.current.getBoundingClientRect().left
    document.onmousemove = movingNote
  }

  function cancelNoteSelection(event) {
    document.onmouseup = null
    document.onmousemove = null
    if (event.target.id === 'trash-button' || event.target.id === 'minimize-button')
      return
    changeNotePosition()
  }

  async function changeNotePosition() {
    if (!props.isTask) {
      await api.put(`${apiUrl}/environment/${props.environment_id}/note/${props.id}`, {
        note: {
          title: props.title,
          description: props.description,
          positionX: posX,
          positionY: posY   
        }
      })
    }
    else {
      await api.put(`${apiUrl}/environment/${props.environment_id}/task_list/${props.id}`, {
        task_list: {
          title: props.title,
          positionX: posX,
          positionY: posY   
        }
      })
    }
  }
  
  return (
    <div style={{ top: posY, left: posX }} ref={noteRef} className="note">
      <div onMouseDown={setNotePosition} onMouseUp={cancelNoteSelection} className="navbar-note" id="navbar">
        <div className="note-title">
          <h1>{props.title}</h1>
        </div>

        <div className="container-icons">
          <BsTrash
            id="trash-button"
            size={20}
            style={{ color: "#FFFFFF", marginRight: 2 }} 
            onClick={()=> {
              deleteNote()
            }}
          />
          <AiOutlineMinusSquare 
            id="minimize-button"
            size={24} 
            style={{ color: "#FFFFFF", borderRadius: 15 }} 
            onClick={() => { 
              setIsContentMinimized(!isContentMinimized)
              changeNoteDisplay()
            }} 
          />
        </div>
        
      </div>
      <div className="container-description" ref={contentRef}>
        {props.isTask && props.items.map(item => 
          <TaskListItem 
            key={item.id}
            id={item.id}
            description={item.description}
            taskCompleted={item.task_completed}
            task_id={props.id}
            environment_id={props.environment_id}
            fetchEnvironmentContent={props.fetchEnvironmentContent}
          />
        )}
        {!props.isTask && <p>{props.description}</p>}
      </div>
    </div>
  )
}
