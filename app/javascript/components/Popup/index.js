import React from 'react'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'

import './style.scss'
// import DeleteAccount from './DeleteAccount'


export default function Popup(props) {
  
  return (
    <div className="outter-popup-container">
      <div className="popup-container">
        <h1>{props.title}</h1>
        <div className="popup-content">
          { props.type === 'change-password' && <ChangePassword onConfirm={props.onConfirm} onCancel={props.onCancel}/> }
          { props.type === 'delete-account' && <DeleteAccount onConfirm={props.onConfirm} onCancel={props.onCancel}/> }
          { props.type === 'share-environment' && <ShareEnvironment/>}
        </div>
      </div>
    </div>
  )
}