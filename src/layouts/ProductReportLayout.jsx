import React from 'react'
import HeaderProductReport from "@/components/product_report_component/common_product_report/HeaderProductReport";

const ProductReportLayout = ({children}) => {
  return (
    <>
    <HeaderProductReport/>
    <div>{children}</div>
    </>
  )
}

export default ProductReportLayout