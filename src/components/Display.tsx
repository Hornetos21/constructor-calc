import ComponentShadow from './ComponentShadow'

const Display = () => {
  return (
    <ComponentShadow clazz="display cursor--move" data="display">
      <input disabled type="text" value="0" />
    </ComponentShadow>
  )
}

export default Display
