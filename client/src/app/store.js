import { configureStore } from "@reduxjs/toolkit";
import weatheReducer from "../features/weather/weatherSlice";

export const store = configureStore({
    reducer:{
        weatherApp:weatheReducer,
    }
})