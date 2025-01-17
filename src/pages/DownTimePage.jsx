import { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Calendar from '../components/common/Calendar';
import FloorLineList from '../components/down_time_component/FloorLineList';
import CardBreakdown from '../components/down_time_component/floor_data/CardBreakDown';
import CardMachineDown from '../components/down_time_component/floor_data/CardMachineDown';
import CardRepairingTime from '../components/down_time_component/floor_data/CardRepairingTime';
import MachineBreakByLineChart from '../components/down_time_component/floor_data/MachineBreakByLineChart';
import MachineDowntimeByLineChart from '../components/down_time_component/floor_data/MachineDowntimeByLineChart';
import RepairingTimeChart from '../components/down_time_component/floor_data/RepairingTimeChart';
import MostDowntimeChart from '../components/down_time_component/floor_data/MostDowntimeChart';
import MostBreakdownChart from '../components/down_time_component/floor_data/MostBreakdownChart';
import MostRepairingChart from '../components/down_time_component/floor_data/MostRepairingChart';
import TotalMachineChart from '../components/down_time_component/floor_data/TotalMachineChart';
import TableMechanicList from '../components/down_time_component/floor_data/TableMechanicList';
import ReasonMinChart from '../components/down_time_component/floor_data/ReasonMinChart';
import TotalReasonChart from '../components/down_time_component/floor_data/TotalReasonChart';
import RepairingMethodChart from '../components/down_time_component/floor_data/RepairingMethodChart';
import TableRepairingStatus from '../components/down_time_component/floor_data/TableRepairingStatus';

const DownTimePage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleFloorChange = (floorAlias) => {
    setSelectedFloor(floorAlias);
    setSelectedLine(null); // Reset line when a new floor is selected
  };

  const handleFloorLineChange = (lineAlias) => {
    setSelectedLine(lineAlias); // Update selected line
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode); // Update mode
    setSelectedFloor(null); // Reset floor
    setSelectedLine(null); // Reset line
  };

  return (
    <div>
      <FloorLineList
        onFloorChange={handleFloorChange}
        onLineChange={handleFloorLineChange}
        onModeChange={handleModeChange}
      />

      <div className="flex gap-4">
        <Calendar onDateChange={handleDateChange} />
        <Link to="/report-downtime">
          <img
            src="../../public/images/excel.png"
            alt="Export to Excel"
            style={{
              height: '40px',
              width: '40px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          />
        </Link>
      </div>

      <section className="grid grid-cols-12 gap-4">
        <div className="grid col-span-8 grid-rows-[166px,350px]">
          <div className="grid row-span-1 h-[150px]">
            <div className="grid grid-cols-8 gap-4">
              <div className="grid col-span-2">
                <CardBreakdown
                  date={selectedDate}
                  floor={selectedFloor}
                  line={selectedLine}
                  mode={selectedMode}
                />
              </div>
              <div className="grid col-span-4">
                <CardMachineDown
                  date={selectedDate}
                  floor={selectedFloor}
                  line={selectedLine}
                  mode={selectedMode}
                />
              </div>
              <div className="grid col-span-2">
                <CardRepairingTime
                  date={selectedDate}
                  floor={selectedFloor}
                  line={selectedLine}
                  mode={selectedMode}
                />
              </div>
            </div>
          </div>

          <div className="grid row-span-1 grid-cols-3 gap-4 h-auto">
            <MachineBreakByLineChart
              date={selectedDate}
              floor={selectedFloor}
              line={selectedLine}
              mode={selectedMode}
            />
            <MachineDowntimeByLineChart
              date={selectedDate}
              floor={selectedFloor}
              line={selectedLine}
              mode={selectedMode}
            />
            <RepairingTimeChart
              date={selectedDate}
              floor={selectedFloor}
              line={selectedLine}
              mode={selectedMode}
            />
          </div>
        </div>

        <div
          className="grid col-span-4 w-full overflow-auto rounded-lg"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          <TableRepairingStatus
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
        </div>
      </section>

      <section className="my-4 grid grid-cols-4 gap-4">
        <MostBreakdownChart
          date={selectedDate}
          floor={selectedFloor}
          line={selectedLine}
          mode={selectedMode}
        />
        <MostDowntimeChart
          date={selectedDate}
          floor={selectedFloor}
          line={selectedLine}
          mode={selectedMode}
        />
        <MostRepairingChart
          date={selectedDate}
          floor={selectedFloor}
          line={selectedLine}
          mode={selectedMode}
        />
        <TotalMachineChart
          date={selectedDate}
          floor={selectedFloor}
          line={selectedLine}
          mode={selectedMode}
        />
      </section>

      <section className="grid grid-cols-12 gap-4 grid-rows-[350px] pb-4">
        <div className="grid grid-cols-3 col-span-8 gap-4">
          <TotalReasonChart
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
          <ReasonMinChart
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
          <RepairingMethodChart
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
        </div>
        <div
          className="grid col-span-4 w-full overflow-auto rounded-lg"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          <TableMechanicList
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
        </div>
      </section>
    </div>
  );
};

export default DownTimePage;
