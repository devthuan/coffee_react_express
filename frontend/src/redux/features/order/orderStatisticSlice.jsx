import { createSlice } from "@reduxjs/toolkit";
import {
  GetOrdersAPI,
  GetOrdersDetailAPI,
} from "../../../services/UseServices";

// const loadState = async () => {
//   try {
//     const orders = await GetOrdersAPI();

//     if (orders && orders.status === 200) {
//       const data = orders.data.data;
//       const totalData = orders.data.total;
//       let success = 0,
//         failed = 0,
//         processing = 0;
//       data && data.map((item) => {
//         if (item.order_status === "Successful") {
//           success += 1;
//         } else if (item.order_status === "Failed") {
//           failed += 1;
//         } else if (item.order_status === "Processing") {
//           processing += 1;
//         }
//       });
//       return { data,  totalData, success, failed, processing };
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     console.error("Có lỗi xảy ra:", error);
//   }
// };
const loadState = async () => {
  try {
    const res = await GetOrdersAPI();
    if (res && res.status === 200 && res.data) {
      const data = res.data.data;
      const totalData = res.data.total;
      let success = 0,
        failed = 0,
        processing = 0;
      let list_data = [];
      let totalSales = 0;
      for (const item of data) {
        if (item.order_status === "Successful") {
          success += 1;
          totalSales += parseFloat(item.total_payment);
        } else if (item.order_status === "Failed") {
          failed += 1;
        } else if (item.order_status === "Processing") {
          processing += 1;
        }

        const order_id = item.id;
        const orderDetail = await GetOrdersDetailAPI(order_id);
        const itemOrderDetail = orderDetail.data.data;

        if (orderDetail && orderDetail.data) {
          list_data.push({
            id: item.id,
            product: itemOrderDetail,
            full_name: item.full_name,
            phone_number: item.phone_number,
            delivery_address: item.delivery_address,
            total_payment: item.total_payment,
            order_date: item.order_date,
            payment_methods: item.payment_methods,
            order_status: item.order_status,
          });
        }
      }

      return {
        data: list_data,
        totalData,
        totalSales,
        success,
        failed,
        processing,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const loadPersistedState = async () => {
  return await loadState();
};

const persistedState = await loadPersistedState();

const initialState = {
  data: [],
  totalData: 0,
  totalSales: 0,
  success: 0,
  failed: 0,
  processing: 0,
  loading: false,
  error: null,
};

export const orderStatisticSlice = createSlice({
  name: "counter",
  initialState: persistedState || initialState,
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
