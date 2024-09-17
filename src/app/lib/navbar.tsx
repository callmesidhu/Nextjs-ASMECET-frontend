import React from 'react'

type Props = {}

function Navbar (props: Props){
  return (
    <>
    <div className="flex fixed bg-slate-400 w-full items-center justify-between p-5">
      <div>
        Logo
      </div>
      <div className="flex flex-row gap-16">
        <p>Home</p>
        <p>Achievements</p>
        <p>Team</p>
        <p>Contact</p>
      </div>
    </div>
    </>
  )
}

export default Navbar