import { useState } from "react";
import dayjs from "dayjs";

import TotalOutputChart from "@/components/product_report_component/factory_components/day_component/TotalOutputChart";
import StitchingAssemblyMPChart from "@/components/product_report_component/factory_components/day_component/StitchingAssemblyMPChart";
import EfficiencyChart from "@/components/product_report_component/factory_components/day_component/EfficiencyChart";
import RFTChart from "@/components/product_report_component/factory_components/day_component/RFTChart";

import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport";
import ButtonTime from "@/components/product_report_component/factory_components/ButtonTime";

const Production_Report = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timePeriod, setTimePeriod] = useState("day"); // Lưu trạng thái timePeriod

  const handleTimePeriodChange = (newTimePeriod) => {
    // console.log(newTimePeriod);
    
    setTimePeriod(newTimePeriod); // Cập nhật trạng thái timePeriod
  };




  return (
    <>
      <HeaderProductReport selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ButtonTime onTimePeriodChange={handleTimePeriodChange} />
      <div className="grid gap-4 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TotalOutputChart selectedDate={selectedDate} timePeriod={timePeriod} />
          <StitchingAssemblyMPChart selectedDate={selectedDate} timePeriod={timePeriod} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EfficiencyChart selectedDate={selectedDate} timePeriod={timePeriod} />
          <RFTChart selectedDate={selectedDate} timePeriod={timePeriod} />
        </div>
      </div>
    </>
  );
};

export default Production_Report;
