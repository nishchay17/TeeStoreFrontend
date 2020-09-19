import React, { useEffect, useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload,
  reload,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const addToCartRedirect = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCartIn) => {
    return (
      addToCartIn && (
        <button onClick={addToCartRedirect} className="bttn h6 p-2">
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveToCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="bttn h6 p-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div>
      <div className="row mb-5">
        {getRedirect(redirect)}
        <div className="col-8">
          <ImageHelper product={product} />
        </div>
        <div className="col-4">
          <div className="h3">
            {product.name} <br />
          </div>
          <div className="color h3">${product.price}</div>
        </div>
        <div className="col-12 col-md-12">{showAddToCart(addToCart)}</div>
        <div className="col-12 col-md-12">
          {showRemoveToCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
