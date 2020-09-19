import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card h-100">
        <h4 className="card-header">Admin navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link color">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link color">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link color">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/product" className="nav-link color">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link color">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">
          Admin information
          <span className="ml-5 badge mx-2 badge-danger mr-2">Admin Area</span>
        </h4>
        <li className="list-group-item">
          <span className="mr-2">Name: </span> {name}
        </li>
        <li className="list-group-item">
          <span className="mr-2">Email: </span> {email}
        </li>
      </div>
    );
  };

  return (
    <div>
      <div className="row mx-5">
        <div className="col-12 col-md-3">{adminLeftSide()}</div>
        <div className="col-12 col-md-9 mt-md-0 mt-4">{adminRightSide()}</div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
