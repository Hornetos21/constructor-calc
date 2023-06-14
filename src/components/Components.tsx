import Digits from './Digits'
import Display from './Display'
import Operators from './Operators'
import Equally from './Equally'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'

import Component from './Component'
import ComponentOverlay from './ComponentOverlay'

const components: Component[] = [
  {
    id: '1',
    name: 'display',
    component: <Display />,
    style: 'display cursor--move',
  },
  {
    id: '2',
    name: 'operators',
    component: <Operators />,
    style: 'operators grid cursor--move',
  },
  {
    id: '3',
    name: 'digits',
    component: <Digits />,
    style: 'digits grid cursor--move',
  },
  {
    id: '4',
    name: 'equally',
    component: <Equally />,
    style: 'equally cursor--move',
  },
]

interface Props {
  handleDragStart(e: DragStartEvent): void

  handleDragEnd(e: DragEndEvent): void
}

const Components = ({ handleDragStart, handleDragEnd, activeComp }: Props) => {
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="component-wrapper" data-comp="drag">
        {components.map((comp) => (
          <Component data={comp} key={comp.id} clazz={comp.style}>
            {comp.component}
          </Component>
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        <ComponentOverlay clazz={activeComp?.style}>
          {activeComp?.component}
        </ComponentOverlay>{' '}
      </DragOverlay>
    </DndContext>
  )
}

export default Components
