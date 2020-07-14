import React, { useState, useEffect, useRef } from "react"
import Navbar from '../../components/Navbar'
import NoteStructure from '../../components/NoteStructure'
import OptionMenu from '../../components/OptionMenu'
import { Environments, Notes, Tasks } from '../../services'
import './style.scss'

export default function Main() {
  const [currentEnvironmentID, setCurrentEnvironmentID] = useState(0)
  const [environmentList, setEnvironmentList] = useState([])
  const [optionMenu, setOptionMenu] = useState([])
  const [notes, setNotes] = useState([])
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    async function loadEnvironments() {
      const response = await Environments.index()

      if (response.data.environments.length === 0) {
        const newEnvironmentResponse = await Environments.create()
        setEnvironmentList([newEnvironmentResponse.data.message])
      }
      else {
        setEnvironmentList(response.data.environments)
      }
    }

    loadEnvironments()
  }, [])

  useEffect(() => {
    setContentHeight(contentRef.current.clientHeight)
  }, [])

  useEffect(() => {
    if (isMenuShowing) {
      contentRef.current.onmousedown = (event) => hideOptionMenu(event)
      setOptionMenu([
        {
          positionX: positionX,
          positionY: positionY,
          links: [
            {
              description: 'Add new note',
              function: () => createNote()
            },
            {
              description: 'Add new list',
              function: () => createList()
            }
          ]
        }
      ])
    }
    else {
      setOptionMenu([])
      contentRef.current.onmousedown = null
    }
  }, [isMenuShowing])

  async function fetchEnvironmentContent(id) {
    setCurrentEnvironmentID(id)
    const response = await Environments.show(id)
    setNotes(response.data.notes)
    setTasks(response.data.task_lists)
    setUsers(response.data.users)
  }

  async function createNote() {
    const params = {
      note: {
        positionX: positionX / window.innerWidth,
        positionY: positionY / window.innerHeight,
      }
    }

    const response = await Notes.create(currentEnvironmentID, params)

    setNotes([...notes, response.data.message])
    setOptionMenu(false)
    setIsMenuShowing(false)
  }

  async function createList() {
    const params = {
      task_list: {
        positionX: positionX / window.innerWidth,
        positionY: positionY / window.innerHeight,
      }
    }

    const response = await Tasks.create(currentEnvironmentID, params)

    setTasks([...tasks, response.data.message])
    setOptionMenu(false)
    setIsMenuShowing(false)
  }
  
  function renderOptionMenu(event) {
    const posX = event.clientX
    const posY = event.clientY
    event.preventDefault()

    if (posX + 120 > screen.width)
      setPositionX(posX - 120)
    else
      setPositionX(posX)

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
      <Navbar
        users={users}
        environmentList={environmentList} 
        fetchEnvironmentContent={fetchEnvironmentContent}
      />
      <div className="content" onContextMenu={renderOptionMenu} ref={contentRef}>
        {notes.length === 0 && tasks.length === 0 &&
          <div className="without-content">
            <p>Right click to create a note or task list!</p>
          </div>
        }
        {(notes.length > 0 || tasks.length > 0) && 
          <div>
            {notes.length > 0 && notes.map(note =>
              <NoteStructure
                key={note.id}
                id={note.id}
                title={note.title} 
                description={note.description} 
                isTask={false} 
                environment_id={currentEnvironmentID}
                positionX={note.positionX} 
                positionY={note.positionY}
                width={note.width}
                height={note.height}
                minimized={note.minimized}
                fetchEnvironmentContent={fetchEnvironmentContent}
              />
            )}
            {tasks.length > 0 && tasks.map(task =>
              <NoteStructure
                key={task.id}
                id={task.id}
                title={task.title} 
                isTask={true}
                environment_id={currentEnvironmentID}
                positionX={task.positionX} 
                positionY={task.positionY}
                width={task.width}
                height={task.height}
                minimized={task.minimized}
                fetchEnvironmentContent={fetchEnvironmentContent}
              />
            )}
          </div>
        }
        {optionMenu.length > 0 && optionMenu.map(menu =>
          <OptionMenu
            key={1}
            positionX={menu.positionX} 
            positionY={menu.positionY} 
            links={menu.links}
          />
        )}
      </div>
    </>
  )
}
