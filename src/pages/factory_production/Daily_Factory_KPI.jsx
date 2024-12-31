import FloorLineList from "@/components/factory_kpi_component/FloorLineList"
import Calendar from "@/components/product_report_component/common_product_report/Calendar"
import  EfficiencyByFloor  from "@/components/factory_kpi_component/EfficiencyByFloor"
import RFTByFloor from "@/components/factory_kpi_component/RFTByFloor"
import OutputByFloor from "@/components/factory_kpi_component/OutputByFloor"
import AttendanceByFloor from "../../components/factory_kpi_component/AttendanceByFloor"


const Daily_Factory_KPI = () => {
  return (
    <>
      <FloorLineList/>
      <Calendar />
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="grid grid-row-2 gap-4">
          <EfficiencyByFloor/>
          <OutputByFloor/>
        </div>
        <div className="grid grid-row-2 gap-4"> 
          <RFTByFloor/>
          <EfficiencyByFloor/>
        </div>
        <div className="grid grid-row-2 gap-4">
          <EfficiencyByFloor/>
          <AttendanceByFloor/>
        </div>
          
      </div>     
    </>
  )
}

export default Daily_Factory_KPI