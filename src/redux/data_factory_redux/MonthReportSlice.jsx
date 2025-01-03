import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  chartData: { categories: [], actual: [], unachieved: [], Target: [] },
  chartDataMonthSAMP: {Week:[], worker: []},
  chartDataMonthEfficiency: {Month:[], Factory_EFF:[]},
  chartDataMonthRFT: { Month:[], RFT:[]}
};

const weekReportSlice = createSlice({
  name: "monthreport",
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

    setChartDataMonthSAMP: (state, action) => {
      const { Week, worker } = action.payload;
      if (Array.isArray(Week) && Array.isArray(worker)) {
        state.chartDataMonthSAMP = { Week, worker };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    setChartDataMonthEfficiency: (state, action) => {
      const { Month, Factory_EFF } = action.payload;
      if (Array.isArray(Month) && Array.isArray(Factory_EFF)) {
        state.chartDataMonthEfficiency = { Month, Factory_EFF };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    setChartDataMonthRFT: (state, action) => {
      const { Month, RFT } = action.payload;
      if (Array.isArray(Month) && Array.isArray(RFT)) {
        state.chartDataMonthRFT = { Month, RFT };
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
      state.chartDataMonthSAMP = {
        Week: [],
        worker: []
      };
      state.chartDataMonthEfficiency ={
        Month:[],
        Factory_EFF:[]
      };
      state.chartDataMonthRFT = {
        Month:[],
        RFT:[]
      }
      
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setChartData,
  setChartDataMonthSAMP,
  setChartDataMonthEfficiency,
  setChartDataMonthRFT,
  resetState,
} = weekReportSlice.actions;
export default weekReportSlice.reducer;
