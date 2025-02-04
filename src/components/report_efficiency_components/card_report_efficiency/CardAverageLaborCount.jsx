import { Card, Typography } from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const CardAverageLaborCount = () => {
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
        {t['AVERAGE LABOR COUNT']}
      </Typography>
      <Typography
        sx={{
          fontSize: 40,
          textAlign: 'right',
          alignSelf: 'flex-end',
          fontWeight: 900,
        }}
      >
        180
      </Typography>
    </Card>
  );
};

export default CardAverageLaborCount;
