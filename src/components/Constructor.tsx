import Switcher from './Switcher'
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable'

const Constructor = () => {
  return (
    <div className="component-wrapper">
      <Switcher />
      <Droppable droppableId="dropArea">
        {(provided) => (
          <div
            style={{ height: '448px' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="text-wrapper">
        <div className="text">
          <img className="icon" src="/drop.svg" alt=""></img>
          <h3>Перетащите сюда</h3>
          <p>
            любой элемент
            <br />
            из левой панели
          </p>
        </div>
      </div>
    </div>
  )
}

export default Constructor
