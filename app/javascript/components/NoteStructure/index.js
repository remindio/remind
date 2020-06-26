import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { Notes, Tasks } from '../../services'
import Note from '../Note'
import TaskList from '../TaskList'
import './style.scss'

export default function NoteStructure(props) {
  const [title, setTitle] = useState(props.title)
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)
  const [positionX, setPositionX] = useState(props.positionX)
  const [positionY, setPositionY] = useState(props.positionY)
  const [isContentMinimized, setIsContentMinimized] = useState(props.minimized)
  const noteRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  let offsetX, offsetY

  useEffect(() => {
    if (isContentMinimized) {
      contentRef.current.style.display = "none"
      noteRef.current.style.backgroundColor = "transparent"
      noteRef.current.style.zIndex = 0
      noteRef.current.style.resize = "none"
    }
    else {
      contentRef.current.style.display = "block"
      noteRef.current.style.backgroundColor = "#FFFFFF"
      noteRef.current.style.zIndex = 1
      noteRef.current.style.resize = "both"
    }
  }, [isContentMinimized])

  async function deleteNote() {
    if (!props.isTask)
      await Notes.delete(props.environment_id, props.id)
    else
      await Tasks.delete(props.environment_id, props.id)
    
    props.fetchEnvironmentContent(props.environment_id)
  }
  
  function movingNote(event) {
    setPositionX(event.pageX - offsetX)
    
    if (event.pageY - offsetY <= 64)
      setPositionY(64)
    else
      setPositionY(event.pageY - offsetY)
  }

  function setNotePosition(event) {
    offsetY = event.clientY - noteRef.current.getBoundingClientRect().top
    offsetX = event.clientX - noteRef.current.getBoundingClientRect().left
    document.onmousemove = movingNote
  }

  function handleNoteSelection(event) {
    document.onmouseup = null
    document.onmousemove = null
    if (event.target.id === 'trash-button' || event.target.id === 'minimize-button')
      return
    handleUpdates(title, width, height, isContentMinimized)
  }

  async function handleTitleUpdate(event) {
    const newTitle = event.target.textContent
    setTitle(newTitle)
    handleUpdates(newTitle, width, height, isContentMinimized)
    props.mainRef.current.onclick = null
  }

  async function handleUpdates(newTitle, newWidth, newHeight, isContentMinimized) {
    if (!props.isTask) {
      const params = {
        note: {
          title: newTitle,
          positionX: positionX,
          positionY: positionY,
          width: newWidth,
          height: newHeight,
          "minimized?": isContentMinimized
        }
      }

      await Notes.update(props.environment_id, props.id, params)
    }
    else {
      const params = {
        task_list: {
          title: newTitle,
          positionX: positionX,
          positionY: positionY,
          width: newWidth,
          height: newHeight,
          "minimized?": isContentMinimized 
        }
      }

      await Tasks.update(props.environment_id, props.id, params)
    }
  }

  function unfocusEditable(ref) {
    props.mainRef.current.onclick = (event) => { 
      if (ref.current.id != event.target.id)
        props.unfocusTarget(ref) 
    }
  }

  function handleMouseDownEvent(event) {
    const elementId = event.target.id
    switch (elementId) {
      case 'note-title':
      case 'trash-button':
      case 'minimize-button':
        return
      default:
        setNotePosition(event)
    }
  }

  function handleMouseUpEvent(event) {
    event.stopPropagation()
    console.log('alo')
    const elementId = event.target.id
    switch (elementId) {
      case 'note-title':
      case 'trash-button':
      case 'minimize-button':
        return
      default:
        handleNoteSelection(event)
    }
  }

  function handleNoteSize() {
    const newWidth = noteRef.current.offsetWidth
    const newHeight = noteRef.current.offsetHeight
    setWidth(newWidth)
    setHeight(newHeight)
    handleUpdates(title, newWidth, newHeight, isContentMinimized)
  }
  
  return (
    <div style={{ top: positionY, left: positionX, width: width, height: height }} ref={noteRef} onMouseUp={handleNoteSize} className="note">
      <div>
        <div onMouseDown={handleMouseDownEvent} onMouseUp={handleMouseUpEvent} className="navbar-note" id="navbar">
          <div className="note-title">
            <h1
              ref={titleRef}
              id="note-title"
              spellCheck={false}
              contentEditable={true}
              placeholder={props.isTask ? "Task title" : "Note title"}
              suppressContentEditableWarning={true} 
              onBlur={handleTitleUpdate}
              onFocus={() => unfocusEditable(titleRef)}
              onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
              >{title}
            </h1>
          </div>

          <div className="container-icons">
            <BsTrash
              id="trash-button"
              size={20}
              style={{ color: "#FFFFFF", marginRight: 2 }} 
              onClick={deleteNote}
            />
            <AiOutlineMinusSquare 
              id="minimize-button"
              size={24} 
              style={{ color: "#FFFFFF", borderRadius: 15 }} 
              onClick={() => { 
                setIsContentMinimized(!isContentMinimized)
                handleUpdates(title, width, height, !isContentMinimized)
              }} 
            />
          </div>
          
        </div>
      </div>
      
      <div className="container-description" ref={contentRef}>
        {props.isTask && 
          <TaskList 
            id={props.id} 
            items={props.items} 
            unfocusEditable={unfocusEditable} 
            mainRef={props.mainRef} 
            environment_id={props.environment_id}
          />
        }
        {!props.isTask &&
          <Note 
            id={props.id} 
            description={props.description} 
            unfocusEditable={unfocusEditable} 
            mainRef={props.mainRef} 
            environment_id={props.environment_id}
          />
        }
      </div>
    </div>
  )
}
