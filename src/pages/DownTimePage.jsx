import FloorLineList from "../components/down_time_component/FloorLineList";
import Calendar from "@/components/common/Calendar";
import { useState } from "react";
import dayjs from "dayjs";
import CardBreakdown from "../components/down_time_component/floor_data/CardBreakDown";
import CardMachineDown from "../components/down_time_component/floor_data/CardMachineDown";
import CardRepairingTime from "../components/down_time_component/floor_data/CardRepairingTime";
import MachineBreakByLineChart from "../components/down_time_component/floor_data/MachineBreakByLineChart";
import MachineDowntimeByLineChart from "../components/down_time_component/floor_data/MachineDowntimeByLineChart";
import RepairingTimeChart from "../components/down_time_component/floor_data/RepairingTimeChart";
import MostDowntimeChart from "../components/down_time_component/floor_data/MostDowntimeChart";
import MostBreakdownChart from "../components/down_time_component/floor_data/MostBreakdownChart";

const DownTimePage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);

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

  return (
    <div>
        <FloorLineList
        onFloorChange={handleFloorChange}
        onLineChange={handleFloorLineChange}
      />

      <Calendar onDateChange={handleDateChange} />

      <section className="grid grid-cols-12 gap-4">
        <div className="grid col-span-8 grid-rows-[166px,350px]"> {/* Đặt chiều cao cho từng hàng */}
          <div className="grid row-span-1 h-[150px]"> {/* Row 1 */}
            <div className="grid grid-cols-8 gap-4">
              <div className="grid col-span-2">
                <CardBreakdown date={selectedDate} floor={selectedFloor} line={selectedLine} />
              </div>
              <div className="grid col-span-4">
                <CardMachineDown date={selectedDate} floor={selectedFloor} line={selectedLine} />
              </div>
              <div className="grid col-span-2">
                <CardRepairingTime date={selectedDate} floor={selectedFloor} line={selectedLine} />
              </div>
            </div>
          </div>

          {/* Row 2 with dynamic height */}
          <div className="grid row-span-1 grid-cols-3 gap-4 h-auto">
            <MachineBreakByLineChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
            <MachineDowntimeByLineChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
            <RepairingTimeChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
          </div>
        </div>

        <div className="grid col-span-4 border-2 border-black">Cột 2</div>
      </section>
      <section  className="my-4 grid grid-cols-4 gap-4">
        <MostBreakdownChart   date={selectedDate} floor={selectedFloor} line={selectedLine} />
        <MostDowntimeChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
        <MostDowntimeChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
        <MostDowntimeChart date={selectedDate} floor={selectedFloor} line={selectedLine} />
      </section>


       
    </div>
  )
}

export default DownTimePage