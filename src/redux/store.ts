import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import { foodSlice } from "./reducer/food-slice";
export const makeStore  = () => configureStore({
  reducer: {
    // reference reducers here
    [foodSlice.name]: foodSlice.reducer,
  },
  devTools: true
})

// create types for state and dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper(makeStore, { debug: false });