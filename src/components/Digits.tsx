import Button from './Button'

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']
const Digits = () => {
  return (
    <>
      {digits.map((digit, index) => (
        <Button key={index} sign={digit} />
      ))}
    </>
  )
}

export default Digits
