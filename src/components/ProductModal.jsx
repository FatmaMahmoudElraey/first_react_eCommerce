// ProductModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaHeart, FaCartPlus, FaArrowLeft } from "react-icons/fa";

export function ProductModal({ product, show, onHide, addToCart }) {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger fw-bold">{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid border border-3 border-danger rounded"
              style={{ maxHeight: "350px" }}
            />
          </div>
          <div className="col-md-6">
            <p className="lead fs-5">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="lead fs-5">
              <strong>Quantity:</strong> {product.quantity} items
            </p>
            <p className="lead fs-5">
              <strong>Description:</strong> {product.description}
            </p>

            <div className="d-flex mb-3">
              {[...Array(4)].map((_, i) => (
                <FaHeart key={i} className="text-danger fs-2 mx-2" />
              ))}
              <FaHeart className="text-secondary fs-2 mx-2" />
            </div>

            <div className="mt-4">
              <Button variant="outline-dark" onClick={onHide} className="me-3">
                <FaArrowLeft className="me-2" /> Back To Products
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  addToCart(product);
                  onHide();
                }}
              >
                <FaCartPlus className="me-2" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}