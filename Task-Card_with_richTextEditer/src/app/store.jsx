import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slicer/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
