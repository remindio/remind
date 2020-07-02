import React, { useState } from 'react'
import './style.scss'

export default function ChangePassword(props) {
  const [formData, setFormData] = useState({ current_password: '', password: '', password_confirmation: '' })

  function handleSubmit() {
    const params = {
      user: formData
    }

    props.onConfirm(params)
  }

  return (
    <>
      <form className="change-password-form">
        <input 
          onChange={(event) => { setFormData({...formData, current_password: event.target.value }) }} 
          placeholder="Current password" 
          value={formData.current_password} 
          type="password"
        />
        <input 
          onChange={(event) => { setFormData({...formData, password: event.target.value }) }} 
          placeholder="New password" 
          value={formData.password} 
          type="password"
        />
        <input 
          onChange={(event) => { setFormData({...formData, password_confirmation: event.target.value }) }} 
          placeholder="Confirm new password" 
          value={formData.password_confirmation} 
          type="password"
        />
      </form>
      <div className="change-password-buttons">
        <button onClick={props.onCancel} className="cancel-button">Cancel</button>
        <button  onClick={handleSubmit} className="confirm-button">Confirm</button>
      </div>
    </>
  )
}