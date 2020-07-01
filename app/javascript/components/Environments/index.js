import React, { useState, useEffect } from 'react'
import { Environments as Environment, UserEnvironment } from '../../services/index'
import { BsFillPersonFill } from 'react-icons/bs';
import './style.scss'

export default function Environments(props) {
  const [environmentList, setEnvironmentList] = useState([])
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState(0)
  const [users, setUsers] = useState([])
  const [owner, setOwner] = useState([])

  useEffect(() => {
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

  async function loadEnvironments(index = 0) {
    const response = await Environment.index()
    setEnvironmentList(response.data.environments)
    setSelectedEnvironmentId(response.data.environments[index].id)
  }

  async function handleDeleteEnvironment() {
    const confirmation = confirm('Are you sure?')

    if (confirmation) {
      const index = environmentList.findIndex(environment => environment.id == selectedEnvironmentId)
      await Environment.delete(selectedEnvironmentId)

      if (index > 0)
        loadEnvironments(index - 1)
      else
        loadEnvironments() 
    }
  }

  async function inviteUser() {
    const userEmail = prompt('Write an email: ')

    if (userEmail) {
      const params = {
        user: {
          email: userEmail
        }
      }
  
      // send an email in the future
      const response = await UserEnvironment.create(selectedEnvironmentId, params)
  
      if (response.data.status === "success") {
        setUsers([...users, response.data.message])
      }
      else {
        alert(response.data.message)
      }
    }
  }

  async function removeUser(userId) {
    await UserEnvironment.delete(selectedEnvironmentId, userId)
    setUsers(users.filter(user => user.id != userId))
  }

  return(
    <div className="environments-container">
      <div className="environments-inner-container">
        <div className="environments-list">
          <ul>
            {environmentList.length > 0 && environmentList.map(environment => 
              <li key={environment.id} className={environment.id == selectedEnvironmentId ? 'styled' : ''}>
                  <p 
                    id={environment.id} 
                    onClick={(event) => setSelectedEnvironmentId(event.target.id)}>
                      {environment.name}
                  </p>
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
                <div key={user.id} className="users">
                  <div>
                    { user.avatar ? 
                      <img src={`${user.avatar}`} alt=""/> : <BsFillPersonFill id="user-photo" /> 
                    }
                  </div>
                  <p>{user.name}</p>
                  {props.userId == owner[1] && <button onClick={() => removeUser(user.id)}>Remove</button>}
                </div>
              )}
            )}
          </div>
          <div className="options">
            <button 
              className="invite-button"
              onClick={inviteUser}>
                Invite
            </button>
            <button 
              className="delete-button" 
              onClick={handleDeleteEnvironment}>
                {props.userId == owner[1] ? "Delete" : "Leave"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}