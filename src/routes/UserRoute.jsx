import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductionPage from "@/pages/ProductionPage";
import HomePage from "@/pages/HomePage";

import ProductReportLayout from "@/layouts/ProductReportLayout";
import ProductionReportDay from "@/pages/factory_production/production_report/ProductionReportDay";
import ProductionReportWeek from "@/pages/factory_production/production_report/ProductionReportWeek"; 
import Production_Report_Month from "@/pages/factory_production/production_report/ProductionReportMonth";

import Daily_Factory_KPI from "@/pages/factory_production/Daily_Factory_KPI"
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
        path="/production-report-day"
        element={
          <ProductReportLayout>
            <ProductionReportDay />
          </ProductReportLayout>
        }
      />
      <Route
        path="/production-report-week"
        element={
          <ProductReportLayout>
            <ProductionReportWeek />
          </ProductReportLayout>
        }
      />
      <Route
        path="/production-report-month"
        element={
          <ProductReportLayout>
            <Production_Report_Month />
          </ProductReportLayout>
        }
      />

      {/*End Product Report Layout*/}
      <Route path="/production" element={<ProductionPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoute;
