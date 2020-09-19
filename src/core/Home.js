import React, { useState, useEffect } from "react";
import image from "../assets/background.png";
import "../styles.css";
import Footer from "./Footer";
import Card from "./Card";
import { getProduct } from "./helper/coreapicalls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProduct().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);

  const intro = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="row mx-5 justify-content-between">
          <div className="col-md-2 col-12 h1 my-auto">
            Simple <br />
            Elegant <br />
            Sylishish
            <p className="lead mt-4" style={{ color: "#D74B2B" }}>
              Find You're Pick
            </p>
          </div>
          <div className="col-md-8 col-12 mr-md-4">
            <LazyLoadImage
              className="img-fluid rounded"
              src={image}
              effect="blur"
            ></LazyLoadImage>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {intro()}
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row mx-5">
        <div className="col-12 col-md-12">
          <spam className="h3 under-line">All Products</spam>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {products.map((product, index) => {
          return (
            <div className="col-md-4 col-12 mb-4" key={index}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

{
  /* {products.map((product, index) => {
          return (
            <div className="col-md-4 mb-4" key={index}>
              <Card product={product} />
            </div>
          );
        })} */
}
