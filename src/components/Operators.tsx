import Button from './Button'
import ComponentShadow from './ComponentShadow'

const operators = ['/', 'X', '-', '+']

const Operators = () => {
  return (
    <ComponentShadow clazz="operators grid cursor--move" data="operators">
      {operators.map((sign, index) => (
        <Button key={index} sign={sign} />
      ))}
    </ComponentShadow>
  )
}

export default Operators
