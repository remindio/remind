import React from 'react'
import './style.scss'

export default function DeleteAccount(props) {
  return (
    <>
      <p className="delete-account-description">Are you sure? If you delete your account you won’t be able to reactivate it later and all your data will be deleted!</p>
      <div className="delete-account-buttons">
        <button onClick={props.onCancel} className="cancel-button">Cancel</button>
        <button onClick={props.onConfirm} className="delete-button">Delete</button>
      </div>
    </>
  )
}