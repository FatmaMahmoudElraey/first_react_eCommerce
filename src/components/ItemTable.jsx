import { useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { hardDeleteItem, postItem, updateItem } from "../utils/api-helpers";
import styles from "./ItemTable.module.scss";
import { propTypes } from "react-bootstrap/esm/Image";
// import Swal from "sweetalert2";

export default function ItemTable({ items = [], setItems, itemType }) {
  const [editMode, setEditMode] = useState({});
  const [editedItems, setEditedItems] = useState(items);
  const [newItem, setNewItem] = useState({});

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
    setNewItem({});
    const posted = postItem(itemType, newItem);
    setEditedItems([
      ...editedItems,
      { posted },
    ]);
  };

  const handleEditItem = (itemId) => {
    const editedItem = editedItems.find((item) => item.id === itemId);
    updateItem(itemType, itemId, editedItem);
    setItems(items.map((item) => (item.id === itemId ? editedItem : item)));
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
    setItems(items.filter((item) => item.id !== itemId))
    setEditedItems(editedItems.filter((item) => item.id !== itemId));
  };

  // console.log(items);

  return (
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
            {Object.keys(items[0]).map(
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
                        value={item[key]}
                        onChange={(e) =>
                          handleInputChange(item.id, key, e.target.value)
                        }
                        placeholder={key}
                        onBlur={() => handleBlur(item.id, key)}
                        autoFocus
                      />
                    ) : (
                      item[key]
                    )}
                  </td>
                )
            )}
            <td>
              <ButtonGroup vertical>
                <Button onClick={() => handleEditItem(item.id)}>
                  Submit&nbsp;Edit
                </Button>
                {item != items[item.id] && (
                  <Button onClick={() => cancelEdit(item.id)}>
                    Cancel&nbsp;Edit
                  </Button>
                )}

                <Button
                  onClick={() => {
                    console.log(item.deleted);
                    hardDelete(item.id);
                    
                  }}
                  variant={item.deleted ? "success" : "danger"}
                >
                  delete
                </Button>

                {itemType === "products" && <Button>View</Button>}
              </ButtonGroup>
            </td>
          </tr>
        ))}
        <tr>
          {Object.keys(items[0] || {}).map(
            (key) =>
              key !== "id" &&
              key !== "deleted" && (
                <td key={key}>
                  <textarea
                    placeholder={key}
                    value={newItem[key] || ""}
                    onChange={(e) => handleNewItemChange(key, e.target.value)}
                  />
                </td>
              )
          )}
          <td>
            <ButtonGroup>
              <Button onClick={handleAddItem}>Add</Button>
            </ButtonGroup>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

ItemTable.propTypes = {
  items: propTypes.array,
  setItems: propTypes.func,
  itemType: propTypes.string,
};
