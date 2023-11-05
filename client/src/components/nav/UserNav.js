import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          User Info
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/profile" className="nav-link">
          Edit profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
