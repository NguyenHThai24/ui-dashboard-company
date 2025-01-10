import { useState } from "react";
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const BuildingSelector = ({ onBuildingChange }) => {
  const [selectedBuilding, setSelectedBuilding] = useState("A"); 

  const buildings = ["A", "B", "C", "G"]; 

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    if (onBuildingChange) {
      onBuildingChange(building);
    }
  };

  return (
    <div className="flex gap-4 mb-2">
      {buildings.map((building) => (
        <button
          key={building}
          className={`flex items-center px-2 py-1.5 rounded-md border-2 transition duration-200 ${
            selectedBuilding === building
              ? "bg-green-800 text-white border-green-800"
              : "bg-white text-green-700 border-green-700"
          } hover:shadow-md`}
          onClick={() => handleBuildingClick(building)}
        >
          <HomeWorkIcon
            sx={{
              fontSize: "1.5rem",
              marginRight: "0.5rem",
              color: selectedBuilding === building ? "white" : "#1a5c1d",
            }}
          />
          <span>Building {building}</span>
        </button>
      ))}
    </div>
  );
};

export default BuildingSelector;
