import axios, { AxiosResponse } from "axios";

export type product = {
  id?: string;
  title: string;
  price: number;
  description: string;
  categories: string[];
  image: string;
  deleted: boolean;
};

export async function fetchProducts() {
  const prods: AxiosResponse<product[]> = await axios.get(
    "http://localhost:3001/products"
  );
  const result: product[] = prods.data;
  return result;
}
export async function fetchProduct(id: string) {
  const prod = await axios.get(`http://localhost:3001/products/${id}`);
  return prod.data;
}

export async function postProduct(prod: product) {
  const result: AxiosResponse<product> = await axios.post(
    "http://localhost:3001/products",
    prod
  );
  return result.data;
}

export async function hardDeleteProduct(id: string) {
  await axios.delete(`http://localhost:3001/products/${id}`);
}

export async function updateProduct(id: string, prod: Partial<product>) {
  const oldProd: product = await fetchProduct(id);

  const product = { ...oldProd, ...prod };

  const result: AxiosResponse<product> = await axios.put(
    `http://localhost:3001/products/${id}`,
    product
  );
  return result.data;
}

export async function deleteProduct(id: string) {
  return await updateProduct(id, { deleted: true });
}

export async function undeleteAllProducts() {
  fetchProducts().then((prods) => {
    prods.forEach((prod) => {
      updateProduct(prod.id!, { deleted: false });
    });
  });
}
