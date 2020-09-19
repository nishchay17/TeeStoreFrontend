import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategory, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: "",
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    createdProduct,
    error,
    photo,
    categories,
    category,
    loading,
    getaRedirect,
    formData,
  } = values;

  const preLoad = () => {
    getAllCategory().then((data) => {
      //   console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: [...data],
          formData: new FormData(),
        });
        // console.log(categories);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} created !
      </div>
    );
  };

  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-damger mt-3">{error}</div>;
    }
  };

  const createProductForm = () => (
    <form>
      <div className="form-group">
        <span>Post photo</span>
        <input
          className="btn bttn"
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          placeholder="choose a file"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn bttn mb-3">
        Create Product
      </button>
    </form>
  );

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="row mx-5">
        <div className="col-12 col-md-3">
          <Link to="/admin/dashboard" className="btn bttn ml-5">
            Admin home
          </Link>
        </div>
        <div className="col-md-8 col-12 mt-md-0 mt-5">
          <div className="row rounded">
            <div className="col-md-8 offset-md-2">
              {createProductForm()}
              {successMessage()}
              {errorMessage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
