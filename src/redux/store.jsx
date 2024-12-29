import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/redux/loading/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    // Các reducer khác nếu cần
  },
});

export default store;
