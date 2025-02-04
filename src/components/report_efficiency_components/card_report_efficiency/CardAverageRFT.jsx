import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/material';
import axios from 'axios';
import { useTranslations } from '@/config/useTranslations';

const CardAverageRFT = ({ date, timeFrame }) => {
  const [averageRFT, setAverageRFT] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchAverageRFT = async () => {
      try {
        //const formattedDate = date.format('YYYY-MM-DD'); // Định dạng ngày nếu date là dayjs object
        // const response = await axios.get(
        //   `http://192.168.30.245:8989/eff/getDailyAVGFac?date=${formattedDate}&modelName=BARREDA%20DECODE`
        // );

        const urlMap = {
          DAILY:
            'http://192.168.30.245:8989/eff/getDailyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
          WEEKLY:
            'http://192.168.30.245:8989/eff/getWeeklyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
          MONTHLY:
            'http://192.168.30.245:8989/eff/getMonthlyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
        };

        const url = urlMap[timeFrame] || urlMap['DAILY'];
        const response = await axios.get(url);
        const responseData = response.data;

        if (responseData.status === 0) {
          const rftData = responseData.data.find((item) => item.RFT)?.RFT || {};
          const rftValues = Object.values(rftData).filter(
            (value) => value !== null
          );
          const average =
            rftValues.reduce((sum, value) => sum + value, 0) / rftValues.length;
          setAverageRFT(average.toFixed(2)); // Làm tròn đến 2 chữ số
        }
      } catch (error) {
        console.error('Error fetching average efficiency:', error);
      }
    };

    fetchAverageRFT();
  }, [date, timeFrame]);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
      }}
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
        borderRadius: '8px',
      }}
    >
      <Typography
        component="div"
        color="text.secondary"
        sx={{ fontWeight: 900, fontSize: 14, textAlign: 'left' }}
      >
        {t['AVERAGE RFT']}
      </Typography>
      <Typography
        sx={{
          fontSize: 40,
          textAlign: 'right',
          alignSelf: 'flex-end',
          fontWeight: 900,
        }}
      >
        {averageRFT ? `${averageRFT}%` : 'Loading...'}
      </Typography>
    </Card>
  );
};

export default CardAverageRFT;
