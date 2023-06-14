import { ReactNode } from 'react'

interface Props {
  clazz: string
  children: ReactNode
}
const ComponentOverlay = ({ clazz, children }: Props) => {
  return <div className={`component ${clazz}`}>{children}</div>
}

export default ComponentOverlay