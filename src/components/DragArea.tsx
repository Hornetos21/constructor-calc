import Digits from './Digits'
import Display from './Display'
import Operators from './Operators'
import Equally from './Equally'

const DragArea = () => {
  return (
    <div>
      <Display />
      <Operators />
      <Digits />
      <Equally />
    </div>
  )
}

export default DragArea
