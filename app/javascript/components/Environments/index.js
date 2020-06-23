import React, { useState, useEffect } from 'react'
import { Environments as Environment } from '../../services/index'
import { BsFillPersonFill } from 'react-icons/bs';
import './style.scss'

export default function Environments(props) {
  const [environmentList, setEnvironmentList] = useState([])
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState(0)
  const [users, setUsers] = useState([])
  const [owner, setOwner] = useState([])

  useEffect(() => {
    async function loadEnvironments() {
      const response = await Environment.index()
      setEnvironmentList(response.data.environments)
      setSelectedEnvironmentId(response.data.environments[0].id)
    }
    loadEnvironments()
  }, [])

  useEffect(() => {
    async function fetchEnvironmentContent() {
      if (environmentList.length > 0) {
        const response = await Environment.show(selectedEnvironmentId)
        setUsers(response.data.users)
        const selectedEnvironmentIndex = environmentList.findIndex(environment => environment.id == selectedEnvironmentId)

        const owner = [environmentList[selectedEnvironmentIndex].created_by_name, environmentList[selectedEnvironmentIndex].created_by]
        setOwner(owner)
      }
    }
    fetchEnvironmentContent()
  }, [selectedEnvironmentId])

  return(
    <div className="environments-container">
      <div className="environments-inner-container">
        <div className="environments-list">
          <ul>
            {environmentList.length > 0 && environmentList.map(environment => 
              <li 
                key={environment.id} 
                id={environment.id} 
                className={environment.id == selectedEnvironmentId ? 'styled' : ''}
                onClick={(event) => setSelectedEnvironmentId(event.target.id)}
                >{environment.name}
              </li>
            )}
          </ul>
        </div>
        <div className="environments-content">
          <div className="description">
            <p>Owner: {owner && owner[0]}</p>
            <p>Shared with: ({users.length > 0 ? users.length - 1 : 0})</p>
          </div>
          <div className="content-users">
            {users && users.map(user => {
              if (user.id == props.userId) 
                return null
              return (
                <div key={user.id}className="users">
                  <div>
                    { user.avatar ? 
                      <img src={`http://localhost:3000${user.avatar}`} alt=""/> : <BsFillPersonFill id="user-photo" /> 
                    }
                  </div>
                  <p>{user.name}</p>
                  <a href="#">Remove</a>
                </div>
              )}
            )}
          </div>
          <div className="options">
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}