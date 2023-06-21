import { ReactNode } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { IComponent } from '../types'

interface Props {
  clazz: string
  data: IComponent
  children: ReactNode
  onDClick(): void
}

const Component = ({ clazz, children, data, onDClick }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: data.id,
    data: {
      id: data.id,
      name: data.name,
      component: data.component,
      style: data.style,
      disabled: data.disabled,
      dropped: data.dropped,
      copied: data.copied,
    },
    disabled: data.disabled,
  })

  const shadow = data.disabled || data.copied ? '' : 'shadow'
  const opacity = data.disabled || isDragging ? 'opacity' : ''

  return (
    <div
      className={`component ${clazz} ${shadow} ${opacity}`}
      ref={setNodeRef}
      onDoubleClick={() => console.log('dddd')}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}

export default Component
