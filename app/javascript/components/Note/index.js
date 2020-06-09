import React, { useState, useEffect, useRef } from 'react'
import api, { apiUrl } from '../../services/api'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import TaskListItem from '../TaskListItem'
import OptionMenu from '../OptionMenu'
import './style.scss'

export default function Note(props) {
  const [posX, setPosX] = useState(window.innerWidth * props.positionX/1920)
  const [posY, setPosY] = useState(window.innerHeight * props.positionY/942)
  const [isContentShowing, setIsContentShowing] = useState(true)
  const [optionMenu, setOptionMenu] = useState([])
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const noteRef = useRef(null)
  const contentRef = useRef(null)
  let offsetX, offsetY

  useEffect(() => {
    if (isContentShowing) {
      contentRef.current.style.display = "block"
      noteRef.current.style.backgroundColor = "#FFFFFF"
    }
    else {
      contentRef.current.style.display = "none"
      noteRef.current.style.backgroundColor = "transparent"
    }
  }, [isContentShowing])

  useEffect(() => {
    if (isMenuShowing)
      setOptionMenu([
        {
          positionX: posX,
          positionY: posY,
          links: [
            {
              description: 'Delete note',
              function: () => deleteNote()
            }
          ]
        }
      ])
    else
      setOptionMenu([])
  }, [isMenuShowing])

  function deleteNote() {
    console.log('ALOO')
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

  function cancelNoteSelection() {
    document.onmouseup = null
    document.onmousemove = null
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

  function renderOptionMenu(event) {
    const positionX = event.clientX
    const positionY = event.clientY
    event.preventDefault()

    console.log('OPA')
    setIsMenuShowing(true)
  }
  
  return (
    <div style={{ top: posY, left: posX }} onContextMenu={renderOptionMenu} ref={noteRef} className="note">
      <div onMouseDown={setNotePosition} onMouseUp={cancelNoteSelection} className="navbar-note" id="navbar">
        <div className="note-title">
          <h1>{props.title}</h1>
        </div>

        <div className="container-icons">
          <AiOutlineMinusSquare 
            size={24} 
            style={{ color: "#FFFFFF", borderRadius: 15 }} 
            onClick={() => setIsContentShowing(!isContentShowing)} 
          />
        </div>
        
      </div>
      <div className="container-description" ref={contentRef}>
        {props.isTask && props.items.map(item => 
          <TaskListItem key={item.id} description={item.description} />
        )}
        {!props.isTask && <p>{props.description}</p>}
      </div>
      {optionMenu.length > 0 && optionMenu.map(menu =>
        <OptionMenu
          key={1}
          positionX={menu.positionX} 
          positionY={menu.positionY} 
          links={menu.links}
        />
      )}
    </div>
  )
}
