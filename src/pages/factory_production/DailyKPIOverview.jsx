import DigitalAndonCase from '../../components/daily_kpi_overview/DigitalAndonCase';
import EfficiencyChart from '../../components/daily_kpi_overview/EfficiencyChart';
import MaterialCallingKanban from '../../components/daily_kpi_overview/MaterialCallingKanban';
import RFTChart from '../../components/daily_kpi_overview/RFTChart';
import TotalActualOutput from '../../components/daily_kpi_overview/TotalActualOutput';
import TotalAttendanceWorker from '../../components/daily_kpi_overview/TotalAttendanceWorker';
import TotalOuputByArea from '../../components/daily_kpi_overview/TotalOuputByArea';

import Calendar from '../../components/common/Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';
const DailyKPIOverview = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Calendar onDateChange={handleDateChange} />
      <div className="grid gap-4 my-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TotalActualOutput date={selectedDate} />
          <EfficiencyChart date={selectedDate} />
          <RFTChart date={selectedDate} />
          <TotalAttendanceWorker date={selectedDate} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TotalOuputByArea date={selectedDate} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MaterialCallingKanban date={selectedDate} />
            <DigitalAndonCase date={selectedDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyKPIOverview;
