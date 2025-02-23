import axios from "axios";
import { API_URL } from "./constants";

function typecastItem(item) {
  Object.keys(item).forEach((key) => {
    if (key == "price" || key == "quantity") {
      item[key] = Number(item[key]);
    }
    if (key === "deleted") {
      item[key] = Boolean(item[key]);
    }
    if (key === "products") {
      if (typeof item[key] === "string") item[key] = JSON.parse(item[key]);
      item[key] = item[key].map((product) => typecastItem(product));
    }
    if (item[key] == "null") {
      item[key] = null;
    }
    if (item[key] == "undefined") {
      item[key] = undefined;
    }
  });
  return item;
}

export async function fetchItems(endpoint) {
  const response = await axios.get(`${API_URL}${endpoint}`);
  return response.data.map(typecastItem);
}
export async function fetchDeletedItems(endpoint) {
  const response = await axios.get(`${API_URL}deleted-${endpoint}`);
  return response.data.map(typecastItem);
}

export async function fetchItem(endpoint, id) {
  const response = await axios.get(`${API_URL}${endpoint}/${id}`);
  return typecastItem(response.data);
}

export async function postItem(endpoint, item) {
  const response = await axios.post(
    `${API_URL}${endpoint}`,
    typecastItem(item)
  );
  return response.data;
}

export async function hardDeleteItem(endpoint, id) {
  const old = await fetchItem(endpoint, id);
  await axios.post(`${API_URL}deleted-${endpoint}/`, old);
  await axios.delete(`${API_URL}${endpoint}/${id}`);
}

export async function updateItem(endpoint, id, item) {
  const response = await axios.patch(
    `${API_URL}${endpoint}/${id}`,
    typecastItem(item)
  );
  return typecastItem(response.data);
}

export async function deleteItem(endpoint, id) {
  await updateItem(endpoint, id, { deleted: true });
}

export async function undeleteAllItems(endpoint) {
  const items = await fetchItems(endpoint);
  items.forEach((item) => {
    updateItem(endpoint, item.id, { deleted: false });
  });
}
