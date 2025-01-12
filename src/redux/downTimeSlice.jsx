import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  chartData: { name: [], total: [] },
  chartDataFixed: { name: [], total: [] },
  chartRepairingTime:{ name: [], waitingTime: [], repairingTime: []},
  chartMostDowntime:{Name_en: [], total: [],},
  chartMostBreakdown:{Name_en: [], total: [],},
};

const downTimeSlice = createSlice({
  name: "downtime",
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
      const { name, total } = action.payload;
      if (
        Array.isArray(name) &&
        Array.isArray(total) 
      ) {
        state.chartData = { name, total };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    setChartDataFixed: (state, action) => {
      const { name, total } = action.payload;
      if (
        Array.isArray(name) &&
        Array.isArray(total) 
      ) {
        state.chartDataFixed = { name, total };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    setChartRepairingTime: (state, action) => {
      const { name, waitingTime,repairingTime } = action.payload;
      if (
        Array.isArray(name) &&
        Array.isArray(waitingTime) &&
        Array.isArray(repairingTime)
      ) {
        state.chartRepairingTime = { name, waitingTime,repairingTime };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    //MOST DOWNTIME BY MACHINE TYPE (MIN)
    setChartMostDowntime: (state, action) => {
      const { Name_en, total } = action.payload;
      if (
        Array.isArray(Name_en) &&
        Array.isArray(total) 
      ) {
        state.chartMostDowntime = { Name_en, total };
      } else {
        state.error = "Invalid chart data format";
      }
    },
  
    //MOST BREAKDOWN BY MACHINE TYPE (COUNT)
    setChartMostBreakdown: (state, action) => {
      const { Name_en, total } = action.payload;
      if (
        Array.isArray(Name_en) &&
        Array.isArray(total) 
      ) {
        state.chartMostBreakdown = { Name_en, total };
      } else {
        state.error = "Invalid chart data format";
      }
    },

    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.chartData = {
        name: [],
        total: []
      },
      state.chartDataFixed = {
        name: [],
        total:[]
      },
      state.chartRepairingTime ={
        name: [],
        waitingTime: [],
        repairingTime: []
      },
      state.chartMostDowntime ={
        Name_en: [],
        total: [],
      },
      state.chartMostBreakdown ={
        Name_en: [],
        total: [],
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setChartData,
 setChartDataFixed,
 setChartRepairingTime,
 setChartMostDowntime,
 setChartMostBreakdown,
  resetState,
} = downTimeSlice.actions;
export default downTimeSlice.reducer;
