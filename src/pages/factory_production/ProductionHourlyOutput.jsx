import React, { useState, Suspense } from 'react';
import dayjs from 'dayjs';

const Calendar = React.lazy(() => import('../../components/common/Calendar'));
const HourlyOutputTable = React.lazy(
  () => import('../../components/hourly_output_component/HourlyOutputTable')
);

const ProductionHourlyOutput = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  return (
    <div>
      <Suspense fallback={<div>Loading Calendar...</div>}>
        <Calendar onDateChange={handleDateChange} />
      </Suspense>
      <Suspense fallback={<div>Loading Table...</div>}>
        <HourlyOutputTable date={selectedDate} />
      </Suspense>
    </div>
  );
};

export default ProductionHourlyOutput;
