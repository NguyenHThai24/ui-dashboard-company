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

// Components Floor Line
import ButtonAssemblyStitching from "@/components/factory_kpi_components/common_factory_kpi/ButtonAssemblyStitching";
import EfficiencyByHour from "@/components/factory_kpi_components/line_components/EfficiencyByHour";
import AssemblyRFTChart from "@/components/factory_kpi_components/line_components/AssemblyRFTChart";
import OutputByTheHour from "@/components/factory_kpi_components/line_components/OutputByTheHour";
import ModelRunByLine from "@/components/factory_kpi_components/line_components/ModelRunByLine";
import StopLine from "../../../components/factory_kpi_components/line_components/StopLine";

const Daily_Factory_KPI = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedMode, setSelectedMode] = useState("assembly");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFloorChange = (floorAlias) => {
    setSelectedFloor(floorAlias);
    setSelectedLine(null); // Reset line when a new floor is selected
  };

  const handleFloorLineChange = (lineAlias) => {
    setSelectedLine(lineAlias); // Update selected line
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode); // Update "assembly" or "stitching"
  };

  return (
    <>
      <FloorLineList
        onFloorChange={handleFloorChange}
        onLineChange={handleFloorLineChange}
      />

      <Calendar onDateChange={handleDateChange} />

      {selectedLine ? (
        // Line selected
        <>
          <ButtonAssemblyStitching onSelectionChange={handleModeChange} />

          <div className="grid grid-rows-2 gap-4 mb-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <EfficiencyByHour
                date={selectedDate}
                floor={selectedFloor}
                line={selectedLine}
                mode={selectedMode}
              />
              <AssemblyRFTChart
                date={selectedDate}
                floor={selectedFloor}
                line={selectedLine}
                mode={selectedMode}
              />
              <ModelRunByLine
                date={selectedDate}
                floor={selectedFloor}
                line={selectedLine}
                mode={selectedMode}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <OutputByTheHour
                date={selectedDate}
                floor={selectedFloor}
                line={selectedLine}
                mode={selectedMode}
              />
              <OutputByTheHour
                date={selectedDate}
                floor={selectedFloor}
                line={selectedLine}
                mode={selectedMode}
              />
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <CardEfficiency
                    date={selectedDate}
                    className="flex-1"
                    floor={selectedFloor}
                    mode={selectedMode}
                  />
                  <CardRFT
                    date={selectedDate}
                    className="flex-1"
                    floor={selectedFloor}
                    mode={selectedMode}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CardTotalOutput
                    date={selectedDate}
                    className="flex-1"
                    floor={selectedFloor}
                    mode={selectedMode}
                  />
                  <CardTopLineData
                    date={selectedDate}
                    className="flex-1"
                    floor={selectedFloor}
                    mode={selectedMode}
                  />
                </div>
              </div>
            </div>
          </div>
          <StopLine
            date={selectedDate}
            floor={selectedFloor}
            line={selectedLine}
            mode={selectedMode}
          />
        </>
      ) : (
        // No line selected
        <div className="grid grid-rows-2 gap-4 mb-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <EfficiencyByFloor date={selectedDate} floor={selectedFloor} />
            <RFTByFloor date={selectedDate} floor={selectedFloor} />
            <div className="grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <CardEfficiency
                  date={selectedDate}
                  className="flex-1"
                  floor={selectedFloor}
                />
                <CardRFT
                  date={selectedDate}
                  className="flex-1"
                  floor={selectedFloor}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CardTotalOutput
                  date={selectedDate}
                  className="flex-1"
                  floor={selectedFloor}
                />
                <CardTopLineData
                  date={selectedDate}
                  className="flex-1"
                  floor={selectedFloor}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <HourlyOutputByFloor date={selectedDate} floor={selectedFloor} />
            <OutputByFloor date={selectedDate} floor={selectedFloor} />
            <AttendanceByFloor date={selectedDate} floor={selectedFloor} />
          </div>
        </div>
      )}
    </>
  );
};

export default Daily_Factory_KPI;
