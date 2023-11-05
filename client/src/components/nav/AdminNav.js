import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Change Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/edit" className="nav-link">
          Edit Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Manage listings
        </Link>
      </li>   

      <li className="nav-item">
        <Link to="/admin/add" className="nav-link">
            add new listing
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/view" className="nav-link">
          View Comments
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li> */}

      {/* <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupons
        </Link>
      </li> */}


    </ul>
  </nav>
);

export default UserNav;
