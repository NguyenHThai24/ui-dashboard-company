import { useState } from "react";
import TotalOutputChart from "@/components/product_report_component/month_component/MonthTotalOutput";
import dayjs from "dayjs";
import MonthStitchingAssemblyMP from "@/components/product_report_component/month_component/MonthStitchingAssemblyMP";
import MonthEfficiency from "@/components/product_report_component/month_component/MonthEfficiency";

import MonthRFT from "@/components/product_report_component/month_component/MonthRFT";

const Production_Report_Month = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <div className="grid grid-rows-2 gap-4 my-4 mx-1">
        <div className="grid grid-cols-2 gap-4">
          <TotalOutputChart selectedDate={selectedDate} />
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
