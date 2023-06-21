import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const DropArea = ({ children }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'dropArea',
  })

  const highlight = isOver ? 'highlight' : ''

  return (
    <div className={`drop-area ${highlight}`} ref={setNodeRef}>
      {children}
    </div>
  )
}

export default DropArea
