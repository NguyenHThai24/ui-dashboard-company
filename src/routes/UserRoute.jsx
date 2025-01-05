import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductionPage from "@/pages/ProductionPage";
import HomePage from "@/pages/HomePage";

import ProductionReportDay from "@/pages/factory_production/production_report/factory/ProductionReportDay";
import ProductionReportWeek from "@/pages/factory_production/production_report/factory/ProductionReportWeek"; 
import Production_Report_Month from "@/pages/factory_production/production_report/factory/ProductionReportMonth";

import Building from "@/pages/factory_production/production_report/building/Building"

import Daily_Factory_KPI from "@/pages/factory_production/daily_factory_kpi/Daily_Factory_KPI"

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

      {/*Start Product Report Layout*/}
      <Route
        path="/production-report/factory-day"
        element={
            <ProductionReportDay />
        }
      />
      <Route
        path="/production-report/factory-week"
        element={
            <ProductionReportWeek />
        }
      />
      <Route
        path="/production-report/factory-month"
        element={
            <Production_Report_Month />
        }
      />
      {/*End Product Report Layout*/}
      <Route  path="/production-report/building" element={<Building/>}/>
      <Route path="/production" element={<ProductionPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoute;
