import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  datePicker: {
    '& .MuiInputBase-root': {
      height: '40px', // Giảm chiều cao của input field
      width: '320px',
      marginTop: '10px',
      marginBottom: '10px',
    },
    '& .MuiFormControl-root': {
      height: '40px', // Đảm bảo form control có chiều cao ngắn
    },
  },
  textField: {
    '& .MuiInputBase-input': {
      textAlign: 'center', // Canh giữa input text
    },
  },
});

const Calendar = ({ tempDate, setTempDate }) => {
  const classes = useStyles();

  // Custom handleDateChange để không cho chọn sau năm hiện tại
  const customHandleDateChange = (date) => {
    if (date && date.isAfter(dayjs().endOf('year'))) {
      date = dayjs().endOf('year');
    }
    setTempDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['month', 'year']}
        value={tempDate || dayjs().startOf('month')}
        onChange={customHandleDateChange}
        format="MM-YYYY" // Định dạng tháng và năm là số
        maxDate={dayjs().endOf('year')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Month"
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
