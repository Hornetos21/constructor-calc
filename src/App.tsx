import Components from './components/Components'
import Constructor from './components/Constructor'
import { useState } from 'react'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

function App() {
  const [copied, setCopy] = useState([])
  const [activeComp, setActiveComp] = useState(null)

  const handleDragStart = (e: DragStartEvent) => {
    setActiveComp(e.active.data.current)
    console.log('DStart ', e)
  }
  const handleDragEnd = (e: DragEndEvent) => {
    console.log('DEnd ', e)
    setActiveComp(null)
  }
  console.log('ActComp ', activeComp)
  return (
    <>
      <Components
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        activeComp={activeComp}
      />
      <Constructor />
    </>
  )
}

export default App
