import React from 'react'

interface Props {
  sign: string
  clazz?: string
  handleClick?: (e: React.MouseEvent) => void
  active: boolean
}
const Button = ({ clazz = '', sign, handleClick, active }: Props) => {
  const btnRuntime = active ? 'btn--runtime' : ''

  return (
    <button
      disabled={!active}
      className={`btn ${clazz} ${btnRuntime}`}
      onClick={handleClick}
    >
      {sign}
    </button>
  )
}

export default Button
