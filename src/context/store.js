import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers/userSlice";


export const store = configureStore({
    reducer: {
        data: dataReducer
    }
})