import React from 'react'
import './style.scss'

export default function Delete(props) {
  return (
    <>
      {props.isDelete && props.isDeleteAccount && 
        <p className="delete-account-description">{props.message}</p>
      }
      {props.isDelete && !props.isDeleteAccount && 
        <p className="delete-account-description">{`Are you sure? If you delete ${props.environmentName} you won’t be able to recover it later and all its data will be deleted!`}</p>
      }
      {!props.isDelete && 
        <p className="leave-environment-description">{`Are you sure you want to leave ${props.environmentName}?`}</p>
      }
      
      <div className="delete-account-buttons">
        <button onClick={props.onCancel} className="cancel-button">Cancel</button>
        <button onClick={props.onConfirm} className="delete-button">{props.isDelete ? 'Delete' : 'Leave'}</button>
      </div>
    </>
  )
}