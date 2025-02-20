import React, { useEffect, useState } from "react";
import { fetchItems } from "../utils/api-helpers";
import { ButtonGroup, Container, Button } from "react-bootstrap";
import ItemTable from "../components/ItemTable";

export default function Admin() {
  const [itemType, setItemType] = useState("products");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems(itemType).then((data) => {
      setItems(data);
    });
  }, [itemType]);
  return (
    <>
      <Container className="text-center d-flex flex-column gap-3">
        <h1>Admin</h1>
        <ButtonGroup>
          <Button onClick={() => setItemType("products")}> Products</Button>
          <Button onClick={() => setItemType("users")}> Users</Button>
          <Button onClick={() => setItemType("orders")}> Orders</Button>
        </ButtonGroup>

        {items.length > 0 ? (
          <ItemTable items={items} itemType={itemType} />
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  );
}
