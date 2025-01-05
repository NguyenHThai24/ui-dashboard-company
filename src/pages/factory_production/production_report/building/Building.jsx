import { useState } from "react";
import dayjs from "dayjs";

import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport";

import HomeWorkIcon from '@mui/icons-material/HomeWork';

import EfficiencyByLineA from "@/components/product_report_component/building_component/buildingA/EfficiencyByLineA";
import RFTByLineA from "@/components/product_report_component/building_component/buildingA/RFTByLineA";

import EfficiencyByLineB from "@/components/product_report_component/building_component/buildingB/EfficiencyByLineB";
import RFTByLineB from "@/components/product_report_component/building_component/buildingB/RFTByLineB";

import EfficiencyByLineC from "@/components/product_report_component/building_component/buildingC/EfficiencyByLineC";
import RFTByLineC from "@/components/product_report_component/building_component/buildingC/RFTByLineC";

import EfficiencyByLineG from "@/components/product_report_component/building_component/buildingG/EfficiencyByLineG";
import RFTByLineG from "@/components/product_report_component/building_component/buildingG/RFTByLineG";

const buildingComponents = {
  A: {
    Efficiency: EfficiencyByLineA,
    RFT: RFTByLineA,
  },
  B: {
    Efficiency: EfficiencyByLineB,
    RFT: RFTByLineB,
  },
  C: {
    Efficiency: EfficiencyByLineC,
    RFT: RFTByLineC,
  },
  G: {
    Efficiency: EfficiencyByLineG,
    RFT: RFTByLineG,
  },
 
};

const Building = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("A"); // Tòa nhà mặc định là A
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const renderBuildingData = () => {
    const components = buildingComponents[selectedBuilding];
    if (!components) return <div>Tòa nhà không tồn tại</div>;

    const { Efficiency, RFT } = components;
    return (
      <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
        <Efficiency selectedDate={selectedDate} />
        <RFT selectedDate={selectedDate} />
      </div>
    );
  };

  return (
    <div>
      <HeaderProductReport selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="flex justify-start gap-3 mb-4 mt-1">
        {Object.keys(buildingComponents)?.map((building) => (
          <button
            key={building}
            className={`relative flex flex-col items-center font-semibold justify-center px-2 py-1 border-2 rounded-lg shadow-lg ${
              selectedBuilding === building
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-green-700 border-green-700"
            } hover:shadow-xl transition duration-200`}
            onClick={() => setSelectedBuilding(building)}
          >
         
            {/* Biểu tượng */}
            <HomeWorkIcon
              sx={{
                fontSize: "1.2rem", // Kích thước biểu tượng
                marginBottom: "0.1rem", // Khoảng cách giữa biểu tượng và text
                color: selectedBuilding === building ? "white" : "#1a5c1d", // Màu biểu tượng
              }}
            />
            <span className="text-xs">Building {building}</span>
          </button>
        ))}
      </div>
      {renderBuildingData()}
    </div>

  
  );
};

export default Building;
