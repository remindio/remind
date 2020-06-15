import React, { useState, useEffect } from 'react'
import TaskListItem from '../TaskListItem/'
import { TaskItems } from '../../services/'

export default function TaskList(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    const response = await TaskItems.index(props.environment_id, props.id)
    setItems(response.data.task_list_items)
  }

  return (
    <>
      { items.map(item =>
        <TaskListItem 
          key={item.id}
          id={item.id}
          description={item.description}
          taskCompleted={item.task_completed}
          task_id={props.id}
          mainRef={props.mainRef}
          unfocusEditable={props.unfocusEditable}
          environment_id={props.environment_id}
          getItems={getItems}
        />
      )}
    </>
  )
}