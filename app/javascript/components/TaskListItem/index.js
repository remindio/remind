import React, { useState } from 'react'
import api, { apiUrl } from '../../services/api'
import { TiDeleteOutline } from 'react-icons/ti'
import './style.scss'

export default function TaskListItem(props) {
  const [description, setDescription] = useState(props.description)

  async function handleIsCompleted(event) {
    const { checked } = event.target
    const url = `${apiUrl}/environment/${props.environment_id}/task_list/${props.task_id}/task_list_item/${props.id}`
    await api.put(url, {
      task_list_item: {
        "task_completed?": checked
      }
    })
  }

  async function handleDeleteTaskItem() {
    const url = `${apiUrl}/environment/${props.environment_id}/task_list/${props.task_id}/task_list_item/${props.id}`
    await api.delete(url)
    props.fetchEnvironmentContent(props.environment_id)
  }

  return (
    <div className="container-item">
      <div>
        <input type="checkbox" defaultChecked={props.taskCompleted} onClick={handleIsCompleted} />
        <p
          onChange={(e) => setDescription(e.target.value)}>
            {description}
        </p>
      </div>

      <div className="delete-icon">
        <TiDeleteOutline size={20} style={{ opacity: 0.5, cursor: 'pointer' }} onClick={handleDeleteTaskItem} />
      </div>
      
    </div>
   
  )
}