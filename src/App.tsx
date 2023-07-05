import DragArea from './components/DragArea'
import Switcher from './components/Switcher'
import DropArea from './components/DropArea'
import React, { useState } from 'react'

function App() {
  const [active, setActive] = useState({ runtime: false, constructor: true })

  const handleClick = (e: React.MouseEvent) => {
    console.log('click to', e.target.innerText)
  }

  return (
    <>
      <Switcher active={active} setActive={setActive} />
      <DragArea />
      <DropArea handleClick={handleClick} active={active.runtime} />
    </>
  )
}

export default App
