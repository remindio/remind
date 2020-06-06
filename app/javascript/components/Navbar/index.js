import React, { useState, useEffect } from 'react'
import { RiSettings2Line } from 'react-icons/ri'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import './style.scss'

export default function Navbar(props) {
  const [currentEnvironment, setCurrentEnvironment] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState('')
  const [environmentList, setEnvironmentList] = useState([])
  const [filteredEnvironmentList, setFilteredEnvironmentList] = useState([])
  
  useEffect(() => {
    setEnvironmentList(props.environmentList)
    const environments = props.environmentList.filter(environment => environment.name !== currentEnvironment)
    setFilteredEnvironmentList(environments)
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
    const environmentSelected = event.target.innerText

    setFilteredEnvironmentList(environmentList.filter(environment => environment.name !== environmentSelected))
    setCurrentEnvironment(environmentSelected)
    setSelectedEnvironment(environmentSelected)
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <BsChevronDoubleRight size={24} style={{ color: "#FFFFFF", cursor: "pointer" }}/>
        <div className="container-environments">
          <h1>{selectedEnvironment}</h1>
          <ul>
            {filteredEnvironmentList.length > 0 && filteredEnvironmentList.map(environment => (
              <li key={environment.id} onClick={handleSelectEnvironment}>{environment.name}</li>
              
            ))}
              <li className="new-environment"><IoMdAddCircleOutline size={24} style ={{ color: "#FFFFFF", marginRight: "5px"}}/>Create new environment</li>
          </ul>
        </div>
      </div>
      
      <RiSettings2Line size={24} style={{ color: "#FFFFFF" }} />
    </div>
  )
}
