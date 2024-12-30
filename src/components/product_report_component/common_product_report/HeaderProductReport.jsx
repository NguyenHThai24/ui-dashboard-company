import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import { Button, Grid } from "@mui/material";

const HeaderProductReport = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      //console.log("Selected Date:", date.format("MM-YYYY")); // Đăng nhật ký dữ liệu
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </Grid>

        <Grid item>
          <Button
            sx={{
              bgcolor: "#049962",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            FACTORY
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#838B8B",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
               fontWeight: "bold"
            }}
          >
            BUILDING
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#3399ff",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
               fontWeight: "bold"
            }}
          >
            SEARCH
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        

        <Grid item>
          <Button
            sx={{
              bgcolor: "#A0A0A0",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            MONTH
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#A0A0A0",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
               fontWeight: "bold"
            }}
          >
            WEEK
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              bgcolor: "#363636",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "5px",
               fontWeight: "bold"
            }}
          >
            DAY
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderProductReport;
