import React, { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import './style.scss'

export default function ShareEnvironment(props) {
  const [usersEmail, setUsersEmail] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');

  function handleEnterPress(event) {
    const { keyCode } = event

    if (keyCode === 13) {
      console.log(props.users)
      const inputUser = props.users.find(user => user.email == currentEmail)

      if (inputUser)
        alert('This user is already in this environment')
      else
        setUsersEmail([...usersEmail, { email: currentEmail }])

      setCurrentEmail('')
    }
  }

  function removeEmail(email) {
    setUsersEmail(usersEmail.filter(user => user.email !== email))
  }

  function handleSubmit() {
    const params = {
      users: usersEmail
    }

    props.onConfirm(params)
  }

  return (
    <>
      <p className="share-environment-description">Write an email to invite someone and press ENTER</p>
      <input 
        className="share-environment-email" 
        type="email" 
        placeholder="Email"
        value={currentEmail}
        onChange={event => setCurrentEmail(event.target.value)}
        onKeyDown={handleEnterPress}
      />
      <div className="user-emails">
        {usersEmail.map(user => (
          <div key={user.email}>
            <p>{user.email}</p>
            <RiCloseLine 
              size={18} 
              style={{ color: '#FFF', cursor: 'pointer'}}
              onClick={() => removeEmail(user.email)}
            />
          </div>
        ))}
      </div>
      <div className="share-environment-buttons">
        <button onClick={props.onCancel} className="cancel-button">Cancel</button>
        <button onClick={handleSubmit} className="invite-button">Invite</button>
      </div>
    </>
  );
}
