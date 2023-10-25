import api from "./api";

export const GetUser = (page) => {
  return api.get(`user?page=${page}`);
};
export const UpdateStatusAccount = (user_id, new_status) => {
  return api.patch(`status`, { user_id, new_status });
};

export const SearchUser = (value) => {
  return api.get(`search?key=${value}`);
};

export const GetOrdersAPI = (page) => {
  return api.get(`order-all?=${page}`);
};

export const GetOrdersByUserIdAPI = () => {
  return api.get(`order`);
};

export const GetOrdersDetailAPI = (order_id) => {
  return api.get(`order-detail/${order_id}`);
};
export const GetProductAPI = (page) => {
  return api.get(`product?page=${page}`);
};

export const GetCartAPI = () => {
  return api.get("cart");
};
export const DeleteCartAPI = () => {
  return api.delete(`cart`);
};
export const DeleteItemCartAPI = (cart_id) => {
  return api.delete(`cart/${cart_id}`);
};
export const UpdateQuantityCart = (cart_id, quantity) => {
  return api.patch(`cart/${cart_id}`, { quantity });
};

export const AddCartAPI = (product_id, quantity) => {
  return api.post(`cart`, { product_id, quantity });
};

export const UpdateStatusOrder = (order_id, order_status) => {
  return api.patch(`status-order`, { order_id, order_status });
};

export const AddOrderAPI = (
  full_name,
  phone_number,
  delivery_address,
  payment_method,
  order_status
) => {
  return api.post(`order`, {
    full_name,
    phone_number,
    delivery_address,
    payment_method,
    order_status,
  });
};
export const AddOrderDetailAPI = (order_id, products) => {
  return api.post(`order-detail`, { order_id, products });
};

export const RegisterAPI = (full_name, phone_number, password) => {
  return api.post(`register/`, {
    full_name,
    phone_number,
    password,
  });
};

export const LogOut = () => {
  return api.post(`logout`, {});
};

export const AddItemCart = (product_id, quantity) => {
  return api.post(`cart/`, { product_id, quantity });
};
// export const CartUpdateQuantity = (product_id, quantity) => {
//   return api.post(`cart/${product_id}`, { quantity });
// };
