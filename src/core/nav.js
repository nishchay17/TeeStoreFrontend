import React from "react";
import "./styles/Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { borderBottom: "2px solid #de9382", color: "black" };
  } else {
    return { color: "black" };
  }
};

{
  /* <Link style={currentTab(history, "/")} className="nav-link" to="/">
Home
</Link> */
}

const Nav = ({ history }) => {
  return (
    <div className="h5 m-md-3 mx-md-5 text-center">
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active mx-md-1 my-md-auto">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                style={currentTab(history, "/collections")}
                className="nav-link  mx-md-1"
                to="/collections"
              >
                Collections
              </Link>
            </li> */}
          </ul>
          <div
            className="h2 px-md-5"
            style={{
              borderBottom: "2px solid #de9382",
              paddingBottom: "6px",
              marginLeft: "33%",
            }}
            href="#"
          >
            The Tee Store
          </div>
          <ul className="navbar-nav" style={{ marginLeft: "25%" }}>
            {!isAuthenticated() && (
              <li className="nav-item active">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link  mx-md-2"
                  to="/signin"
                >
                  <img src="https://img.icons8.com/pastel-glyph/32/000000/gender-neutral-user.png" />
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item active">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link  mx-md-2"
                  to="/user/dashboard"
                >
                  <img src="https://img.icons8.com/pastel-glyph/32/000000/gender-neutral-user.png" />
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item active">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link  mx-md-2"
                  to="/admin/dashboard"
                >
                  <img src="https://img.icons8.com/pastel-glyph/32/000000/gender-neutral-user.png" />
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link  mx-md-2"
                to="/cart"
              >
                <img src="https://img.icons8.com/pastel-glyph/32/000000/shopping-cart--v1.png" />
              </Link>
            </li>
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  className="nav-link mx-md-2"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  <img src="https://img.icons8.com/ios/32/000000/logout-rounded-left.png" />
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link  mx-md-2"
                  to="/signup"
                >
                  <img src="https://img.icons8.com/ios/32/000000/add-user-male.png" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Nav);
