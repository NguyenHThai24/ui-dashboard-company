import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  chartData: { categories: [], data: [] }, // Khởi tạo chartData với default values
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload; // Cập nhật chartData từ Redux
    },
  },
});

export const { setLoading, setError, clearError, setChartData } =
  loadingSlice.actions;
export default loadingSlice.reducer;
