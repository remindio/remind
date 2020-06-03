import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import TaskListItem from '../TaskListItem'

import './style.scss'

export default function Note(props) {
  const [posX, setPosX] = useState(props.positionX)
  const [posY, setPosY] = useState(props.positionY)
  const contentRef = useRef(null)

  // let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  
  // function dragMouseDown(e) {
  //   console.log('alo')
  //   e = e || window.event;
  //   e.preventDefault();
  //   // get the mouse cursor position at startup:
  //   pos3 = e.clientX;
  //   pos4 = e.clientY;
  //   document.onmouseup = closeDragElement;
  //   // call a function whenever the cursor moves:
  //   document.onmousemove = elementDrag;
  // }

  // function elementDrag(e) {
  //   e = e || window.event;
  //   e.preventDefault();
  //   // calculate the new cursor position:
  //   pos1 = pos3 - e.clientX;
  //   pos2 = pos4 - e.clientY;
  //   pos3 = e.clientX;
  //   pos4 = e.clientY;
  //   // set the element's new position:
  //   console.log("TAMO AQUI RAPA")
  //   setPosY(contentRef.current.offsetTop - pos2)
  //   setPosX(contentRef.current.offsetLeft - pos1)
  // }

  // function closeDragElement() {
  //   // stop moving when mouse button is released:
  //   document.onmouseup = null;
  //   document.onmousemove = null;
  // }
  

  // useEffect(() => {

  // }, [posX, posY])


  let offsetX,offsetY
  function move(e) {
    // const el=e.target
    // el.style.left = `${e.pageX-offsetX}px`
    // el.style.top = `${e.pageY-offsetY}px`
    setPosX(posX - contentRef.currentoffsetLeft)
    setPosX(posY - contentRef.currentoffsetTop)
  }
  function add(e) {
    // const el=e.target
    // offsetX=e.clientX-el.getBoundingClientRect().left
    // offsetY=e.clientY-el.getBoundingClientRect().top
    // el.addEventListener('mousemove',move)
  }
  function remove(e) {
    // const el=e.target
    // el.removeEventListener('mousemove',move)
  }

  return (
    <div style={{ top: posY, left: posX }} ref={contentRef} className="note">
      <div onMouseDown={add} onMouseUp={remove} className="navbar-note" id="navbar">
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
