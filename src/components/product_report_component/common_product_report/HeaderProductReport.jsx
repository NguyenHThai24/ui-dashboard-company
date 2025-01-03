import { useState, useEffect } from "react";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import { Button, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const HeaderProductReport = ({ selectedDate, setSelectedDate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tempDate, setTempDate] = useState(selectedDate || dayjs()); // Trạng thái tạm cho Calendar
  const [selectedButton, setSelectedButton] = useState("factory"); // Mặc định là "factory"

  // Đồng bộ trạng thái từ URL khi component được render
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/building")) {
      setSelectedButton("building");
    } else if (path.includes("/factory-day")) {
      setSelectedButton("factory");
    }
  }, [location.pathname]);

  const handleSearchClick = () => {
    setSelectedDate(tempDate);
  };

  const handleBuildingClick = () => {
    setSelectedButton("building");
    navigate("/production-report/building");
  };

  const handleFactoryClick = () => {
    setSelectedButton("factory");
    navigate("/production-report/factory-day");
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
              bgcolor: selectedButton === "factory" ? "#196f3d" : "#979a9a",
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
              bgcolor: selectedButton === "building" ? "#196f3d" : "#979a9a",
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
              bgcolor: "white",
              color: "#196f3d",
              border: "2px solid",
              borderColor: "#196f3d",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#196f3d",
                color: "white",
              },
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
