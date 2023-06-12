
const Switcher = () => {
  return (
    <div className="switch">
      <button className="selector" name="runtime">
        <div className="icon icon__eye" name="eye"></div>
        Runtime
      </button>
      <button className="selector selector--active" name="constructor">
        <div
          className="icon icon__selector icon__selector--active"
          name="selector"
        ></div>
        Constructor
      </button>
    </div>
  )
}

export default Switcher