import { ReactComponent as IconEye } from '../assets/eye.svg'
import { ReactComponent as Selector } from '../assets/selector.svg'
import React from 'react'

const Switcher = ({ active, setActive }) => {
  // const [active, setActive] = useState({ runtime: false, constructor: true })
  const activeClass = (btn: boolean) =>
    btn ? 'selector selector--active' : 'selector'
  const activeIcon = (btn: boolean) => (btn ? '#5D5FEF' : '')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const activeBtn = e.currentTarget.matches('.selector--active')
    if (activeBtn) return
    setActive({ runtime: !active.runtime, constructor: !active.constructor })
  }

  return (
    <div className="switch">
      <button
        className={activeClass(active.runtime)}
        onClick={handleClick}
        name="runtime"
      >
        <IconEye className="icon" color={activeIcon(active.runtime)} />
        Runtime
      </button>
      <button
        className={activeClass(active.constructor)}
        onClick={handleClick}
        name="constructor"
      >
        <Selector className="icon" color={activeIcon(active.constructor)} />
        Constructor
      </button>
    </div>
  )
}

export default Switcher
