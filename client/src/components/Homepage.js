import {Link} from "react-router-dom";
import "./Homepage.css";

export function Homepage() {
  return (
    <>
      <h1 className="homepage-heading">Annotate</h1>
      <Link className="homepage-get-started" to="/images">get started...</Link>
    </>
  );
}
