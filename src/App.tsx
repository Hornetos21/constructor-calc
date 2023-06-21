import Components from './components/Components'
import Constructor from './components/Constructor'
import { useState } from 'react'
import { Data, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import ComponentOverlay from './components/ComponentOverlay'
import Display from './components/Display'
import Operators from './components/Operators'
import Digits from './components/Digits'
import Equally from './components/Equally'
import { IComponent } from './types'
import { nanoid } from '@reduxjs/toolkit'

const components: IComponent[] = [
  {
    id: '1',
    name: 'display',
    component: <Display />,
    style: 'display cursor--move',
    disabled: false,
    dropped: false,
    copied: false,
  },
  {
    id: '2',
    name: 'operators',
    component: <Operators />,
    style: 'operators grid cursor--move',
    disabled: false,
    dropped: false,
    copied: false,
  },
  {
    id: '3',
    name: 'digits',
    component: <Digits />,
    style: 'digits grid cursor--move',
    disabled: false,
    dropped: false,
    copied: false,
  },
  {
    id: '4',
    name: 'equally',
    component: <Equally />,
    style: 'equally cursor--move',
    disabled: false,
    dropped: false,
    copied: false,
  },
]

function App() {
  const [copied, setCopy] = useState<IComponent[] | []>([])
  const [activeComp, setActiveComp] = useState<Data<IComponent> | null>(null)
  const [dragComp, setDragComp] = useState(components)

  const classText = copied.length ? 'hidden' : ''
  const handleDoubleClick = (e) => {
    console.log(e.target, 'ddddddd')
  }
  const handleDragStart = (e: DragStartEvent) => {
    const active = e.active.data.current as Data<IComponent>
    setActiveComp(active)

    // console.log('DStart ', e.active)
  }
  const handleDragEnd = (e: DragEndEvent) => {
    const active = e.active.data.current as Data<IComponent>
    if (active.copied) return
    // setActiveComp({ ...active, disabled: true })
    console.log(e.active)
    setActiveComp(null)
    const over = e.over?.id
    if (!over) return
    setCopy([
      ...copied,
      { ...active, id: nanoid(), dropped: true, copied: true },
    ])
    setDragComp(
      dragComp.map((comp) =>
        comp.id === active.id ? (comp.disabled = true) : comp
      )
    )
    // console.log('DEnd ', e.active.data)
  }
  // console.log('ActComp ', activeComp)
  // console.log('Copy ', copied)

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Components
        components={components}
        handleDoubleClick={handleDoubleClick}
      />

      <Constructor items={copied} classText={classText} />

      <DragOverlay dropAnimation={null}>
        <ComponentOverlay clazz={activeComp?.style}>
          {activeComp?.component}
        </ComponentOverlay>{' '}
      </DragOverlay>
    </DndContext>
  )
}

export default App
