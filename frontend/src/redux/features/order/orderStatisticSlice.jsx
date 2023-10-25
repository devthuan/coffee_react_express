import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalData: 0,
  data: [
    // {
    //   id: 1,
    //   product: [
    //     {
    //       id: 0,
    //       name_product: "Cà phê đen",
    //       price: 25000,
    //       image_product: ProductIMG,
    //       quantity: 1,
    //     },
    //   ],
    //   full_name: "Trần Phước Thuận",
    //   phone_number: "0945986661",
    //   delivery_address: "tân phú",
    //   totalPayment: 40000,
    //   order_date: "14:42",
    //   payment_methods: "Thanh toán khi nhận hàng",
    //   order_status: "Chờ",
    // },
  ],
  loading: false,
  error: null,
};

export const orderStatisticSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTotalDataOrder: (state, action) => {
      state.totalData = action.payload;
    },
    addOrderStatistic: (state, action) => {
      state.data.push(action.payload);
    },
    removeOrderStatistic: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setStatusOrderStatistic: (state, action) => {
      const { orderId, newStatus } = action.payload;

      state.data = state.data.map((item) =>
        item.id === orderId ? { ...item, order_status: newStatus } : item
      );

      const orderToUpdate = state.data.find((item) => item.id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = newStatus;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTotalDataOrder,
  addOrderStatistic,
  removeOrderStatistic,
  setStatusOrderStatistic,
} = orderStatisticSlice.actions;

export default orderStatisticSlice.reducer;
