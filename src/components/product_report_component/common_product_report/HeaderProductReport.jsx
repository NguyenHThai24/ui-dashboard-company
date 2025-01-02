import { useState } from "react";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const HeaderProductReport = ({ selectedDate, setSelectedDate }) => {
  const [selectedButton, setSelectedButton] = useState("factory"); // Mặc định là "factory"
  const [tempDate, setTempDate] = useState(selectedDate || dayjs()); // Trạng thái tạm cho Calendar
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSelectedDate(tempDate);
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType); // Cập nhật nút được chọn
  };

  const handleBuildingClick = () => {
    handleButtonClick("building");
    navigate("/production-report/building");
  };

  const handleFactoryClick = () => {
    handleButtonClick("factory");
    navigate("/production-report-day");
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Calendar tempDate={tempDate} setTempDate={setTempDate} />
        </Grid>

        <Grid item>
          <Button
            sx={{
              bgcolor: selectedButton === "factory" ? "#007bff" : "#d3d3d3", // Xanh biển nếu được chọn, xám nhạt nếu không
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleFactoryClick}
          >
            FACTORY
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: selectedButton === "building" ? "#007bff" : "#d3d3d3", // Xanh biển nếu được chọn, xám nhạt nếu không
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleBuildingClick}
          >
            BUILDING
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#00aff0",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleSearchClick}
          >
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderProductReport;
