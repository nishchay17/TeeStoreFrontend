import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";
import { isAuthenticated } from "../auth/helper";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              product={product}
              key={index}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base>
      <div className="row mx-5 justify-content-between mt-5">
        <div className="col-md-4 col-12 mb-4">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No product in Cart</h3>
          )}
        </div>
        <div className="col-5 col-md-5 mr-md-4">
          {isAuthenticated() ? (
            <Payment
              userIdIn={isAuthenticated().user._id}
              products={products}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            <h3>Please Login to proceed</h3>
          )}
        </div>
      </div>
    </Base>
  );
}
