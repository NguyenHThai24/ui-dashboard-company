import { useState } from "react";

const BuildingSelector = ({ onBuildingChange }) => {
  const [building, setBuilding] = useState("A"); // Giá trị mặc định

  const handleBuildingChange = (e) => {
    const selectedBuilding = e.target.value;
    setBuilding(selectedBuilding);
    if (onBuildingChange) {
      onBuildingChange(selectedBuilding);
    }
  };

  return (
    <div>
      <select value={building} onChange={handleBuildingChange}>
        <option value="A">Building A</option>
        <option value="B">Building B</option>
        <option value="C">Building C</option>
      </select>
    </div>
  );
};

export default BuildingSelector;
