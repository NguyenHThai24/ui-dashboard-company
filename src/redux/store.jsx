import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "@/redux/languageSlice";
import sidebarReducer from "@/redux/SidebarSlice"
import loadingReducer from "@/redux/loading/loadingSlice";


import ReportReducer from "@/redux/data_factory_redux/ReportSlice"

import buildingReducer from "@/redux/data_building_redux/BuildingSlice";
// import buildingBReducer from "@/redux/data_building_redux/BuidingBSlice";
// import buildingCReducer from "@/redux/data_building_redux/BuildingCSlice";
// import buildingGReducer from "@/redux/data_building_redux/BuildingGSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    sidebar: sidebarReducer,
    loading: loadingReducer,

    //  report factory
    report: ReportReducer,
   

    // daily report buildingASlice
    building: buildingReducer,
    // buildingb: buildingBReducer,
    // buildingc: buildingCReducer,
    // buildingg: buildingGReducer,
  },
});
export default store;
