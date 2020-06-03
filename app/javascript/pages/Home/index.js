import React, { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import Navbar from '../../components/Navbar'
import Note from '../../components/Note'
import OptionMenu from '../../components/OptionMenu'
import './style.scss'

export default function Home() {
  const [menu, setMenu] = useState('')
  const [notes, setNote] = useState([])
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)
  
  function createNote() {
    setNote([...notes, <Note title='Nota' description='alo gubitoso' positionX={positionX} positionY={positionY} />])
    setMenu(false)
    isMenuShowing(false)
  }

  function createList() {
    setNote([...notes, <Note title='Lista' description='alo gubitoso' positionX={positionX} positionY={positionY}/>])
    setMenu(false)
    isMenuShowing(false)
  }

  useEffect(() => {

  }, [notes])

  
  useEffect(() => {
    if (isMenuShowing)
      setMenu(<OptionMenu positionX={positionX} positionY={positionY} createNote={() => createNote()} createList={() => createList()}/>);
    else
      setMenu('');
  }, [isMenuShowing])

  useEffect(() => {
    setContentHeight(contentRef.current.clientHeight);
  }, [])

  function renderOptionMenu(event) {
    const posX = event.clientX
    const posY = event.clientY

    event.preventDefault();

    if (posX + 120 > screen.width)
      setPositionX(posX - 120)
    else
      setPositionX(posX);

    if (posY + 58 > contentHeight)
      setPositionY(posY - 58)
    else
      setPositionY(posY)
    
    setIsMenuShowing(true)
  }

  function hideOptionMenu(event) {
    const posX = event.clientX
    const posY = event.clientY
    event.preventDefault()
    
    if (event.button == 0 && (posX >= positionX && posX <= positionX + 120) && (posY >= positionY && posY <= positionY + 58))
      return

    if ((event.button == 2 || event.button == 0) && isMenuShowing)
      setIsMenuShowing(false)
  }

  return (
    <>
      <Navbar title="Environment name" />
      <div className="content" onContextMenu={renderOptionMenu} onMouseDown={hideOptionMenu} ref={contentRef}>
        {notes}
        {menu}
      </div>
    </>
  )
}
