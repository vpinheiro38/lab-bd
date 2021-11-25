import "../stylesheets/components.css";
import { Link } from "react-router-dom";

function LinkButton({ to, describe }) {
  return (
    <Link to={to}>
      <button className="button button-header">{describe}</button>
    </Link>
  );
}

export default LinkButton;
