import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  chartData: { categories: [], actual: [], unachieved: [], Target: [] },
  chartDataWeekSAMP: {Week:[], worker: []},
  chartDataWeekEfficiency: {Week:[], Factory_EFF:[]},
  chartDataWeekRFT: {week:[], RFT:[]}
};

const weekReportSlice = createSlice({
  name: "weekreport",
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

    setChartDataWeekSAMP: (state, action) => {
      const { Week, worker } = action.payload;
      if (Array.isArray(Week) && Array.isArray(worker)) {
        state.chartDataWeekSAMP = { Week, worker };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    setChartDataWeekEfficiency: (state, action) => {
      const { Week, Factory_EFF } = action.payload;
      if (Array.isArray(Week) && Array.isArray(Factory_EFF)) {
        state.chartDataWeekEfficiency = { Week, Factory_EFF };
      } else {
        state.error = "Invalid chart data format";
      }
    },
    setChartDataWeekRFT: (state, action) => {
      const { week, RFT } = action.payload;
      if (Array.isArray(week) && Array.isArray(RFT)) {
        state.chartDataWeekRFT = { week, RFT };
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
      state.chartDataWeekSAMP = {
        Week: [],
        worker: []
      };
      state.chartDataWeekEfficiency ={
        Week:[],
        Factory_EFF:[]
      };
      state.chartDataWeekRFT = {
        week:[],
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
  setChartDataWeekSAMP,
  setChartDataWeekEfficiency,
  setChartDataWeekRFT,
  resetState,
} = weekReportSlice.actions;
export default weekReportSlice.reducer;
