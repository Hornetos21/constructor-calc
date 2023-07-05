import Display from './Display'
import Operators from './Operators'
import Digits from './Digits'
import Equally from './Equally'
import DropText from './DropText'

interface Props {
  handleClick?: () => void
  active?: boolean
}

const DropArea = ({ handleClick, active }: Props) => {
  if (active === undefined) {
    active = false
  }
  // ! highlight on drop
  const highlight = '' ? 'highlight' : ''
  // ! class for droptext
  const hidden = '1' ? 'hidden' : ''

  return (
    <div className={`drop-area ${highlight}`}>
      <DropText clazz={hidden} />

      <Display copy="copied" />
      <Operators copy="copied" handleClick={handleClick} active={active} />
      <Digits copy="copied" handleClick={handleClick} active={active} />
      <Equally copy="copied" handleClick={handleClick} active={active} />
    </div>
  )
}

export default DropArea
