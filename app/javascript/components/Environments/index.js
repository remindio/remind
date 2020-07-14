import React, { useState, useEffect } from 'react'
import { Environments as Environment, UserEnvironment } from '../../services/index'
import { BsFillPersonFill } from 'react-icons/bs';
import Popup from '../Popup'
import './style.scss'

export default function Environments(props) {
  const [environmentList, setEnvironmentList] = useState([])
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState(0)
  const [users, setUsers] = useState([])
  const [owner, setOwner] = useState([])
  const [isPopupShowing, setIsPopupShowing] = useState('')

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
    if (response.data.environments.length > 0) {
      setEnvironmentList(response.data.environments)
      setSelectedEnvironmentId(response.data.environments[index].id)
    }
  }

  async function handleDeleteEnvironment() {
    const index = environmentList.findIndex(environment => environment.id == selectedEnvironmentId)
    await Environment.delete(selectedEnvironmentId)

    if (index > 0)
      loadEnvironments(index - 1)
    else
      loadEnvironments() 
    
    setIsPopupShowing('')
  }

  async function inviteUser(params) {
    // send an email in the future
    const response = await UserEnvironment.create(selectedEnvironmentId, params)
    let invalidUsers = []
  
    if (response.data.status === "success") {
      const currentUsers = users
      const validUsers = response.data.message.filter(user => user.id != 0)
      const newUsers = currentUsers.concat(validUsers)

      invalidUsers = response.data.message.filter(user => user.id == 0)

      setUsers(newUsers)
    }
    else {
      alert(response.data.message)
    }

    setIsPopupShowing('')

    if (invalidUsers && invalidUsers.length !== 0) {
      const invalidEmails = invalidUsers.map(user => user.email).join(', ')
      alert(`${invalidEmails} not found!`)
    }
  }

  async function removeUser(userId) {
    await UserEnvironment.delete(selectedEnvironmentId, userId)
    setUsers(users.filter(user => user.id != userId))
  }

  return(
    <div className="environments-container">
      <div className="environments-inner-container">
        {environmentList.length === 0 && 
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p 
              style={{ alignSelf: 'center', color: '#303030', fontSize: 20, marginBottom: 5 }}>
              You don't own or are not part of any environment :(
            </p>
            <p 
              style={{ alignSelf: 'center', color: '#666', fontSize: 18 }}>
              Create one by simply returning to the main page!
            </p>
          </div>
        }
        {environmentList.length > 0 &&
          <>
            <div className="environments-list-content">
              <div className="environments-list">
                <ul>
                  {environmentList.length > 0 && environmentList.map(environment => 
                    <li key={environment.id} className={environment.id == selectedEnvironmentId ? 'styled' : ''}>
                        <p 
                          placeholder="Environment Name"
                          id={environment.id} 
                          onClick={(event) => setSelectedEnvironmentId(event.target.id)}>
                            {environment.name}
                        </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="environments-content">
              <div className="environments-upper-content">
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
                        <div className="user-avatar-background">
                          { user.avatar ? 
                            <img src={`${user.avatar}`} alt=""/> : <BsFillPersonFill id="user-photo" /> 
                          }
                        </div>
                        <div className="user-name">
                          <p>{user.name}</p>
                        </div>
                        {props.userId == owner[1] && <button onClick={() => removeUser(user.id)}>Remove</button>}
                      </div>
                    )}
                  )}
                </div>
              </div>
              <div className="options">
                <button 
                  className="delete-button" 
                  onClick={() => {
                    const environment = environmentList.filter(environment => environment.id == selectedEnvironmentId)
                    let title, message

                    if (props.userId == owner[1]) {
                      title = `Delete ${environment[0].name}`
                      message = `Are you sure? If you delete ${environment[0].name} you won’t be able to recover it later and all its data will be deleted!`
                    }
                    else {
                      title = `Leave ${environment[0].name}`
                      message = `Are you sure you want to leave ${environment[0].name}?`
                    }
                    setIsPopupShowing(
                      <Popup 
                        title={title}
                        message={message}
                        type="delete-account"
                        users={users}
                        onConfirm={handleDeleteEnvironment} 
                        onCancel={() => setIsPopupShowing('')}
                      />
                    )
                  }}>
                    {props.userId == owner[1] ? "Delete" : "Leave"}
                </button>
                <button 
                  className="invite-button"
                  onClick={() => {
                    const environment = environmentList.filter(environment => environment.id == selectedEnvironmentId)
                    setIsPopupShowing(
                      <Popup 
                        title={`Share ${environment[0].name}`} 
                        type="share-environment"
                        users={users}
                        onConfirm={inviteUser} 
                        onCancel={() => setIsPopupShowing('')}
                      />
                    )}}>
                    Invite
                </button>
              </div>
            </div>
          </>
        }
      </div>
      { isPopupShowing }
    </div>
  )
}
