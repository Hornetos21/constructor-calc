import Button from './Button'
import ComponentShadow from './ComponentShadow'

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']
const Digits = () => {
  return (
    <ComponentShadow clazz="digits grid cursor--move" data="digits">
      {digits.map((digit, index) => (
        <Button key={index} sign={digit} />
      ))}
    </ComponentShadow>
  )
}

export default Digits
