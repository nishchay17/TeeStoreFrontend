import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const preLoad = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="row mx-5">
        <div className="col-12 col-md-12">
          <span className="h4 under-line mb-4">All Category:</span>
        </div>
        <div className="col-12 col-md-12 mt-5">
          <Link className="btn bttn" to={`/admin/dashboard`}>
            Admin Home
          </Link>
        </div>
        <div className="col-12 col-md-12">
          <h3 className="my-3">Total {categories.length} Categories</h3>
        </div>
        <div className="col-12 col-md-12 mt-5">
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-4">
                <div className="col-4">
                  <h3 className="text-left text-capitalize">{category.name}</h3>
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;

{
  /* <div className="col-12">
{categories.map((category, index) => {
  return (
    <div key={index} className="row text-center mb-2">
      <div className="col-4">
        <h3 className="text-left">{category.name}</h3>
      </div>
      <div className="col-4">
        <Link
          className="btn btn-outline-success"
          to={`/admin/category/update/${category._id}`}
        >
          <span className="">Update</span>
        </Link>
      </div>
      <div className="col-4">
        <button
          onClick={() => {
            deleteThisCategory(category._id);
          }}
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
})}
</div> */
}
