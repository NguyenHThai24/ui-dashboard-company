import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  chartDataEfficiency: { line: [], EFF: [] },
  chartDataRFT: {line: [], rft: []}
  
};

const buildingBSlice = createSlice({
    name: "buildingb", 
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
      setChartDataEfficiency: (state, action) => {
        const { line, EFF } = action.payload;
        if (Array.isArray(line) && Array.isArray(EFF)) {
          state.chartDataEfficiency = { line, EFF };
        } else {
          state.error = "Invalid chart data format";
        }
      },

      setChartDataRFT: (state, action) => {
        const { line, rft } = action.payload;
        if (Array.isArray(line) && Array.isArray(rft)) {
          state.chartDataRFT = { line, rft };
        } else {
          state.error = "Invalid chart data format";
        }
      },

      resetState: (state) => {
        state.loading = false;
        state.error = null;
        state.chartDataEfficiency = { line: [], EFF: [] };
        state.chartDataRFT = { line : [], rft: []}
      },
    },
  });
  
  export const {
    setLoading,
    setError,
    clearError,
    setChartDataEfficiency,
    setChartDataRFT,
    resetState,
  } = buildingBSlice.actions;
  
  export default buildingBSlice.reducer;
  