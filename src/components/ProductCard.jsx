import React, { useState } from "react";
import { useCart } from "./CartContext"; // Import the useCart hook
import { ProductModal } from "./ProductModal"; // Import the ProductModal component

export function ProductCard({ product }) {
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { addToCart } = useCart(); // Use the addToCart function from CartContext

  if (!product) {
    return <div className="text-danger text-center mt-3">Product data is missing</div>;
  }

  const getButtonColor = () => {
    if (product.quantity === 0) return "btn-danger";
    if (product.quantity === 1) return "btn-warning";
    return "btn-outline-danger";
  };

  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card product-card shadow-lg border-0 rounded-4"
        onClick={() => setShowModal(true)} 
        style={{ cursor: "pointer" }} 
      >
        <div className="position-relative">
          <img
            src={product.image}
            className="card-img-top rounded-top product-image"
            alt={product.name}
          />
          {product.quantity === 0 && (
            <div className="sold-out-overlay">Sold Out</div>
          )}
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold text-dark">{product.name}</h5>
          <p className="card-text text-muted fw-semibold">${product.price}</p>
          <span className="badge bg-danger mb-2">{product.category}</span>
          <p className="text-secondary small">
            {showMore ? product?.description : `${product?.description?.substring(0, 50)}...`}
          </p>
          <button
            className="btn btn-link text-decoration-none"
            onClick={(e) => {
              e.stopPropagation(); 
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>

          <button
            className={`btn ${getButtonColor()} w-100 mt-2 py-2 fw-bold`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      <ProductModal
        product={product}
        show={showModal}
        onHide={() => setShowModal(false)}
        addToCart={addToCart}
      />
    </div>
  );
}