import ComponentShadow from './ComponentShadow'
import Button from './Button'

const Equally = () => {
  return (
    <ComponentShadow clazz="equally cursor--move">
      <Button sign="=" clazz="btn--equally" />
    </ComponentShadow>
  )
}

export default Equally
