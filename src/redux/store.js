// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from "../Data/data.json";

console.log("Data from JSON file:", data);

const navDataSlice = createSlice({
  name: "navData",
  initialState: data, // Use data from the JSON file as the initial state
  reducers: {},
});

const rootReducer = {
  navData: navDataSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
