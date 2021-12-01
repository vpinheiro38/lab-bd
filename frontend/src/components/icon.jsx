import "../stylesheets/components.css";

function Icon({ iconType = 'fas', iconName, onClick }) {
  return (
    <button className="button is-white" onClick={onClick}>
      <span className="icon is-small">
        <i className={`${iconType} ${iconName}`}></i>
      </span>
    </button>
  );
}

export default Icon;
