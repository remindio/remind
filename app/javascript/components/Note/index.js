import React, { useRef, useState } from 'react'
import { Notes } from '../../services/'
import './style.scss'

export default function Note(props) {
  const [description, setDescription] = useState(props.description)
  const descriptionRef = useRef(null)

  async function handleDescriptionUpdate(event) {
    const newDescription = event.target.textContent
    setDescription(newDescription)

    const params = {
      note: {
        description: newDescription,
      }
    }
      
    await Notes.update(props.environment_id, props.id, params)
  }

  return (
    <p
      id="note-description"
      ref={descriptionRef}
      spellCheck={false}
      contentEditable={true}
      placeholder="Description"
      suppressContentEditableWarning={true} 
      onBlur={handleDescriptionUpdate}
      onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}>
      {description}
    </p>
  )
}
