import React from 'react'
import './style.scss'

export default function Account() {
  return(
    <div className="account-container">
      <div className="account-inner-container">
        <div className="account-content">
          <div className="account-items">
            <p>Email:</p>
            <p>Company name:</p>
            <p>Occupation:</p>
          </div>
          <div className="account-values">
            <p spellCheck={false} suppressContentEditableWarning={true} contentEditable={true}>erick.rodrigues.santana14@gmail.com</p>
            <p spellCheck={false} suppressContentEditableWarning={true} contentEditable={true}>Facebook</p>
            <p spellCheck={false} suppressContentEditableWarning={true} contentEditable={true}>Software Engineer</p>
          </div>
        </div>
        <a href="#">Change password</a>
        <button>Delete account</button>
      </div>
    </div>
  )
}
