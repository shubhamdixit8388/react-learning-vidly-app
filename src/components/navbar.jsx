import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ navBarItems, selectedNavBar, onNavBarChange, user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="movies">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {navBarItems.map((navBarItem) => (
            <li
              className={
                selectedNavBar === navBarItem ? "nav-item active" : "nav-item"
              }
              key={navBarItem.label}
              onClick={() => onNavBarChange(navBarItem)}
            >
              <Link to={"/" + navBarItem.link} className="nav-link">
                {navBarItem.label === "name"
                  ? user[navBarItem.label]
                  : navBarItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
