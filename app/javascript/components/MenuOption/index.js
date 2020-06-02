import React/*, { useState, useEffect, useRef }*/ from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

export default function MenuOption(props) {
  /*const containerRef = useRef(null);
  const [positionX, setPositionX] = useState(containerRef.current.clientWidth);
  const [positionY, setPositionY] = useState(containerRef.current.clientHeight);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    if (props.positionX + containerWidth > props.screenWidth)
      setPositionX(props.positionX - containerWidth);
    else
      setPositionX(props.positionX);

    if (props.positionY + containerHeight > props.screenHeight)
      setPositionY(props.positionY - containerHeight);
    else
      setPositionY(props.positionY);
  }, [])*/

  return (
    <div className="container-menu" style={{ top: props.positionY, left: props.positionX }} /*ref={containerRef}*/>
      <div className="content-menu">
        <Link className="content-menu-links">Add new note</Link>
        <Link className="content-menu-links">Add new list</Link>
      </div>
    </div>
  );
}
