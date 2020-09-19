import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
const UserDashBoard = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <div className="row mx-5">
        <div className="col-12 col-md-3 ml-2">
          <span className="h3 under-line text-capitalize">
            Hello {isAuthenticated().user.name}
          </span>
        </div>
      </div>
      <div className="row mx-5 mt-5">
        <div className="col-12 col-md-3 ml-2">
          <span className="h4 under-line">You're Orders</span>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
