import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/Navbar'
import Note from '../../components/Note'
import MenuOption from '../../components/MenuOption'
import './style.scss'

export default function Home() {
  const [menu, setMenu] = useState('');
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isMenuShowing)
      setMenu(<MenuOption positionX={positionX} positionY={positionY} />);
    else
      setMenu('');
  }, [isMenuShowing])

  useEffect(() => {
    setContentHeight(contentRef.current.clientHeight);
  }, [])

  function renderMenuOption(event) {
    const posX = event.clientX;
    const posY = event.clientY;

    event.preventDefault();

    if (posX + 150 > screen.width)
      setPositionX(posX - 150);
    else
      setPositionX(posX);

    if (posY + 60 > contentHeight)
      setPositionY(posY - 60);
    else
      setPositionY(posY);
    
    setIsMenuShowing(true);
  }

  function hideMenuOption(event) {
    event.preventDefault();

    if (event.button == 0 && isMenuShowing)
      setIsMenuShowing(false);
  }

  return (
    <>
      <Navbar title="Environment name" />
      <div className="content" onContextMenu={renderMenuOption} onMouseDown={hideMenuOption} ref={contentRef}>
        <Note title="Note title" description="Hi Gubitoso!!!" />
        {menu}
      </div>
    </>
  )
}
