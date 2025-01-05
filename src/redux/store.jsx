import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "@/redux/languageSlice";
import loadingReducer from "@/redux/loading/loadingSlice";

import weekReportReducer from "@/redux/data_factory_redux/WeekReportSlice";
import monthReportReducer from "@/redux/data_factory_redux/MonthReportSlice";
import dayReportReducer from "@/redux/data_factory_redux/DayReportSlice"

import buildingAReducer from "@/redux/data_building_redux/BuildingASlice";
import buildingBReducer from "@/redux/data_building_redux/BuidingBSlice";
import buildingCReducer from "@/redux/data_building_redux/BuildingCSlice";
import buildingGReducer from "@/redux/data_building_redux/BuildingGSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    loading: loadingReducer,

    // daily report factory
    dayreport: dayReportReducer,
    weekreport: weekReportReducer,
    monthreport: monthReportReducer,

    // daily report buildingASlice
    buildinga: buildingAReducer,
    buildingb: buildingBReducer,
    buildingc: buildingCReducer,
    buildingg: buildingGReducer,
  },
});
export default store;
