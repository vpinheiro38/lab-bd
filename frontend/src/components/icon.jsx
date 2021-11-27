import '../stylesheets/components.css'

function Icon({ iconName, onClick }) {
  return (
    <button className="button is-white" onClick={onClick}>
      <span className="icon is-small">
        <i className={`fas ${iconName}`}></i>
      </span>
    </button>
  )
}

export default Icon;
