import { ReactNode } from 'react'

export interface IComponent {
  id: string
  name: string
  component: ReactNode
  style: string
  disabled: boolean
  dropped: boolean
  copied: boolean
}
