import React, { useState, useEffect, useRef } from "react"
import Navbar from '../../components/Navbar'
import Note from '../../components/Note'
import OptionMenu from '../../components/OptionMenu'
import api, { apiUrl } from '../../services/api'
import './style.scss'

export default function Home() {
  const [currentEnvironmentName, setCurrentEnvironmentName] = useState('')
  const [environments, setEnvironments] = useState([])
  const [menu, setMenu] = useState('')
  const [notes, setNotes] = useState([])
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)

  async function fetchEnvironment() {
    const response = await api.get(apiUrl + 'environment')  
    setCurrentEnvironmentName(response.data.environments[0]['name'])
    setEnvironments(response.data.environments)
  }

  async function fetchEnvironmentContent() {
    const response = await api.get(apiUrl + 'environment/1')
    const renderNotes = response.data.notes.map(note =>
      <Note key={note.id} isTask={false} title={note.title} description={note.description} positionX={note.positionX} positionY={note.positionY}/>
    )
    const renderTasks = response.data.task_lists.map(task => 
      <Note key={task.id} isTask={true} title={task.title} items={task.task_list_items} positionX={task.positionX} positionY={task.positionY}/>
    )

    setNotes([renderNotes, renderTasks])
  }

  useEffect(() => {
    fetchEnvironment()
    fetchEnvironmentContent()
  }, [])
  
  function createNote() {
    setNotes([...notes, <Note title='Nota' isTask={false} description='' positionX={positionX} positionY={positionY} />])
    setMenu(false)
    isMenuShowing(false)
  }

  function createList() {
    setNotes([...notes, <Note title='Lista' isTask={true} items={[]} positionX={positionX} positionY={positionY}/>])
    setMenu(false)
    isMenuShowing(false)
  }
  
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
      <Navbar environmentList={environments} currentEnvironment={currentEnvironmentName}/>
      <div className="content" onContextMenu={renderOptionMenu} onMouseDown={hideOptionMenu} ref={contentRef}>
        {notes}
        {menu}
      </div>
    </>
  )
}
