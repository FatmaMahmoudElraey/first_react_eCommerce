import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import {
  deleteProduct,
  fetchProducts,
  postProduct,
  updateProduct,
} from "../utils/product-helpers";

// export type productState = {
//   products: product[];
//   isLoading: boolean;
//   errors: unknown;
// };

const initialState = {
  products: [],
  isLoading: true,
  errors: null,
};

export const getProductsAction = createAsyncThunk(
  "product/getProducts",
  async (_ /* args are unneeded */, { rejectWithValue }) => {
    try {
      const res  = await fetchProducts();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addProductAction = createAsyncThunk(
  "product/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await postProduct(product);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editProductAction = createAsyncThunk(
  "product/editProduct",
  async (
    { id, product },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateProduct(id, product);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const deleteProductAction = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts: (state, action) => {
    //   return action.payload;
    // },
    // addProduct: (state, action) => {
    //   state.products.push(action.payload);
    // },
    // updateProduct: (state, action) => {
    //   const index = state.products.findIndex((obj) => obj.id === action.payload.id);
    //   state.products[index] = action.payload;
    // },
    // deleteProduct: (state, action) => {
    //   return {...state, products: state.products.filter((obj) => obj.id !== action.payload)};
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.errors = action.payload;
    });
    builder.addCase(editProductAction.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.products[index] = action.payload;
    });
    builder.addCase(editProductAction.rejected, (state, action) => {
      state.errors = action.payload;
    });
  },
});

// // export const { setProducts, addProduct, updateProduct, deleteProduct } =
//   productSlice.actions;
export const productReducer = productSlice.reducer;
