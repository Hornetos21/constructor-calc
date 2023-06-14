import Button from './Button'

const operators = ['/', 'X', '-', '+']

const Operators = () => {
  return (
    <>
      {operators.map((sign, index) => (
        <Button key={index} sign={sign} />
      ))}
    </>
  )
}

export default Operators
