import '../stylesheets/components.css'

function Icon({ iconName }) {
  return (
    <button className="button is-white">
      <span className="icon is-small">
        <i className={`fas ${iconName}`}></i>
      </span>
    </button>
  )
}

export default Icon;
