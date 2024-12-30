import { useState } from "react";
import DailyTotalOutputChart from "@/components/product_report_component/day_component/DailyTotalOutputChart";
//import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import dayjs from "dayjs";
import DailyStitchingAssemblyMP from "@/components/product_report_component/day_component/DailyStitchingAssemblyMP";
import DailyEfficiency from "@/components/product_report_component/day_component/DailyEfficiency";

import DailyRFT from "@/components/product_report_component/day_component/DailyRFT";

const Production_Report = ({ selectedDate }) => {
  //const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <div className="grid grid-rows-2 gap-4 m-4">
        <div className="grid grid-cols-2 gap-4">
          <DailyTotalOutputChart selectedDate={selectedDate} />
          <DailyStitchingAssemblyMP selectedDate={selectedDate} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DailyEfficiency selectedDate={selectedDate} />
          <DailyRFT selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Production_Report;
