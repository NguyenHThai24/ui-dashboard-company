import DigitalAndonCase from "../../components/daily_kpi_overview/DigitalAndonCase";
import EfficiencyChart from "../../components/daily_kpi_overview/EfficiencyChart";
import MaterialCallingKanban from "../../components/daily_kpi_overview/MaterialCallingKanban";
import RFTChart from "../../components/daily_kpi_overview/RFTChart";
import TotalActualOutput from "../../components/daily_kpi_overview/TotalActualOutput";
import TotalAttendanceWorker from "../../components/daily_kpi_overview/TotalAttendanceWorker";
import TotalOuputByArea from "../../components/daily_kpi_overview/TotalOuputByArea";

import Calendar from "../../components/common/Calendar";

const DailyKPIOverview = () => {
  return (
    <>
      <Calendar />
      <div className="grid gap-4 my-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TotalActualOutput />
          <EfficiencyChart />
          <RFTChart />
          <TotalAttendanceWorker />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TotalOuputByArea />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MaterialCallingKanban />
            <DigitalAndonCase />
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyKPIOverview;
