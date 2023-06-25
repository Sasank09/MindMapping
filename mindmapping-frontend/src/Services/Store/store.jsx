import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../Slice/auth";
import messageReducer from "../Slice/message";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;