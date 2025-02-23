import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { orderReducer } from "./orderSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
    reducer:{
        productSlice:productReducer,
        userSlice:userReducer,
        orderSlice:orderReducer
    },
    
})