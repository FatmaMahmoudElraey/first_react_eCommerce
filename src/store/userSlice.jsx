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
    users: [],
    isLoading: true,
    errors: null,
  };
  
  export const getUsersAction = createAsyncThunk(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetchItems("users");
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  export const addUserAction = createAsyncThunk(
    "users/addUser",
    async (user, { rejectWithValue }) => {
      try {
        const res = await postItem("users",user);
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  export const editUserAction = createAsyncThunk(
    "users/editUser",
    async (
      { id, user },
      { rejectWithValue }
    ) => {
      try {
        const res = await updateItem("users",id, user);
        return res;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  export const deleteUserAction = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        await deleteItem("users",id);
        return id;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      // setUsers: (state, action) => {
      //   return action.payload;
      // },
      // addUser: (state, action) => {
      //   state.users.push(action.payload);
      // },
      // updateUser: (state, action) => {
      //   const index = state.users.findIndex((obj) => obj.id === action.payload.id);
      //   state.users[index] = action.payload;
      // },
      // deleteUser: (state, action) => {
      //   return {...state, users: state.users.filter((obj) => obj.id !== action.payload)};
      // },
    },
    extraReducers: (builder) => {
      builder.addCase(getUsersAction.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getUsersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      });
      builder.addCase(getUsersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
      builder.addCase(deleteUserAction.fulfilled, (state, action) => {
        state.users = state.users.map((p) => p.id === action.payload ? { ...p, deleted: true } : p)
      });
      builder.addCase(addUserAction.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
      builder.addCase(addUserAction.rejected, (state, action) => {
        state.errors = action.payload;
      });
      builder.addCase(editUserAction.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (obj) => obj.id === action.payload.id
        );
        state.users[index] = action.payload;
      });
      builder.addCase(editUserAction.rejected, (state, action) => {
        state.errors = action.payload;
      });
    },
  });
  
  // // export const { setUsers, addUser, updateUser, deleteUser } =
  //   userSlice.actions;
  export const userReducer = userSlice.reducer;
  