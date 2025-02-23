import axios from "axios";
import {API_URL} from "../utils/constants"
const baseURL = `${API_URL}products`;

const getAllProducts = () => axios.get(baseURL);
const getProductById = (productId) => axios.get(`${baseURL}/${productId}`);
const addNewProduct = (product) => axios.post(`${baseURL}`, product);
const deleteProduct = (productId) => axios.delete(`${baseURL}/${productId}`);
const editProduct = (productId, product) =>
	axios.put(`${baseURL}/${productId}`, product);

export {
	getAllProducts,
	getProductById,
	addNewProduct,
	deleteProduct,
	editProduct,
};
