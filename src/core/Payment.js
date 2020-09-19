import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { processPayment, getMeToken } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const { user, token } = isAuthenticated();
const Payment = ({ products, setReload, reload, userIdIn }) => {
  const [userAddress, setUserAddress] = useState("");
  const [info, setInfo] = useState({
    laoding: true,
    success: false,
    clientToken: null,
    instance: {},
    error: "",
  });

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((infoIn) => {
      if (infoIn?.error) {
        setInfo({ ...info, error: infoIn.error });
      } else {
        const clientToken = infoIn?.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            {!info.success ? (
              <button
                className="btn btn-block bttn"
                onClick={() => onPurchase(user, userAddress)}
              >
                Buy
              </button>
            ) : (
              <Link className="btn btn-block bttn" to="/user/dashboard">
                Go to You'er Order History
              </Link>
            )}
          </div>
        ) : (
          <h3>Please add something in your cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = (user, userAddress) => {
    setInfo({ laoding: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      processPayment(userIdIn, token, paymentData)
        .then((res) => {
          setInfo({ ...info, success: res.success, laoding: false });
          const orderData = {
            products: products,
            transaction: res.transaction.id,
            amount: res.transaction.amount,
            user: userIdIn,
            address: userAddress,
          };
          console.log(orderData);
          createOrder(userIdIn, token, orderData);
          cartEmpty(() => {
            console.log("done cleaning");
          });
          console.log("PAYMENT SUCCESSFUL!!");
        })
        .catch((err) => {
          setInfo({ ...info, laoding: false, success: false });
          console.log("PAYMENT UNSUCCESSFUL!!", err);
        });
    });
  };

  const handleChange = (event) => {
    setUserAddress(event.target.value);
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product, index) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const addressForm = () => {
    return (
      <form className="mt-2">
        <div className="form-group">
          <label className="">Address</label>
          <input
            onChange={handleChange}
            className="form-control"
            value={userAddress}
            type="address"
          />
        </div>
      </form>
    );
  };

  useEffect(() => {
    getToken(userIdIn, token);
  }, []);

  return (
    <div>
      <h3>
        Your bill is <span className="color">${getAmount()}</span>{" "}
      </h3>
      {showDropIn()}
      {addressForm()}
    </div>
  );
};

export default Payment;
