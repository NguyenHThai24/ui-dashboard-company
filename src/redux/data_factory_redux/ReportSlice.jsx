import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  error: null,
  chartData: { categories: [], actual: [], unachieved: [], Target: [] },
  chartDataSAMP: { outputdate: [], worker: [] },
  chartDataEfficiency: { date: [], Factory_EFF: [] },
  chartDataRFT: { date: [], RFT: [] },
};

const reportSlice = createSlice({
  name: 'report',
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
        state.error = 'Invalid chart data format';
      }
    },
    setChartDataSAMP: (state, action) => {
      const { outputdate, worker, Week } = action.payload;
      if (
        Array.isArray(outputdate) ||
        (Array.isArray(Week) && Array.isArray(worker))
      ) {
        state.chartDataSAMP = { outputdate, worker, Week };
      } else {
        state.error = 'Invalid chart data format';
      }
    },
    setChartDataEfficiency: (state, action) => {
      const { date, Week, Month, Factory_EFF } = action.payload;
      if (
        Array.isArray(date) ||
        Array.isArray(Week) ||
        (Array.isArray(Month) && Array.isArray(Factory_EFF))
      ) {
        state.chartDataEfficiency = { date, Week, Month, Factory_EFF };
      } else {
        state.error = 'Invalid chart data format';
      }
    },
    setChartDataRFT: (state, action) => {
      const { date, RFT, week, Month } = action.payload;
      if (
        Array.isArray(date) ||
        Array.isArray(week) ||
        (Array.isArray(Month) && Array.isArray(RFT))
      ) {
        state.chartDataRFT = { date, RFT, week, Month };
      } else {
        state.error = 'Invalid chart data format';
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
      state.chartDataSAMP = { worker: [] };
      state.chartDataEfficiency = { Factory_EFF: [] };
      state.chartDataRFT = { RFT: [] };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setChartData,
  setChartDataSAMP,
  setChartDataEfficiency,
  setChartDataRFT,
  resetState,
} = reportSlice.actions;
export default reportSlice.reducer;
