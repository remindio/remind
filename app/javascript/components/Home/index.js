import React from "react";
import Navbar from '../Navbar/'
import Note from '../Note/'

export default function Home() {
  return (
    <>
      <Navbar title="Environment name" />
      <div className="content">
        <Note title="Note title" description="Hi Gubitoso!!!" />
      </div>
    </>
  )
}
