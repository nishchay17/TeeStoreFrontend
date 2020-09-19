import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm bttn mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed To Create Category</h4>;
    }
  };

  const form = () => (
    <form>
      <br />
      <br />
      <br />
      <div className="form-group">
        <span className="lead under-line">Enter the category</span>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          onChange={handleChange}
          value={name}
          placeholder="Enter New Category"
        />
        <button onClick={onSubmit} className="btn bttn">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create category"
      description="Add a new tee category"
      className="container bg-info p-4"
    >
      <div className="row rounded bg-white">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {form()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
