import { useState } from "react";
import Calendar from "../components/common/Calendar"
import dayjs from "dayjs";
import { Button } from "@mui/material";

import TableOEEbyMachine from "../components/auto_cutting_component/Table/TableOEEbyMachine";

import CardAvailability from "../components/auto_cutting_component/Card/CardAvailability";
import CardPerformance from "../components/auto_cutting_component/Card/CardPerformance";
import CardQuality from "../components/auto_cutting_component/Card/CardQuality";
import ChartTotalDowntime from "../components/auto_cutting_component/Chart/ChartTotalDowntime";
import ChartDowntimeReason from "../components/auto_cutting_component/Chart/ChartDowntimeReason";

const AutoCuttingPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <section className="mb-4">
      <section className="flex gap-4 items-center">
        <div className="">
          <Button sx={{fontWeight:600}}>AUTOCUTTING</Button>
          <Button sx={{fontWeight:600}}>DOWNTIME</Button>
        </div>
        <Calendar onDateChange={handleDateChange} />
      </section>

      <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-red-500">
            <div>1</div>
            </div>
            <div className="grid grid-rows-3 gap-2">
              <CardAvailability  date = {selectedDate}/>
              <CardPerformance  date = {selectedDate}/>
              <CardQuality  date = {selectedDate}/>
            </div>
            
          </div>
          <div className="">
            <TableOEEbyMachine date = {selectedDate}/>
          </div>
      </section>

        <section className="grid grid-cols-2 gap-4 mt-4">
          <ChartTotalDowntime date = {selectedDate} />
          <ChartDowntimeReason date = {selectedDate} />
        </section>
        
    </section>
  )
}

export default AutoCuttingPage