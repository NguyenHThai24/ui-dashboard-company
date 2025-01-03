import { Button, Grid } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ButtonTime = () => {
      const [selectedButton, setSelectedButton] = useState("day"); // Mặc định là "day"
      const navigate = useNavigate();
    
      const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType); // Update the selected button
      };

      const handleDayClick = () => {
        handleButtonClick("day");
        navigate("/production-report/factory-day");
      };
    
      const handleWeekClick = () => {
        handleButtonClick("week");
        navigate("/production-report/factory-week");
      };
    
      const handleMonthClick = () => {
        handleButtonClick("month");
        navigate("/production-report/factory-month");
      };

      
  return (
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
  )
}

export default ButtonTime