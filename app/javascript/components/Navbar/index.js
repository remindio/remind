import React, { useState, useEffect } from 'react'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight } from 'react-icons/bs'
import './style.scss'

export default function Navbar(props) {
  const [currentEnvironment, setCurrentEnvironment] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState('')
  const [environmentList, setEnvironmentList] = useState([])
  
  useEffect(() => {
    setEnvironmentList(props.environmentList)
  }, [props.environmentList])

  useEffect(() => {
    setCurrentEnvironment(props.currentEnvironment)
    setSelectedEnvironment(props.currentEnvironment)
  }, [props.currentEnvironment])

  useEffect(() => {
    const environment = environmentList.find(environment => environment.name === currentEnvironment)
    
    if (environment !== undefined)
      props.fetchEnvironment(environment.id)
  }, [selectedEnvironment])

  function handleSelectEnvironment(event) {
    const environment = event.target.innerText

    if (currentEnvironment !== environment) {
      setCurrentEnvironment(environment)
      setSelectedEnvironment(environment)
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <BsChevronDoubleRight size={24} style={{ color: "#FFFFFF" }} />
        <div className="container-environments">
          <h1>{selectedEnvironment}</h1>
          <ul>
            {environmentList.map(environment => (
              <li key={environment.id} onClick={handleSelectEnvironment}>{environment.name}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <RiSettings2Line size={24} style={{ color: "#FFFFFF" }} />
    </div>
  )
}
