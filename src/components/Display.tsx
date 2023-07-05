import Widget from './Widget'

interface Props {
  copy?: string
}
const Display = ({ copy }: Props) => {
  return (
    <Widget clazz="display" copy={copy}>
      <input disabled type="text" value="0" />
    </Widget>
  )
}

export default Display
