import { ReactNode } from 'react'
import { useDraggable } from '@dnd-kit/core'

interface Component {
  id: string
  name: string
  component: ReactNode
  style: string
}
interface Props {
  clazz: string
  data: Component
  children: ReactNode
}

const Component = ({ clazz, children, data }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: data.id,
    data: {
      name: data.name,
      component: data.component,
      style: data.style,
    },
  })

  const shadowOpacity = isDragging ? 'opacity' : 'shadow'
  return (
    <div
      className={`component ${clazz} ${shadowOpacity}`}
      data-item={data}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}

export default Component
