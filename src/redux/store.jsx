import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@/redux/languageSlice";

import loadingReducer from "@/redux/loading/loadingSlice";
import weekReportReducer from "@/redux/data_redux/WeekReportSlice";
import monthReportReducer from "@/redux/data_redux/MonthReportSlice";

import buildingAReducer from "@/redux/data_building_redux/BuildingASlice"

const store = configureStore({
  reducer: {
    language: languageReducer,

    // daily report factory
    loading: loadingReducer,
    weekreport: weekReportReducer,
    monthreport: monthReportReducer,

    // daily report buildingASlice
    buildinga: buildingAReducer,
  },
});
export default store;
