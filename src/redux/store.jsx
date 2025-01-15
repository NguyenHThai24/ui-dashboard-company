import { configureStore } from '@reduxjs/toolkit';

import languageReducer from '@/redux/languageSlice';
import sidebarReducer from '@/redux/SidebarSlice';
import loadingReducer from '@/redux/loading/loadingSlice';

import ReportReducer from '@/redux/data_factory_redux/ReportSlice';
import buildingReducer from '@/redux/data_building_redux/BuildingSlice';

import downTimeReducer from '@/redux/downTimeSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    sidebar: sidebarReducer,
    loading: loadingReducer,

    //  report factory
    report: ReportReducer,
    // daily report buildingASlice
    building: buildingReducer,

    downtime: downTimeReducer,
  },
});
export default store;
