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
    noteRef.current.style.zIndex = 2
    document.onmousemove = movingNote
  }

  function handleNoteSelection(event) {
    document.onmouseup = null
    document.onmousemove = null
    noteRef.current.style.zIndex = 1
    if (event.target.id === 'trash-button' || event.target.id === 'minimize-button')
      return
    handleUpdates(title, width, height, isContentMinimized)
  }

  async function handleTitleUpdate(event) {
    const newTitle = event.target.textContent
    setTitle(newTitle)
    handleUpdates(newTitle, width, height, isContentMinimized)
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

  function handleMouseDownEvent(event) {
    const elementId = event.target.id
    switch (elementId) {
      case 'trash-button':
      case 'minimize-button':
        return
      default:
        if (document.activeElement === titleRef.current)
          return
        setNotePosition(event)
    }
  }

  function handleMouseUpEvent(event) {
    event.stopPropagation()
    const elementId = event.target.id
    switch (elementId) {
      case 'trash-button':
      case 'minimize-button':
        return
      default:
        if (document.activeElement === titleRef.current)
          return
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

  function setEndOfContenteditable(contentEditableElement) {
    let range, selection

    if (document.createRange) {
      range = document.createRange() // Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement) // Select the entire contents of the element with the range
      range.collapse(false) // collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection() // get the selection object (allows you to change selection)
      selection.removeAllRanges() // remove any selections already made
      selection.addRange(range) // make the range you have just created the visible selection
    }
    else if (document.selection) { // IE 8 and lower
      range = document.body.createTextRange() // Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      range.select(); // Select the range (make it the visible selection
    }
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
              contentEditable={false}
              onDoubleClick={(event) => { 
                event.preventDefault()  
                if (titleRef !== null) { 
                  titleRef.current.contentEditable = true
                  setEndOfContenteditable(titleRef.current)
                }
              }}
              placeholder={props.isTask ? "Task title" : "Note title"}
              suppressContentEditableWarning={true} 
              onBlur={(event) => { handleTitleUpdate(event); titleRef.current.contentEditable = false }}
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
            environment_id={props.environment_id}
            setEndOfContenteditable={setEndOfContenteditable}
          />
        }
        {!props.isTask &&
          <Note 
            id={props.id} 
            description={props.description} 
            environment_id={props.environment_id}
          />
        }
      </div>
    </div>
  )
}
