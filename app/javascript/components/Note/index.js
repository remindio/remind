import React, { useState, useEffect, useRef } from 'react'
import { Notes, Tasks } from '../../services'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import TaskListItem from '../TaskListItem'
import './style.scss'

export default function Note(props) {
  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)
  const [positionX, setPositionX] = useState(window.innerWidth * props.positionX/1920)
  const [positionY, setPositionY] = useState(window.innerHeight * props.positionY/942)
  const [isContentMinimized, setIsContentMinimized] = useState(props.minimized)
  const noteRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
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

  async function handleNoteDisplay() {
    if (!props.isTask) {
      const params = {
        note: {
          "minimized?": !isContentMinimized
        }
      }

      await Notes.update(props.environment_id, props.id, params)
    }
    else {
      const params = {
        task_list: {
          "minimized?": !isContentMinimized
        }
      }

      await Tasks.update(props.environment_id, props.id, params)
    }
  }

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
    handleNotePosition()
  }

  async function handleNotePosition() {
    if (!props.isTask) {
      const params = {
        note: {
          title: props.title,
          description: props.description,
          positionX: positionX,
          positionY: positionY   
        }
      }

      await Notes.update(props.environment_id, props.id, params)
    }
    else {
      const params = {
        task_list: {
          title: props.title,
          positionX: positionX,
          positionY: positionY   
        }
      }

      await Tasks.update(props.environment_id, props.id, params)
    }
  }

  async function handleTitleUpdate(event) {
    const newTitle = event.target.textContent
    setTitle(newTitle)

    if (!props.isTask) {
      const params = {
        note: {
          title: newTitle,
          description: description,
          positionX: positionX,
          positionY: positionY   
        }
      }

      await Notes.update(props.environment_id, props.id, params)
    }
    else {
      const params = {
        task_list: {
          title: newTitle,
          positionX: positionX,
          positionY: positionY   
        }
      }
      await Tasks.update(props.environment_id, props.id, params)
    }

    props.mainRef.current.onclick = null
  }

  async function handleDescriptionUpdate(event) {
    const newDescription = event.target.textContent
    setDescription(newDescription)

    if (!props.isTask) {
      const params = {
        note: {
          title: title,
          description: newDescription,
          positionX: positionX,
          positionY: positionY   
        }
      }

      await Notes.update(props.environment_id, props.id, params)
    }

    props.mainRef.current.onclick = null
  }

  function unfocusEditable(ref) {
    props.mainRef.current.onclick = () => props.unfocusTarget(ref)
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
  
  return (
    <div style={{ top: positionY, left: positionX }} ref={noteRef} className="note">
      <div onMouseDown={handleMouseDownEvent} onMouseUp={handleMouseUpEvent} className="navbar-note" id="navbar">
        <div className="note-title">
          <h1
            ref={titleRef}
            id="note-title"
            spellCheck={false}
            contentEditable={true} 
            suppressContentEditableWarning={true} 
            onBlur={handleTitleUpdate}
            onClick={() => unfocusEditable(titleRef)}
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
              handleNoteDisplay()
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
            mainRef={props.mainRef}
            unfocusTarget={props.unfocusTarget}
            environment_id={props.environment_id}
            fetchEnvironmentContent={props.fetchEnvironmentContent}
          />
        )}
        {!props.isTask &&
          <p
            id="note-description"
            ref={descriptionRef}
            spellCheck={false}
            contentEditable={true} 
            suppressContentEditableWarning={true} 
            onBlur={handleDescriptionUpdate}
            onClick={() => unfocusEditable(descriptionRef)}
            onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}>
              {description}
          </p>
        }
      </div>
    </div>
  )
}
