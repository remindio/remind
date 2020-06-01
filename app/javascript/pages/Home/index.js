import React from "react";
import Navbar from '../../components/Navbar'
import Note from '../../components/Note'


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
