import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  datePicker: {
    "& .MuiInputBase-root": {
      height: "40px", // Giảm chiều cao của input field
      width: "320px",
      marginTop: "10px",
      marginBottom: "10px",
    },
  },
  textField: {
    "& .MuiInputBase-input": {
      textAlign: "center", // Canh giữa input text
    },
  },
});

const Calendar = ({ onDateChange }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(dayjs());

 
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date); // Gửi ngày đã chọn tới parent component
    }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year", "month", "day"]}
        value={selectedDate}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Date"
            fullWidth
            className={classes.textField}
          />
        )}
        className={classes.datePicker}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
