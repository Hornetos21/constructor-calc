import { ReactNode } from 'react'

interface Props {
  clazz: string
  data?: string
  children: ReactNode
}

const ComponentShadow = ({ clazz, children, data }: Props) => {
  return (
    <div className={`component shadow ${clazz}`} data-item={data}>
      {children}
    </div>
  )
}

export default ComponentShadow
