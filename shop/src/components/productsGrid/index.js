import React from "react";
import ProductBox from "./productBox";

const ProductsGrid = ({ products, title }) => {
  return (
    <div className="products-grid">
      <div className="container">
        <h2>{title || "צפיה בכל המוצרים והשירותים שלנו"}</h2>
        {products.length > 0 ? (
          <div className="products-wrapper">
            {products.map((product, index) => (
              <ProductBox key={index} product={product} />
            ))}
          </div>
        ) : 'לא נמצאו מוצרים/שירותים'}
      </div>
    </div>
  );
};

export default ProductsGrid;
