import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  chartData: { categories: [], actual: [], unachieved: [], Target: [] },
  chartDataDailySAMP: { outputdate: [], worker: [] },
  chartDataDailyEfficiency: { date: [], Factory_EFF: [] },
  chartDataDailyRFT: { date: [], RFT: [] },
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
      const { categories, actual, unachieved, Target } = action.payload;
      if (
        Array.isArray(categories) &&
        Array.isArray(actual) &&
        Array.isArray(unachieved) &&
        Array.isArray(Target)
      ) {
        state.chartData = { categories, actual, unachieved, Target };
      } else {
        state.error = "Invalid chart data format";
      }
    },
    setChartDataDailySAMP: (state, action) => {
      const { outputdate, worker } = action.payload;
      if (Array.isArray(outputdate) && Array.isArray(worker)) {
        state.chartDataDailySAMP = { outputdate, worker };
      } else {
        state.error = "Invalid chart data format";
      }
    },
    setChartDataDailyEfficiency: (state, action) => {
      const { date, Factory_EFF } = action.payload;
      if (Array.isArray(date) && Array.isArray(Factory_EFF)) {
        state.chartDataDailyEfficiency = { date, Factory_EFF };
      } else {
        state.error = "Invalid chart data format";
      }
    },
    setChartDataDailyRFT: (state, action) => {
      const { date, RFT } = action.payload;
      if (Array.isArray(date) && Array.isArray(RFT)) {
        state.chartDataDailyRFT = { date, RFT };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.chartData = {
        categories: [],
        actual: [],
        unachieved: [],
        Target: [],
      };
      state.chartDataDailySAMP = { worker: [] };
      state.chartDataDailyEfficiency = { Factory_EFF: [] };
      state.chartDataDailyRFT = { RFT: [] };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setChartData,
  setChartDataDailySAMP,
  setChartDataDailyEfficiency,
  setChartDataDailyRFT,
  resetState,
} = loadingSlice.actions;
export default loadingSlice.reducer;
