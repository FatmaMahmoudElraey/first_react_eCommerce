import  { useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { postItem, updateItem } from "../utils/api-helpers";


export default function ItemTable({ items=[], itemType }) {
  const [editMode, setEditMode] = useState({});

  const [editedItems, setEditedItems] = useState(items);

  const handleCellClick = (itemId, key) => {
    setEditMode({ ...editMode, [`${itemId}-${key}`]: true });
  };

  const handleInputChange = (itemId, key, value) => {
    const updatedItems = editedItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    setEditedItems(updatedItems);
  };

  const handleBlur = (itemId, key) => {
    setEditMode({ ...editMode, [`${itemId}-${key}`]: false });
  };

  const [newItem, setNewItem] = useState({});

  const handleNewItemChange = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const handleAddItem = () => {
    setEditedItems([...editedItems, { ...newItem, id: editedItems.length + 1 }]);
    setNewItem({});
    postItem(itemType, newItem);
  };


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(items[0] || {}).map((key) => (
            key !== "id" && <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {editedItems.map((item) => (
          <tr key={item.id}>
            {Object.keys(items[0]).map((key) => (
              key !== "id" && (
              <td key={key} onClick={() => handleCellClick(item.id, key)} style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {editMode[`${item.id}-${key}`] && typeof item[key] !== "boolean" ? (
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
                  <span title={item[key]}>
                    {typeof item[key] === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={item[key]}
                        onChange={(e) =>
                          handleInputChange(item.id, key, e.target.checked)
                        }
                        onBlur={() => handleBlur(item.id, key)}
                      />
                    ) : (
                      item[key]
                    )}
                  </span>
                )}
              </td>)
            ))}
            <td>
              <ButtonGroup>
                <Button onClick={() => updateItem(itemType, item.id, item)}>Submit Edit</Button>
                <Button>Delete</Button>
                {itemType === "product" && <Button>View</Button>}
              </ButtonGroup>
            </td>
          </tr>
        ))}
        <tr>
          {Object.keys(items[0] || {}).map((key) => (
            key !== "id" && <td key={key}>
              <textarea
                placeholder={key}
                value={newItem[key] || ""}
                onChange={(e) => handleNewItemChange(key, e.target.value)}
              />
            </td>
          ))}
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


