interface Props {
  clazz: string
}
const DropText = ({ clazz }: Props) => {
  return (
    <div className={`text-wrapper ${clazz}`}>
      <div className="text">
        <img className="icon" src="/drop.svg" alt=""></img>
        <h3>Перетащите сюда</h3>
        <p>
          любой элемент
          <br />
          из левой панели
        </p>
      </div>
    </div>
  )
}

export default DropText
