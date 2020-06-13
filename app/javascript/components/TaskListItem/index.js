import React, { useState, useRef } from 'react'
import { TaskItems } from '../../services'
import { TiDeleteOutline } from 'react-icons/ti'
import './style.scss'

export default function TaskListItem(props) {
  const [description, setDescription] = useState(props.description)
  const descriptionRef = useRef(null)

  async function handleIsCompleted(event) {
    const { checked } = event.target
    const params = {
      task_list_item: {
        "task_completed?": checked
      }
    }

    await TaskItems.update(props.environment_id, props.task_id, props.id, params)
  }

  async function handleDeleteTaskItem() {
    await TaskItems.delete(props.environment_id, props.task_id, props.id)
    props.fetchEnvironmentContent(props.environment_id)
  }

  async function handleDescriptionUpdate(event) {
    const newDescription = event.target.textContent
    setDescription(newDescription)

    if (!props.isTask) {
      const params = {
        task_list_item: {
          description: newDescription
        }
      }

      await TaskItems.update(props.environment_id, props.task_id, props.id, params)
    }

    props.mainRef.current.onclick = null
  }


  function unfocusEditable(ref) {
    props.mainRef.current.onclick = () => props.unfocusTarget(ref)
  }

  return (
    <div className="container-item">
      <div>
        <input type="checkbox" defaultChecked={props.taskCompleted} onClick={handleIsCompleted} />
        <p
          ref={descriptionRef}
          spellCheck={false}
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          onBlur={handleDescriptionUpdate}
          onClick={() => unfocusEditable(descriptionRef)}
          onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}>
           {description}
        </p>
      </div>

      <div className="delete-icon">
        <TiDeleteOutline size={20} style={{ opacity: 0.5, cursor: 'pointer' }} onClick={handleDeleteTaskItem} />
      </div>
      
    </div>
   
  )
}
