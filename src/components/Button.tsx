interface Props {
  sign: string
  clazz?: string
}
const Button = ({ clazz, sign }: Props) => {
  return <button className={`btn ${clazz}`}>{sign}</button>
}

export default Button
