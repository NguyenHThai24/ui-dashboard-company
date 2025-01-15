import { useState } from 'react';
import HeaderEfficiencyReport from '@/components/report_efficiency_components/HeaderEfficiencyReport';
import SelectModel from '@/components/report_efficiency_components/SelectModel';

import CardAverageEfficiency from '@/components/report_efficiency_components/card_report_efficiency/CardAverageEfficiency';
import CardAverageRFT from '@/components/report_efficiency_components/card_report_efficiency/CardAverageRFT';
import CardTotalOutput from '@/components/report_efficiency_components/card_report_efficiency/CardTotalOutput';
import CardAverageManPower from '@/components/report_efficiency_components/card_report_efficiency/CardAverageManPower';
import CardAverageLaborCount from '@/components/report_efficiency_components/card_report_efficiency/CardAverageLaborCount';

import EfficiencyChart from '@/components/report_efficiency_components/EfficiencyChart';
import TotalManpowerChart from '@/components/report_efficiency_components/TotalManpowerChart';
import FloorEfficiencySummary from '../../components/report_efficiency_components/FloorEfficiencySummary';

const DailyEfficiencyReport = () => {
  const [timeFrame, setTimeFrame] = useState('DAILY');

  const handleSelectTimeFrame = (selectedTimeFrame) => {
    setTimeFrame(selectedTimeFrame);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <HeaderEfficiencyReport
        onSelectTimeFrame={handleSelectTimeFrame}
        selectedTimeFrame={timeFrame}
      />

      {/* Model Selector */}
      <SelectModel />

      {/* Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full my-4">
        <CardAverageEfficiency timeFrame={timeFrame} />
        <CardAverageRFT timeFrame={timeFrame} />
        <CardTotalOutput timeFrame={timeFrame} />
        <CardAverageManPower timeFrame={timeFrame} />
        <CardAverageLaborCount timeFrame={timeFrame} />
      </div>

      {/* Charts and Summary */}
      <EfficiencyChart timeFrame={timeFrame} />
      <TotalManpowerChart timeFrame={timeFrame} />

      <FloorEfficiencySummary timeFrame={timeFrame} />
    </div>
  );
};

export default DailyEfficiencyReport;
