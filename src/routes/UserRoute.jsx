import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductionPage from "@/pages/ProductionPage";
import HomePage from "@/pages/HomePage";


import Daily_Factory_KPI from "@/pages/factory_production/daily_factory_kpi/Daily_Factory_KPI"
import Building from "@/pages/factory_production/production_report/building/Building"

import DailyEfficiencyReport from "@/pages/factory_production/DailyEfficiencyReport";
import DailyKPIOverview from "@/pages/factory_production/DailyKPIOverview"
import ProdHourlyOutput from "@/pages/factory_production/ProductionHourlyOutput";

import KaizenPage from "@/pages/KaizenPage";
import ProductionReport from "../pages/factory_production/production_report/factory/ProductionReport";
import DownTimePage from "../pages/DownTimePage";

const UserRoute = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<DefaultLayout />}>
     
    <Route
        path="/"
        element={
            <HomePage />
        }
      />

    <Route
        path="/factory-kpi"
        element={
          <HomePage>
            <Daily_Factory_KPI />
          </HomePage>
        }
      />

       <Route
        path="/daily-efficiency"
        element={
          <HomePage>
            <DailyEfficiencyReport />
          </HomePage>
        }
      />

      <Route
        path="/daily-kpi-overview"
        element={
          <HomePage>
            <DailyKPIOverview />
          </HomePage>
        }
      />

    <Route
        path="/production-hourly-output"
        element={
          <HomePage>
            <ProdHourlyOutput />
          </HomePage>
        }
      />

<Route
        path="/kaizen"
        element={
          <HomePage>
            <KaizenPage />
          </HomePage>
        }
      />

      <Route
        path="/production-report"
        element={
            <ProductionReport />
        }
      />

      <Route
        path="/down-time"
        element={
            <DownTimePage />
        }
      />
   
      <Route  path="/production-report/building" element={<Building/>}/>
      <Route path="/production" element={<ProductionPage />} />
      
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoute;
