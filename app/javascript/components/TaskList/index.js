import React, { useState, useEffect, useRef } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { TaskItems } from '../../services/'
import './style.scss'

export default function TaskList(props) {
  const [items, setItems] = useState([])
  const descriptionRef = useRef(null)

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {

  }, [items])

  async function getItems() {
    const response = await TaskItems.index(props.environment_id, props.id)
    setItems(response.data.task_list_items)
  }

  async function handleCreateTaskItem() {
    const response = await TaskItems.create(props.environment_id, props.id)
    const newItem = response.data.message
    setItems([...items, newItem])
    document.getElementById(newItem.id).focus()
  }

  async function handleDeleteTaskItem(id) {
    const index = items.findIndex(item => item.id === id)
    await TaskItems.delete(props.environment_id, props.id, id)
    getItems()

    if (index > 0) {
      const itemId = items[index - 1].id
      const textLength = document.getElementById(itemId).innerHTML.length

      document.getElementById(itemId).onfocus = (event) => {
        event.target.selectionStart = textLength
        event.target.selectionEnd = textLength
      }
      
      document.getElementById(itemId).focus()
      document.getElementById(itemId).onfocus = null
    }
  }

  async function handleIsCompleted(event, id) {
    const { checked } = event.target
    const params = {
      task_list_item: {
        "task_completed?": checked
      }
    }

    await TaskItems.update(props.environment_id, props.id, id, params)
  }

  async function handleDescriptionUpdate(event, id) {
    const newDescription = event.target.textContent
    setItems(items.map(item => item.id === id ? { ...item, description: newDescription } : item))

    const params = {
      task_list_item: {
        description: newDescription
      }
    }

    await TaskItems.update(props.environment_id, props.id, id, params)

    props.mainRef.current.onclick = null
  }


  function unfocusEditable(ref) {
    props.mainRef.current.onclick = (event) => {
      if (ref.current.id !== event.target.id)
        props.unfocusTarget(ref)
    }
  }

  function handleEditableKeyPress(event, id) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      handleCreateTaskItem()
    }
    else if (event.keyCode === 8 && event.target.textContent === '') {
      handleDeleteTaskItem(id)
    }
  }

  return (
    <>
      {items.map(item =>
        <div key={item.id} className="container-item">
          <div className="left-container-item">
            <input type="checkbox" defaultChecked={item.task_completed} onClick={(event) => handleIsCompleted(event, item.id)} />
            <p
              id={item.id}
              ref={descriptionRef}
              spellCheck={false}
              contentEditable={true}
              value={item.description}
              placeholder="Task item"
              suppressContentEditableWarning={true} 
              onBlur={(event) => handleDescriptionUpdate(event, item.id)}
              onFocus={() => unfocusEditable(descriptionRef)}
              onKeyDown={(event) => handleEditableKeyPress(event, item.id)}>
                {item.description}
            </p>
          </div>
          <div className="delete-icon">
            <TiDeleteOutline 
              size={18} 
              style={{ opacity: 0.5, cursor: 'pointer' }} 
              onClick={() => handleDeleteTaskItem(item.id)} 
            />
          </div>
        </div>
      )}
    </>
  )
}
