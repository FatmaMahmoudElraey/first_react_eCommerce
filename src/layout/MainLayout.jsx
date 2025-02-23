import React, { useState } from "react";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Shop } from "../pages/Shop";
import { ProductForm } from "../pages/ProductForm";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";
import { Cart } from "../pages/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { Register } from "../pages/Register";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { CartProvider } from "../components/CartContext"; // Import the CartProvider

export function MainLayout() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handler for search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SharedLayout onSearch={handleSearch} />} 
          >
            <Route index element={<Home />} /> 
            <Route path="home" element={<Home />} />
            <Route
              path="products"
              element={<Products searchQuery={searchQuery} />} 
            />
            <Route path="shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
        <ScrollToTopButton />
      </BrowserRouter>
    </CartProvider>
  );
}