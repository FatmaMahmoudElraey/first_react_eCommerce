import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

export function Products({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products") 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(["All", ...uniqueCategories]); 

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const productName = product.name || ""; 
    const query = searchQuery || ""; 

    const matchesSearch = productName.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-light p-5 text-center">
      {/* Cart Button */}
      <div className="position-absolute top-0 end-0 m-3">
        <button className="btn btn-primary position-relative">
          🛒 Cart
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="text-dark fw-bold mb-3">Filter by Category</h4>
        <div className="d-flex justify-content-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn px-4 fw-bold rounded-pill ${
                selectedCategory === category ? "btn-danger text-light" : "btn-outline-danger"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))
            ) : (
              <p className="text-secondary fw-semibold mt-4">No products available in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}