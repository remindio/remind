import React, { useState, useEffect, useRef } from 'react'
import { TaskItems } from '../../services'
import { TiDeleteOutline } from 'react-icons/ti'
import './style.scss'

export default function TaskListItem(props) {
  const [description, setDescription] = useState(props.description)
  const descriptionRef = useRef(null)

  useEffect(() => {
    if (description === '')
      descriptionRef.current.focus()
    
  }, [props.description])

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
    props.getItems()
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
    props.mainRef.current.onclick = (event) => {
      if (ref.current.id !== event.target.id)
        props.unfocusTarget(ref)
    }
  }

  function handleEditableKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      props.createTaskItem()
    }
    else if (event.keyCode === 8 && event.target.textContent === '') {
      props.deleteTaskItem(props.id)
    }
  }

  return (
    <div className="container-item">
      <div className="left-container-item">
        <input type="checkbox" defaultChecked={props.taskCompleted} onClick={handleIsCompleted} />
        <p
          ref={descriptionRef}
          spellCheck={false}
          contentEditable={true}
          placeholder="Task item"
          suppressContentEditableWarning={true} 
          onBlur={handleDescriptionUpdate}
          onFocus={() => unfocusEditable(descriptionRef)}
          onKeyDown={(event) => handleEditableKeyPress(event)}>
            {description}
        </p>
      </div>
      <div className="delete-icon">
        <TiDeleteOutline size={18} style={{ opacity: 0.5, cursor: 'pointer' }} onClick={handleDeleteTaskItem} />
      </div>
    </div>
   
  )
}
