import { useState } from "react";
import WeekTotalOutputChart from "@/components/product_report_component/week_component/WeekTotalOutput";
import dayjs from "dayjs";
import WeekStitchingAssemblyMP from "@/components/product_report_component/week_component/WeekStitchingAssembly";
import WeekEfficiency from "@/components/product_report_component/week_component/WeekEfficiency";

import WeekRFT from "@/components/product_report_component/week_component/WeekRFT";

const Production_Report_Week = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <div className="grid grid-rows-2 gap-4 my-4 mx-1">
        <div className="grid grid-cols-2 gap-4">
          <WeekTotalOutputChart selectedDate={selectedDate} />
          <WeekStitchingAssemblyMP selectedDate={selectedDate} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <WeekEfficiency selectedDate={selectedDate} />
          <WeekRFT selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Production_Report_Week;
