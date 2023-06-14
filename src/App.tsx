import Components from './components/Components'
import Constructor from './components/Constructor'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Display from './components/Display'
import Operators from './components/Operators'
import Digits from './components/Digits'
import Equally from './components/Equally'

const components = [
  { id: '1', name: 'display', comp: <Display /> },
  { id: '2', name: 'operators', comp: <Operators /> },
  { id: '3', name: 'digits', comp: <Digits /> },
  { id: '4', name: 'equally', comp: <Equally /> },
]

function App() {
  const [data, setData] = useState({ [nanoid()]: [] })
  const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination)

    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const item = sourceClone[droppableSource.index]

    destClone.splice(droppableDestination.index, 0, { ...item, id: nanoid() })
    return destClone
  }

  function onDragStart(e) {
    e.mode = 'SNAP'
    console.log(e)
  }

  function handleOnDragEnd(res) {
    const { source, destination } = res
    res.mode = 'SNAP'
    console.log(res)
    if (!destination) {
      return
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={onDragStart} on>
      <Components />
      <Constructor />
    </DragDropContext>
  )
}

export default App
