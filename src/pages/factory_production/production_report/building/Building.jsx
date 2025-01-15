import { useState } from 'react';
import dayjs from 'dayjs';
import BuildingSelector from '../../../../components/product_report_component/building_component/BuildingSelector';
import EfficiencyByLine from '../../../../components/product_report_component/building_component/EfficiencyByLine';
import RFTByLine from '../../../../components/product_report_component/building_component/RFTByLine';
import HeaderProductReport from '../../../../components/product_report_component/common_product_report/HeaderProductReport';

const Building = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('A');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div>
      <HeaderProductReport
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <BuildingSelector
        selectedBuilding={selectedBuilding}
        onBuildingChange={setSelectedBuilding}
      />
      <div className="grid grid-cols-2 gap-4 my-4">
        <EfficiencyByLine
          selectedDate={selectedDate}
          selectedBuilding={selectedBuilding}
        />
        <RFTByLine
          selectedDate={selectedDate}
          selectedBuilding={selectedBuilding}
        />
      </div>
    </div>
  );
};

export default Building;
