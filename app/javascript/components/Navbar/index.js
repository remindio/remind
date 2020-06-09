import React, { useState, useEffect } from 'react'
import api, { apiUrl } from '../../services/api'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import './style.scss'

export default function Navbar(props) {
  const [environmentList, setEnvironmentList] = useState([])
  const [filteredEnvironmentList, setFilteredEnvironmentList] = useState([])
  const [selectedEnvironmentID, setSelectedEnvironmentID] = useState(0)
  const [selectedEnvironment, setSelectedEnvironment] = useState({ name: '' })
  
  useEffect(() => {
    setEnvironmentList(props.environmentList)
    setSelectedEnvironment(props.environmentList[0])
  }, [props.environmentList])

  useEffect(() => {
    if (selectedEnvironment !== undefined) {
      setFilteredEnvironmentList(environmentList.filter(environment => environment.id !== selectedEnvironment.id))

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
    const response = await api.post(`${apiUrl}/environment/`)
    setEnvironmentList([...environmentList, response.data.message])
    setSelectedEnvironment(response.data.message)
  }

  async function handleNameUpdate(event) {
    const newEnvironmentName = event.target.value
    setSelectedEnvironment({...selectedEnvironment, name: newEnvironmentName})

    const response = await api.put(`${apiUrl}/environment/${selectedEnvironment.id}`, {
      environment: {
        name: newEnvironmentName
      }
    })

    if (response.data.status === "success") {
      setEnvironmentList(environmentList.map(environment => {
        if (environment.id === selectedEnvironment.id)
          return { ...environment, name: newEnvironmentName }
        
        return environment
      }))
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <BsChevronDoubleRight size={24} style={{ color: "#FFFFFF", cursor: "pointer" }}/>
        <div className="container-environments">
          <input onChange={handleNameUpdate} type="text" value={selectedEnvironment ? selectedEnvironment.name : ''}/>
          <ul>
            {filteredEnvironmentList.length > 0 && filteredEnvironmentList.map(environment => (
              <li key={environment.id} onClick={handleSelectEnvironment} id={environment.id}>{environment.name}</li>
              
            ))}
              <li onClick={handleNewEnvironment} className="new-environment">
                <IoMdAddCircleOutline size={24} style ={{ color: "#FFFFFF", marginRight: "5px"}} />
                Create new environment
              </li>
          </ul>
        </div>
      </div>
      
      <RiSettings2Line size={24} style={{ color: "#FFFFFF", cursor: "pointer" }} />
    </div>
  )
}
