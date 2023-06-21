import Switcher from './Switcher'
import DropArea from './DropArea'
import DropText from './DropText'
import Component from './Component'
import { IComponent } from '../types'

interface Props {
  items: IComponent[]
  classText: string
}

const Constructor = ({ items, classText }: Props) => {
  return (
    <div className="component-wrapper">
      <Switcher />
      <DropText clazz={classText} />
      <DropArea>
        {items &&
          items.map((comp) => (
            <Component key={comp.id} clazz={comp.style} data={comp}>
              {comp.component}
            </Component>
          ))}
      </DropArea>
    </div>
  )
}

export default Constructor
