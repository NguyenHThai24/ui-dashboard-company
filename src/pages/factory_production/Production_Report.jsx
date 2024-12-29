import React, { useState } from "react";
import DailyTotalOutputChart from "@/components/product_report_component/day_component/DailyTotalOutputChart";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import dayjs from "dayjs";

const Production_Report = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Calendar
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className="grid grid-rows-2 gap-4 m-4">
        <div className="grid grid-cols-2 gap-4">
          <DailyTotalOutputChart selectedDate={selectedDate} />
          <DailyTotalOutputChart selectedDate={selectedDate} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DailyTotalOutputChart selectedDate={selectedDate} />
          <DailyTotalOutputChart selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Production_Report;
