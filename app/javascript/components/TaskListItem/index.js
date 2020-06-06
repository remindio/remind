import React from 'react'
import './style.scss'

export default function TaskListItem(props) {
  return (
    <div className="container-item">
      <input type="checkbox" />
      <label htmlFor="" data-content={props.description}>{props.description}</label>
    </div>
   
  )
}