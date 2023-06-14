import Digits from './Digits'
import Display from './Display'
import Operators from './Operators'
import Equally from './Equally'
import { Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable'

const components = [
  { id: '1', name: 'display', comp: <Display /> },
  { id: '2', name: 'operators', comp: <Operators /> },
  { id: '3', name: 'digits', comp: <Digits /> },
  { id: '4', name: 'equally', comp: <Equally /> },
]
const Components = () => {
  return (
    <Droppable droppableId="copyArea">
      {(provided) => (
        <div
          className="component-wrapper"
          data-comp="drag"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {components.map((c, i) => (
            <Draggable key={i} draggableId={c.name} index={i}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {c.comp}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Components
