// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import userReducer from '../Slicer/userSlice'

// const store = configureStore({
//     reducer: {
//         userInfo: userReducer
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slicer/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
