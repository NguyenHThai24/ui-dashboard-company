import { Button, Grid } from '@mui/material';
import { useState } from 'react';

const ButtonTime = ({ onTimePeriodChange }) => {
  const [selectedButton, setSelectedButton] = useState('day'); // Mặc định là "day"

  const handleButtonClick = (timePeriod) => {
    setSelectedButton(timePeriod); // Cập nhật trạng thái được chọn
    onTimePeriodChange(timePeriod); // Gửi trạng thái về cha
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          sx={{
            bgcolor: selectedButton === 'month' ? '#239d85' : '#B7B7B7',
            color: 'white',
            width: '100px',
            height: '40px',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow:
              selectedButton === 'month'
                ? '0 0 10px rgba(0, 0, 0, 0.3)'
                : 'none',
            border: selectedButton === 'month' ? '2px solid #ffffff' : 'none',
          }}
          onClick={() => handleButtonClick('month')}
        >
          MONTH
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{
            bgcolor: selectedButton === 'week' ? '#239d85' : '#B7B7B7',
            color: 'white',
            width: '100px',
            height: '40px',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow:
              selectedButton === 'week'
                ? '0 0 10px rgba(0, 0, 0, 0.3)'
                : 'none',
            border: selectedButton === 'week' ? '2px solid #ffffff' : 'none',
          }}
          onClick={() => handleButtonClick('week')}
        >
          WEEK
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{
            bgcolor: selectedButton === 'day' ? '#239d85' : '#B7B7B7',
            color: 'white',
            width: '100px',
            height: '40px',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow:
              selectedButton === 'day' ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
            border: selectedButton === 'day' ? '2px solid #ffffff' : 'none',
          }}
          onClick={() => handleButtonClick('day')}
        >
          DAY
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonTime;
