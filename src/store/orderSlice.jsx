import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import {
    fetchItems,
    postItem,
    updateItem,
    deleteItem,
  } from "../utils/api-helpers";
  
  

  const initialState = {
    orders: [],
    isLoading: true,
    errors: null,
  };
  
  export const getOrdersAction = createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetchItems("orders");
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  export const addOrderAction = createAsyncThunk(
    "orders/addOrder",
    async (order, { rejectWithValue }) => {
      try {
        const res = await postItem("orders",order);
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  export const editOrderAction = createAsyncThunk(
    "orders/editOrder",
    async (
      { id, order },
      { rejectWithValue }
    ) => {
      try {
        const res = await updateItem("orders",id, order);
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  export const deleteOrderAction = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
      try {
        await deleteItem("orders",id);
        return id;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      // setOrders: (state, action) => {
      //   return action.payload;
      // },
      // addOrder: (state, action) => {
      //   state.orders.push(action.payload);
      // },
      // updateOrder: (state, action) => {
      //   const index = state.orders.findIndex((obj) => obj.id === action.payload.id);
      //   state.orders[index] = action.payload;
      // },
      // deleteOrder: (state, action) => {
      //   return {...state, orders: state.orders.filter((obj) => obj.id !== action.payload)};
      // },
    },
    extraReducers: (builder) => {
      builder.addCase(getOrdersAction.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getOrdersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
      builder.addCase(getOrdersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
      builder.addCase(deleteOrderAction.fulfilled, (state, action) => {
        state.orders = state.orders.map((p) => p.id === action.payload ? { ...p, deleted: true } : p);
      });
      builder.addCase(addOrderAction.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
      builder.addCase(addOrderAction.rejected, (state, action) => {
        state.errors = action.payload;
      });
      builder.addCase(editOrderAction.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (obj) => obj.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
      builder.addCase(editOrderAction.rejected, (state, action) => {
        state.errors = action.payload;
      });
    },
  });
  
  // // export const { setOrders, addOrder, updateOrder, deleteOrder } =
  //   orderSlice.actions;
  export const orderReducer = orderSlice.reducer;
  