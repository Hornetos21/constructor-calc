import Switcher from './Switcher'
import DropArea from './DropArea'

const Constructor = () => {
  return (
      <div className="component-wrapper">
        <Switcher/>
        <DropArea/>
        <div className='text-wrapper'>
          <div className="text">
            <img className="icon" src="/drop.svg" alt=""></img>
            <h3>Перетащите сюда</h3>
            <p>
              любой элемент<br />
              из левой панели
            </p>
          </div>
        </div>

      </div>
 )
}

export default Constructor