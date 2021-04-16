import {Link} from "react-router-dom";
import "./Homepage.css";

export function Homepage() {
  return (
    <div className="homepage-div">
      <h1 className="homepage-heading">annotate</h1>
      <Link className="homepage-get-started" to="/images">get started...</Link>
    </div>
  );
}
