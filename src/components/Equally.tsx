import Button from '../UI/Button'
import Widget from './Widget'

interface Props {
  copy?: string
  btnClass?: string
  handleClick?: () => void
  active?: boolean
}
const Equally = ({ copy, handleClick, active }: Props) => {
  return (
    <Widget clazz="equally" copy={copy}>
      <Button
        sign="="
        clazz={`btn--equally`}
        handleClick={handleClick}
        active={active}
      />
    </Widget>
  )
}

export default Equally
