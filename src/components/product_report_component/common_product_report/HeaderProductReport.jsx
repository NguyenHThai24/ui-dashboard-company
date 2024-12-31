import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeaderProductReport = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedButton, setSelectedButton] = useState(null); // Track selected button
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSearchClick = () => {
    // Function to handle search logic based on selectedDate
    //console.log("Selected Date:", selectedDate.format("MM-YYYY")); // Use this date to filter data
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType); // Update the selected button
  };

  const handleDayClick = () => {
    handleButtonClick("day");
    navigate("/production-report-day");
  };

  const handleWeekClick = () => {
    handleButtonClick("week");
    navigate("/production-report-week");
  };

  const handleMonthClick = () => {
    handleButtonClick("month");
    navigate("/production-report-month");
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Calendar
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </Grid>

        <Grid item>
          <Button
            sx={{
              bgcolor:"#00b488", // Change color if selected
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={() => handleButtonClick("factory")} // Handle button click
          >
            FACTORY
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#555555", 
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={() => handleButtonClick("building")} // Handle button click
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

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            sx={{
              bgcolor: selectedButton === "month" ? "#363636" : "#B7B7B7", // Change color if selected
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleMonthClick}
          >
            MONTH
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: selectedButton === "week" ? "#363636" : "#B7B7B7", // Change color if selected
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleWeekClick}
          >
            WEEK
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: selectedButton === "day" ? "#363636" : "#B7B7B7", // Change color if selected
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleDayClick}
          >
            DAY
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderProductReport;
