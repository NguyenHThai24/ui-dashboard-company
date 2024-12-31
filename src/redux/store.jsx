import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/redux/loading/loadingSlice";
import weekReportReducer from "@/redux/data_redux/WeekReportSlice";
import monthReportReducer from "@/redux/data_redux/MonthReportSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    weekreport: weekReportReducer,
    monthreport: monthReportReducer
  },
});

export default store;
