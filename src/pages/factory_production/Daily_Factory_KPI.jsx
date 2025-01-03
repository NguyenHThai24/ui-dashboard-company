import FloorLineList from "@/components/factory_kpi_components/FloorLineList"
import Calendar from "@/components/product_report_component/common_product_report/Calendar"

import  EfficiencyByFloor  from "@/components/factory_kpi_components/EfficiencyByFloor"
import RFTByFloor from "@/components/factory_kpi_components/RFTByFloor"
import OutputByFloor from "@/components/factory_kpi_components/OutputByFloor"
import AttendanceByFloor from "@/components/factory_kpi_components/AttendanceByFloor"
import CardEfficiency from "@/components/factory_kpi_components/card_components/CardEfficiency"
import CardRFT from "@/components/factory_kpi_components/card_components/CardRFT"
import CardTotalOutput from "@/components/factory_kpi_components/card_components/CardTotalOutput"
import CardTopLineData from "@/components/factory_kpi_components/card_components/CardTopLineData"
import HourlyOutputByFloor from "@/components/factory_kpi_components/HourlyOutputByFloor"


const Daily_Factory_KPI = () => {
  return (
    <>
      <FloorLineList/>
      <Calendar />
      <div className="grid grid-rows-2 gap-4 my-4">
        <div className="grid grid-cols-3 gap-4">
          <EfficiencyByFloor/>
          <RFTByFloor/>
            <div className="grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <CardEfficiency className="flex-1" />
                <CardRFT className="flex-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CardTotalOutput className="flex-1" />
                <CardTopLineData className="flex-1" />
              </div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <HourlyOutputByFloor/>
            <OutputByFloor/>
            <AttendanceByFloor />
          </div>
      </div>     
    </>
  )
}

export default Daily_Factory_KPI