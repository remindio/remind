import React from 'react'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'
import ShareEnvironment from './ShareEnvironment'

import './style.scss'


export default function Popup(props) {
  
  return (
    <div className="outter-popup-container">
      <div className="popup-container">
        <div className="popup-container-title">
          <h1>{props.title}</h1>
        </div>
        <div className="popup-content">
          { props.type === 'change-password' && 
            <ChangePassword 
              onConfirm={props.onConfirm} 
              onCancel={props.onCancel} 
            /> 
          }
          { props.type === 'delete-account' && 
            <DeleteAccount 
              title={props.title} 
              message={props.message} 
              onConfirm={props.onConfirm} 
              onCancel={props.onCancel} 
            /> 
          }
          { props.type === 'share-environment' && 
            <ShareEnvironment 
              users={props.users} 
              onConfirm={props.onConfirm} 
              onCancel={props.onCancel} 
            /> 
          }
        </div>
      </div>
    </div>
  )
}