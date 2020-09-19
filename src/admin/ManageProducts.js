import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
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
          <span className="h4 under-line mb-4">All products:</span>
        </div>
        <div className="col-12 col-md-12 mt-5">
          <Link className="btn bttn" to={`/admin/dashboard`}>
            Admin Home
          </Link>
        </div>
        <div className="col-12 col-md-12">
          <h3 className="my-3">Total {products.length} Products</h3>
        </div>

        <div className="col-12 col-md-12 mt-5">
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-4">
                <div className="col-4">
                  <h3 className="text-left text-capitalize">{product.name}</h3>
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
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

export default ManageProducts;
