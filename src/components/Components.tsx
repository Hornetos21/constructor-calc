import Component from './Component'
import { IComponent } from '../types'

interface Props {
  components: IComponent[]
  handleDoubleClick(): void
}

const Components = ({ components, handleDoubleClick }: Props) => {
  return (
    <div className="component-wrapper" data-comp="drag">
      {components.map((comp) => (
        <Component
          data={comp}
          key={comp.id}
          clazz={comp.style}
          onDClick={handleDoubleClick}
        >
          {comp.component}
        </Component>
      ))}
    </div>
  )
}

export default Components
