import React, { useState } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "./CartContext";

export function Header({ onSearch }) {
  const { cart } = useCart(); // Get cart data
  const [searchQuery, setSearchQuery] = useState("");

  // Example user object (Replace with actual user authentication logic)
  const user = {
    name: "Fatma Mahmoud",
    isAuthenticated: true, // Assume the user is logged in
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  return (
    <Navbar expand="lg" className="navbar navbar-dark bg-dark fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-light">
          FAAM
        </Navbar.Brand>

        <div className="d-flex flex-column flex-lg-row mx-auto w-lg-25 justify-content-lg-center">
          <Form className="d-flex w-100 w-lg-auto text-light" onSubmit={handleSearch}>
            <FormControl
              type="search"
              className="me-2 bg-dark text-light border-0 border-bottom border-danger"
              aria-label="Search"
              placeholder="Search here for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-danger" type="submit">
              <i className="bi bi-search text-danger"></i>
            </Button>
          </Form>
        </div>

        <Navbar.Toggle aria-controls="navmenu" className="border-0 ms-auto" />

        <Navbar.Collapse id="navmenu">
          <Nav className="navbar-nav ms-auto justify-content-lg-end">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link text-danger border-bottom border-danger mx-lg-3"
                  : "nav-item nav-link text-light mx-lg-3"
              }
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link text-danger border-bottom border-danger mx-lg-3"
                  : "nav-item nav-link text-light mx-lg-3"
              }
              to="/shop"
            >
              Shop
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link text-danger border-bottom border-danger mx-lg-3"
                  : "nav-item nav-link text-light mx-lg-3"
              }
              to="/products"
            >
              Products
            </NavLink>

            {/* Cart Icon */}
            <NavLink to="/cart" className="nav-item nav-link text-light mx-lg-3">
              <i className="bi bi-cart"></i>
              <span className="badge bg-danger ms-1">{cart.length}</span>
            </NavLink>

            {user.isAuthenticated ? (
              <>
                {/* Profile Icon with Username */}
                <NavLink to="/profile" className="nav-item nav-link text-light mx-lg-3 d-flex align-items-center">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name}
                </NavLink>

                {/* Logout Button */}
                <Button variant="outline-danger" className="ms-lg-3 fw-bold">
                  <NavLink to="/login" >
                    Logout
                  </NavLink>
                </Button>
              </>
            ) : (
              <NavLink to="/login">
                <Button variant="outline-danger" className="ms-lg-3 fw-bold">
                  Login
                </Button>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}