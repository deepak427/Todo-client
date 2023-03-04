import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="main-nav">
      {" "}
      <h3>The learn cloud</h3>
      <Link to="/" className="nav-item nav-btn about">
        About
      </Link>
      <Link to="/" className="nav-item nav-btn products">
        Contact
      </Link>
      <Link to="/" className="nav-item nav-btn forTeams">
        Teams
      </Link>
    </nav>
  );
};

export default Navbar;
