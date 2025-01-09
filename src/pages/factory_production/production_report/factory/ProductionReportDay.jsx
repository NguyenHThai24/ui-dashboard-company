import { useState } from "react";
import dayjs from "dayjs";

import DailyTotalOutputChart from "@/components/product_report_component/factory_components/day_component/DailyTotalOutputChart";
import DailyStitchingAssemblyMP from "@/components/product_report_component/factory_components/day_component/DailyStitchingAssemblyMP";
import DailyEfficiency from "@/components/product_report_component/factory_components/day_component/DailyEfficiency";
import DailyRFT from "@/components/product_report_component/factory_components/day_component/DailyRFT";

import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport";
import ButtonTime from "@/components/product_report_component/factory_components/ButtonTime";

const Production_Report = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <HeaderProductReport selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ButtonTime />
      <div className="grid gap-4 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyTotalOutputChart selectedDate={selectedDate} />
          <DailyStitchingAssemblyMP selectedDate={selectedDate} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyEfficiency selectedDate={selectedDate} />
          <DailyRFT selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Production_Report;
