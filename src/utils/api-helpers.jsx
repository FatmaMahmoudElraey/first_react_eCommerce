import axios from "axios";

export async function fetchItems(endpoint) {
  const response = await axios.get(`http://localhost:3001/${endpoint}`);
  return response.data;
}

export async function fetchItem(endpoint, id) {
  const response = await axios.get(`http://localhost:3001/${endpoint}/${id}`);
  return response.data;
}

export async function postItem(endpoint, item) {
  const response = await axios.post(`http://localhost:3001/${endpoint}`, item);
  return response.data;
}

export async function hardDeleteItem(endpoint, id) {
  await axios.delete(`http://localhost:3001/${endpoint}/${id}`);
}

export async function updateItem(endpoint, id, item) {
  const oldItem = await fetchItem(endpoint, id);
  const updatedItem = { ...oldItem, ...item };
  const response = await axios.put(`http://localhost:3001/${endpoint}/${id}`, updatedItem);
  return response.data;
}

export async function deleteItem(endpoint, id) {
  return await updateItem(endpoint, id, { deleted: true });
}

export async function undeleteAllItems(endpoint) {
  const items = await fetchItems(endpoint);
  items.forEach((item) => {
    updateItem(endpoint, item.id, { deleted: false });
  });
}
