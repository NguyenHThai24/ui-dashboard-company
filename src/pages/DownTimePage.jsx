import { useState, Suspense, lazy } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Calendar from '../components/common/Calendar';

// Sử dụng React.lazy để lazy load các component
const FloorLineList = lazy(
  () => import('../components/down_time_component/FloorLineList')
);
const CardBreakdown = lazy(
  () => import('../components/down_time_component/floor_data/CardBreakDown')
);
const CardMachineDown = lazy(
  () => import('../components/down_time_component/floor_data/CardMachineDown')
);
const CardRepairingTime = lazy(
  () => import('../components/down_time_component/floor_data/CardRepairingTime')
);
const MachineBreakByLineChart = lazy(
  () =>
    import(
      '../components/down_time_component/floor_data/MachineBreakByLineChart'
    )
);
const MachineDowntimeByLineChart = lazy(
  () =>
    import(
      '../components/down_time_component/floor_data/MachineDowntimeByLineChart'
    )
);
const RepairingTimeChart = lazy(
  () =>
    import('../components/down_time_component/floor_data/RepairingTimeChart')
);
const MostDowntimeChart = lazy(
  () => import('../components/down_time_component/floor_data/MostDowntimeChart')
);
const MostBreakdownChart = lazy(
  () =>
    import('../components/down_time_component/floor_data/MostBreakdownChart')
);
const MostRepairingChart = lazy(
  () =>
    import('../components/down_time_component/floor_data/MostRepairingChart')
);
const TotalMachineChart = lazy(
  () => import('../components/down_time_component/floor_data/TotalMachineChart')
);
const TableMechanicList = lazy(
  () => import('../components/down_time_component/floor_data/TableMechanicList')
);
const ReasonMinChart = lazy(
  () => import('../components/down_time_component/floor_data/ReasonMinChart')
);
const TotalReasonChart = lazy(
  () => import('../components/down_time_component/floor_data/TotalReasonChart')
);
const RepairingMethodChart = lazy(
  () =>
    import('../components/down_time_component/floor_data/RepairingMethodChart')
);
const TableRepairingStatus = lazy(
  () =>
    import('../components/down_time_component/floor_data/TableRepairingStatus')
);

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
      <Suspense fallback={<div>Loading Floor and Line List...</div>}>
        <FloorLineList
          onFloorChange={handleFloorChange}
          onLineChange={handleFloorLineChange}
          onModeChange={handleModeChange}
        />
      </Suspense>

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
            <Suspense fallback={<div>Loading Cards...</div>}>
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
            </Suspense>
          </div>

          <div className="grid row-span-1 grid-cols-3 gap-4 h-auto">
            <Suspense fallback={<div>Loading Charts...</div>}>
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
            </Suspense>
          </div>
        </div>

        <div
          className="grid col-span-4 w-full overflow-auto rounded-lg"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          <Suspense fallback={<div>Loading Repairing Status...</div>}>
            <TableRepairingStatus
              date={selectedDate}
              floor={selectedFloor}
              line={selectedLine}
              mode={selectedMode}
            />
          </Suspense>
        </div>
      </section>

      <section className="my-4 grid grid-cols-4 gap-4">
        <Suspense fallback={<div>Loading Additional Charts...</div>}>
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
        </Suspense>
      </section>

      <section className="grid grid-cols-12 gap-4 grid-rows-[350px] pb-4">
        <div className="grid grid-cols-3 col-span-8 gap-4">
          <Suspense fallback={<div>Loading Breakdown Charts...</div>}>
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
          </Suspense>
        </div>
        <div
          className="grid col-span-4 w-full overflow-auto rounded-lg"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          <Suspense fallback={<div>Loading Mechanic List...</div>}>
            <TableMechanicList
              date={selectedDate}
              floor={selectedFloor}
              line={selectedLine}
              mode={selectedMode}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default DownTimePage;
