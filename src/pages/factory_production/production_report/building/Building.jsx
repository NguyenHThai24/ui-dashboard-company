import { useState } from "react";
import dayjs from "dayjs";

import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport"
//import EfficiencyByLine from "@/components/product_report_component/building_component/buildingA/EfficiencyByLineA"
import RFTByLine from "@/components/product_report_component/building_component/buildingA/RFTByLine";


const Building = () => {

   const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div>
      <HeaderProductReport selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <div>
        <div className="grid grid-cols-2 gap-4 my-4">
          {/* <EfficiencyByLine selectedDate={selectedDate}/> */}
          <RFTByLine selectedDate={selectedDate}/>
        </div>
      </div>
    </div>
  )
}

export default Building