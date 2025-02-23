import React, { useEffect, useState } from "react";
import { fetchItems } from "../utils/api-helpers";
import { ButtonGroup, Container, Button, Row } from "react-bootstrap";
import MyBreadcrumb from "../components/MyBreadcrumb";
import ItemTable from "../components/ItemTable";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [itemType, setItemType] = useState("products");
  const [showDeleted, setShowDeleted] = useState(false);
  const products = useSelector((state) => state.productSlice.products);
  const users = useSelector((state) => state.userSlice.users);
  const orders = useSelector((state) => state.orderSlice.orders);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const items = {
    products,
    users,
    orders,
  };

  // console.log(items);
  // console.log(currentUser);
  if (!currentUser || currentUser.role !== "admin") {
    Navigate({ to: "/404" });
  } else
    return (
      <>
        <Container fluid className="text-center d-flex flex-column gap-3">
          <MyBreadcrumb title="Admin" />
          <ButtonGroup>
            <Button
              variant="outline-danger"
              className={"shadow-none " + (itemType == "products" && "active")}
              onClick={() => setItemType("products")}
            >
              Products
            </Button>
            <Button
              variant="outline-danger"
              className={"shadow-none " + (itemType == "users" && "active")}
              onClick={() => setItemType("users")}
            >
              Users
            </Button>
            <Button
              variant="outline-danger"
              className={"shadow-none " + (itemType == "orders" && "active")}
              onClick={() => setItemType("orders")}
            >
              Orders
            </Button>
          </ButtonGroup>
          <Row>
            <label  htmlFor="showDeleted">
            <input
              className="m-1"
              type="checkbox"
              onChange={(e) => setShowDeleted(e.target.checked)}
            />
              Show Deleted Items
            </label>
          </Row>

          {products.length ? (
            <ItemTable
              items={items[itemType]}
              showDeleted={showDeleted}
              itemType={itemType}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </Container>
      </>
    );
}
