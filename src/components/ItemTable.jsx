import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import {
  deleteItem,
  hardDeleteItem,
  postItem,
  updateItem,
} from "../utils/api-helpers";
import styles from "./ItemTable.module.scss";
import { propTypes } from "react-bootstrap/esm/Image";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  deleteProductAction,
  editProductAction,
  getProductsAction,
} from "../store/productSlice";
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
} from "../store/userSlice";
import {
  addOrderAction,
  deleteOrderAction,
  editOrderAction,
} from "../store/orderSlice";
import { ProductModal } from "./ProductModal";
// import Swal from "sweetalert2";

export default function ItemTable({ items, showDeleted, itemType }) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState({});
  const [editedItems, setEditedItems] = useState(items);
  const [newItem, setNewItem] = useState({});
  const [modalProduct, setModalProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    setEditedItems(showDeleted?items:items.filter((item) => !item.deleted));
  }, [items,showDeleted]);

  const handleCellClick = (itemId, key) => {
    setEditMode({ ...editMode, [`${itemId}-${key}`]: true });
  };

  const handleInputChange = (itemId, key, value) => {
    const updatedItems = editedItems.map((item) =>
      item.id == itemId ? { ...item, [key]: value } : item
    );
    setEditedItems(updatedItems);
  };

  const handleBlur = (itemId, key) => {
    setEditMode({ ...editMode, [`${itemId}-${key}`]: false });
  };

  const handleNewItemChange = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const handleAddItem = () => {
    const params = newItem;
    switch (itemType) {
      case "products":
        dispatch(addProductAction(params));
        break;
      case "users":
        dispatch(addUserAction(params));
        break;
      case "orders":
        dispatch(addOrderAction(params));
        break;
      default:
        break;
    }
    setEditedItems(items);
    console.log(editedItems);
    setNewItem({});
  };

  const handleEditItem = (itemId) => {
    const params = {
      id: itemId,
      [itemType.slice(0, -1)]: editedItems.find((item) => item.id === itemId),
    };
    switch (itemType) {
      case "products":
        dispatch(editProductAction(params));
        break;
      case "users":
        dispatch(editUserAction(params));
        break;
      case "orders":
        dispatch(editOrderAction(params));
        break;
      default:
        break;
    }
  };
  const cancelEdit = (itemId) => {
    setEditedItems(
      editedItems.map((item) =>
        item.id === itemId ? items.find((item) => item.id === itemId) : item
      )
    );
  };
  const hardDelete = async (itemId) => {
    hardDeleteItem(itemType, itemId);
    // setItems(items.filter((item) => item.id !== itemId));
    setEditedItems(editedItems.filter((item) => item.id !== itemId));
  };

  // console.log(items);

  return (
    <>
      <Table className={styles.itemTable} size="sm" striped bordered hover>
        <thead>
          <tr>
            {Object.keys(items[0] || {}).map(
              (key) =>
                key !== "id" && key != "deleted" && <th key={key}>{key}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {editedItems.map((item) => (
            <tr
              key={item.id}
              className={item.deleted ? "text-decoration-line-through" : ""}
            >
              {Object.keys(items[0] || {}).map(
                (key) =>
                  key !== "id" &&
                  key != "deleted" && (
                    <td
                      key={key}
                      className={item.deleted ? " bg-warning" : ""}
                      onClick={() => handleCellClick(item.id, key)}
                    >
                      {editMode[`${item.id}-${key}`] &&
                      typeof item[key] !== "boolean" ? (
                        <textarea
                          value={
                            typeof item[key] === "object"
                              ? JSON.stringify(item[key])
                              : item[key]
                          }
                          onChange={(e) =>
                            handleInputChange(item.id, key, e.target.value)
                          }
                          placeholder={key}
                          onBlur={() => handleBlur(item.id, key)}
                          autoFocus
                        />
                      ) : typeof item[key] === "object" ? (
                        JSON.stringify(item[key])
                      ) : (
                        item[key]
                      )}
                    </td>
                  )
              )}
              <td>
                <ButtonGroup vertical>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleEditItem(item.id)}
                  >
                    Submit&nbsp;Edit
                  </Button>
                  {item != items[item.id] && (
                    <Button
                      variant="outline-danger"
                      onClick={() => cancelEdit(item.id)}
                    >
                      Cancel&nbsp;Edit
                    </Button>
                  )}

                  {item.deleted ? (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        if (itemType === "products") {
                          dispatch(
                            editProductAction({
                              id: item.id,
                              product: { ...item, deleted: false },
                            })
                          );
                        }
                        if (itemType === "users") {
                          dispatch(
                            editUserAction({
                              id: item.id,
                              user: { ...item, deleted: false },
                            })
                          );
                        }
                        if (itemType === "orders") {
                          dispatch(
                            editOrderAction({
                              id: item.id,
                              order: { ...item, deleted: false },
                            })
                          );
                        }
                      }}
                    >
                      restore
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        if (itemType === "products") {
                          dispatch(deleteProductAction(item.id));
                        }
                        if (itemType === "users") {
                          dispatch(deleteUserAction(item.id));
                        }
                        if (itemType === "orders") {
                          dispatch(deleteOrderAction(item.id));
                        }
                      }}
                    >
                      delete
                    </Button>
                  )}
                  {itemType === "products" && (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setModalProduct(item);
                        setShowModal(true);
                      }}
                    >
                      View
                    </Button>
                  )}
                </ButtonGroup>
              </td>
            </tr>
          ))}
          {items.length > 0 && (
            <tr>
              {Object.keys(items[0] || {}).map(
                (key) =>
                  key !== "id" &&
                  key !== "deleted" && (
                    <td key={key}>
                      <textarea
                        placeholder={key}
                        value={newItem[key] || ""}
                        onChange={(e) =>
                          handleNewItemChange(key, e.target.value)
                        }
                      />
                    </td>
                  )
              )}
              <td>
                <ButtonGroup>
                  <Button variant="outline-danger" onClick={handleAddItem}>
                    Add
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ProductModal
        product={modalProduct}
        show={showModal}
        onHide={() => setShowModal(false)}
        // addToCart={addToCart}
      />
    </>
  );
}

ItemTable.propTypes = {
  items: propTypes.array,
  showDeleted: propTypes.bool,
  itemType: propTypes.string,
};
