import { useState } from "react";
import dayjs from "dayjs";

import MonthTotalOutputChart from "@/components/product_report_component/factory_components/month_component/MonthTotalOutput";
import MonthStitchingAssemblyMP from "@/components/product_report_component/factory_components/month_component/MonthStitchingAssemblyMP";
import MonthEfficiency from "@/components/product_report_component/factory_components/month_component/MonthEfficiency";
import MonthRFT from "@/components/product_report_component/factory_components/month_component/MonthRFT";
import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport";

import ButtonTime from "@/components/product_report_component/factory_components/ButtonTime";

const Production_Report_Month = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
     <HeaderProductReport selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
       <ButtonTime/>
      <div className="grid grid-rows-2 gap-4 my-4 mx-1">
        <div className="grid grid-cols-2 gap-4">
          <MonthTotalOutputChart selectedDate={selectedDate} />
          <MonthStitchingAssemblyMP selectedDate={selectedDate} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MonthEfficiency selectedDate={selectedDate} />
          <MonthRFT selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Production_Report_Month;
