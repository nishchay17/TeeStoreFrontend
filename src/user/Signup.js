import React, { useState, useEffect } from "react";
import background from "../assets/signin.jpg";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  useEffect(() => {}, [values]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row mx-5">
        <div className="col-md-5 mx-2 my-auto text-left order-12 order-md-1">
          <spam className="under-line h3">Sign Up</spam>
          <br />
          <br />
          <form>
            <div className="form-group">
              <label className="">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn bttn btn-block">
              Sign Up
            </button>
            {successMessage()}
            {errorMessage()}
          </form>
        </div>
        <div className="col-md-5 offset-md-1 col-12 order-1 order-md12 mb-5">
          <LazyLoadImage
            src={background}
            className="img-fluid rounded border"
            effect="blur"
          ></LazyLoadImage>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3 text-center"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please
        <Link to="/signin"> Log In here</Link>
      </div>
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

  return (
    <div>
      <br />
      <br />
      <br />
      {signUpForm()}
    </div>
  );
};

export default Signup;
