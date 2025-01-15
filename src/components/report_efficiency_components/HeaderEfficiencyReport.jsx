import Calendar from '@/components/common/Calendar';
import { Button, Grid } from '@mui/material';

const HeaderEfficiencyReport = ({ onSelectTimeFrame, selectedTimeFrame }) => {
  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Calendar />
        </Grid>

        <Grid item>
          <Button
            sx={{
              color: selectedTimeFrame === 'DAILY' ? 'white' : '#000',
              width: '100px',
              height: '40px',
              borderRadius: '5px',
              fontWeight: 'bold',
              bgcolor:
                selectedTimeFrame === 'DAILY' ? '#049962' : 'transparent',
              border:
                selectedTimeFrame === 'DAILY' ? '#049962' : '2px solid #049962',
              transition: 'all 0.3s',
            }}
            onClick={() => onSelectTimeFrame('DAILY')}
          >
            DAILY
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              color: selectedTimeFrame === 'WEEKLY' ? 'white' : '#000',
              width: '100px',
              height: '40px',
              borderRadius: '5px',
              fontWeight: 'bold',
              bgcolor:
                selectedTimeFrame === 'WEEKLY' ? '#049962' : 'transparent',
              border:
                selectedTimeFrame === 'WEEKLY'
                  ? '#049962'
                  : '2px solid #049962',
              transition: 'all 0.3s',
            }}
            onClick={() => onSelectTimeFrame('WEEKLY')}
          >
            WEEKLY
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              color: selectedTimeFrame === 'MONTHLY' ? 'white' : '#000',
              width: '100px',
              height: '40px',
              borderRadius: '5px',
              fontWeight: 'bold',
              bgcolor:
                selectedTimeFrame === 'MONTHLY' ? '#049962' : 'transparent',
              border:
                selectedTimeFrame === 'MONTHLY'
                  ? '#049962'
                  : '2px solid #049962',
              transition: 'all 0.3s',
            }}
            onClick={() => onSelectTimeFrame('MONTHLY')}
          >
            MONTHLY
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderEfficiencyReport;
