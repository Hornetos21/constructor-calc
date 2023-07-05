import { ReactNode } from 'react'

interface Props {
  clazz: string
  children: ReactNode
  copy?: string
  removeWidget?: (e: React.MouseEvent) => void
}

const Widget = ({ clazz, children, copy, removeWidget }: Props) => {
  // ! change class when DnD
  const copied = copy === 'copied'

  /* const shadow = '' ? '' : 'shadow'
  const opacity = '' ? 'opacity' : ''
  const cursor = '' ? '' : 'cursor--move'
 */
  const shadow = copied ? '' : 'shadow'
  const opacity = '' ? 'opacity' : ''
  const cursor = copied ? '' : 'cursor--move'
  // const btnActive = copied ? 'btn--runtime' : ''

  return (
    <div
      className={`component ${clazz} ${shadow} ${opacity} ${cursor}`}
      data-comp={copy}
      onDoubleClick={copied ? removeWidget : undefined}
    >
      {children}
    </div>
  )
}

export default Widget
