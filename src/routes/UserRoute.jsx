import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductionPage from "@/pages/ProductionPage";
import HomePage from "@/pages/HomePage";
import Daily_Factory_KPI from "@/pages/factory_production/Daily_Factory_KPI";
import Production_Report from "@/pages/factory_production/Production_Report"
const UserRoute = () => (
  <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<DefaultLayout />}>
        <Route
          path="/"
          element={<HomePage/>}
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
          path="/production-report"
          element={
            <HomePage>
              <Production_Report />
            </HomePage>
          }
        />

         <Route
          path="/production"
          element={<ProductionPage/>}
        />
      </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoute;
