import { Card, Typography } from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const CardAverageManPower = () => {
  const t = useTranslations();
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
        {t['AVERAGE C2B MANPOWER']}
      </Typography>
      <Typography
        sx={{
          fontSize: 50,
          textAlign: 'right',
          alignSelf: 'flex-end',
          fontWeight: 900,
        }}
      >
        40
      </Typography>
    </Card>
  );
};

export default CardAverageManPower;
