import React from "react";
import { API } from "../../backend";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}product/photo/${product._id}`
    : "https://images.unsplash.com/photo-1579159286444-48ca14d5b3db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80";
  return (
    <div className="">
      <LazyLoadImage
        src={imageUrl}
        effect="blur"
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
