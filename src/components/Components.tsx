import Digits from './Digits'
import Display from './Display'
import Operators from './Operators'
import Equally from './Equally'

const Components = () => {
  return (
    <div className="component-wrapper" data-comp="drag">
      <Display />
      <Operators />
      <Digits />
      <Equally />
    </div>
  )
}

export default Components
