import Button from '../UI/Button'
import Widget from './Widget'
import { digits } from '../const'

interface Props {
  copy?: string
  btnClass?: string
  handleClick?: () => void
  active?: boolean
}

const Digits = ({ copy, handleClick, active }: Props) => {
  return (
    <Widget clazz="digits grid" copy={copy}>
      {digits.map((digit, index) => (
        <Button
          key={index}
          sign={digit}
          // btnRef={btnRef}
          handleClick={handleClick}
          active={active}
        />
      ))}
    </Widget>
  )
}

export default Digits
