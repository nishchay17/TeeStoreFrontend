import React, { useState } from "react";
import background from "../assets/signin.jpg";
import { Link, Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("signin failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && 1 === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info mt-3 text-center">Loading...</div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3 text-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row mx-5 ">
        <div className="col-md-5 mx-2 my-auto text-left order-12 order-md-1">
          <spam className="under-line h3">Sign In</spam>
          <br />
          <br />
          <form>
            <div className="form-group">
              <label className="">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                value={password}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn bttn btn-block">
              Sign In
            </button>
          </form>
          {loadingMessage()}
          {errorMessage()}
        </div>
        <div className="col-md-5 offset-md-1 col-12 order-1 order-md12 mb-5">
          <LazyLoadImage
            src={background}
            effect="blur"
            className="img-fluid rounded border"
          ></LazyLoadImage>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <br />
      <br />
      <br />
      {signInForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
