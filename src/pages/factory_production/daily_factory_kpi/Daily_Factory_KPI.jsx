import { useState } from "react";
import dayjs from "dayjs";

import Calendar from "@/components/factory_kpi_components/common_factory_kpi/Calendar";
import FloorLineList from "@/components/factory_kpi_components/common_factory_kpi/FloorLineList";

import EfficiencyByFloor from "@/components/factory_kpi_components/EfficiencyByFloor";
import RFTByFloor from "@/components/factory_kpi_components/RFTByFloor";
import OutputByFloor from "@/components/factory_kpi_components/OutputByFloor";
import AttendanceByFloor from "@/components/factory_kpi_components/AttendanceByFloor";
import HourlyOutputByFloor from "@/components/factory_kpi_components/HourlyOutputByFloor";

import CardEfficiency from "@/components/factory_kpi_components/card_components/CardEfficiency";
import CardRFT from "@/components/factory_kpi_components/card_components/CardRFT";
import CardTotalOutput from "@/components/factory_kpi_components/card_components/CardTotalOutput";
import CardTopLineData from "@/components/factory_kpi_components/card_components/CardTopLineData";

const Daily_Factory_KPI = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFloor, setSelectedFloor] = useState(null); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFloorChange = (floorAlias) => {
    setSelectedFloor(floorAlias);
  };

  return (
    <>
      <FloorLineList onFloorChange={handleFloorChange} /> 
      <Calendar onDateChange={handleDateChange} />
      
      <div className="grid grid-rows-2 gap-3 mb-4 mt-2">
        <div className="grid grid-cols-3 gap-3">
          <EfficiencyByFloor date={selectedDate} floor={selectedFloor} /> 
          <RFTByFloor date={selectedDate} floor={selectedFloor} />
          <div className="grid grid-rows-2 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <CardEfficiency date={selectedDate} className="flex-1" floor={selectedFloor} />
              <CardRFT date={selectedDate} className="flex-1" floor={selectedFloor} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CardTotalOutput date={selectedDate} className="flex-1" floor={selectedFloor} />
              <CardTopLineData date={selectedDate} className="flex-1" floor={selectedFloor} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <HourlyOutputByFloor date={selectedDate} floor={selectedFloor} />
          <OutputByFloor date={selectedDate} floor={selectedFloor} />
          <AttendanceByFloor date={selectedDate} floor={selectedFloor} />
        </div>
      </div>
    </>
  );
};

export default Daily_Factory_KPI;
