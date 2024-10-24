const API_URL = "http://localhost:3000/api/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addProduct = async (product: {
  name: string;
  price: number;
  description: string;
  quantity: number;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (
  id: string,
  product: {
    name: string;
    price: number;
    description: string;
    quantity: number;
  },
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
