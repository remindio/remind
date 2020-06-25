import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Environments } from '../../services'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight, BsChevronDoubleLeft, BsFillPersonFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import './style.scss'

export default function Navbar(props) {
  const [environmentList, setEnvironmentList] = useState([])
  const [selectedEnvironmentID, setSelectedEnvironmentID] = useState(0)
  const [selectedEnvironment, setSelectedEnvironment] = useState({ name: '' })
  const [isSideBarShowing, setIsSideBarShowing] = useState(false)
  const environmentNameRef = useRef(null)
  
  useEffect(() => {
    setEnvironmentList(props.environmentList)
    setSelectedEnvironment(props.environmentList[0])
  }, [props.environmentList])

  useEffect(() => {
    if (selectedEnvironment !== undefined) {
      if (selectedEnvironment.id !== selectedEnvironmentID)
        setSelectedEnvironmentID(selectedEnvironment.id)
    }
  }, [selectedEnvironment])

  useEffect(() => {
    if (selectedEnvironmentID)
      props.fetchEnvironmentContent(selectedEnvironmentID)
  }, [selectedEnvironmentID])

  function handleSelectEnvironment(event) {
    const id = event.target.id
    const environmentSelected = environmentList.find(environment => environment.id == id)
    setSelectedEnvironment(environmentSelected)
  }

  async function handleNewEnvironment() {
    const response = await Environments.create()
    setEnvironmentList([...environmentList, response.data.message])
    setSelectedEnvironment(response.data.message)
  }

  async function handleNameUpdate(event) {
    const newEnvironmentName = event.target.textContent

    setSelectedEnvironment({...selectedEnvironment, name: newEnvironmentName})

    const params = {
      environment: {
        name: newEnvironmentName
      }
    }

    const response = await Environments.update(selectedEnvironment.id, params)

    if (response.data.status === "success") {
      const newEnvironmentList = environmentList.map(environment => {
        if (environment.id === selectedEnvironment.id)
          return { ...environment, name: newEnvironmentName }
        
        return environment
      })

      setEnvironmentList(newEnvironmentList)
    }

    props.mainRef.current.onclick = null
  }

  function unfocusEditable() {
    props.mainRef.current.onclick = () => props.unfocusTarget(environmentNameRef)
  }

  return (
    <nav className="navbar">
      { isSideBarShowing && 
      <div className="sidebar-container">
        <div className="sidebar-users">
          {props.users.map(user => {
            return (
              <div key={user.id} id={user.id} className="user">
                <div>
                  { user.avatar ?
                      <img title={user.name} src={`${user.avatar}`} alt={user.name}/> : <BsFillPersonFill title={user.name} id="user-photo" />                   
                  }
                  { props.users.length === 1 &&
                    <p>{user.name}</p>
                  }
                </div>
              </div>
              
            )}
          )}
        </div>
        <div className="sidebar-icon">
          <BsChevronDoubleLeft onClick={() => setIsSideBarShowing(!isSideBarShowing)} size={24} style={{ color: "#FFFFFF", cursor: "pointer" }}/>
        </div>
      </div>
      }
      <div className="navbar-container">
        <div className="navbar-container-left">
          { !isSideBarShowing && 
            <BsChevronDoubleRight onClick={() => setIsSideBarShowing(!isSideBarShowing)} size={24} style={{ color: "#FFFFFF", cursor: "pointer", marginRight: "25px", marginLeft: "16px" }}/>
          }
          <div className="container-environments" style={{  }}>
            <h1
              ref={environmentNameRef}
              spellCheck={false}
              contentEditable={true}
              placeholder="Environment name"
              suppressContentEditableWarning={true} 
              onBlur={handleNameUpdate}
              onFocus={unfocusEditable}
              onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
              >{selectedEnvironment ? selectedEnvironment.name : ''}
            </h1>
            <ul>
              {environmentList.length > 0 && environmentList.map(environment => {
                if (environment.id === selectedEnvironment.id)
                  return null

                return (
                  <li  
                    placeholder="Environment name"
                    key={environment.id} 
                    onClick={handleSelectEnvironment} 
                    id={environment.id}>
                    {environment.name}
                  </li>
                )
              })}
                <li onClick={handleNewEnvironment} className="new-environment">
                  <IoMdAddCircleOutline size={24} style ={{ color: "#FFFFFF", marginRight: "5px" }} />
                  Create new environment
                </li>
            </ul>
          </div>
        </div>
        <Link to='/profile'><RiSettings2Line size={24} style={{ color: "#FFFFFF", cursor: "pointer" }} /></Link>
      </div>
    </nav>
  )
}
