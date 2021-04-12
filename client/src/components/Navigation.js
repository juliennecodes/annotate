import { NavLink } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation-links">
        <li>
          <NavLink exact to="/" className="navigation-link">
            Homepage
          </NavLink>
        </li>

        <li>
          <NavLink to="/images" className="navigation-link">
            Images
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
