import Button from '../UI/Button'
import Widget from './Widget'
import { operators } from '../const'

interface Props {
  copy?: string
  btnClass?: string
  handleClick?: () => void
  active?: boolean
}

const Operators = ({ copy, handleClick, active }: Props) => {
  if (active === undefined) {
    active = false
  }
  return (
    <Widget clazz="operators grid" copy={copy}>
      {operators.map((sign, index) => (
        <Button
          key={index}
          sign={sign}
          handleClick={handleClick}
          active={active}
        />
      ))}
    </Widget>
  )
}

export default Operators
