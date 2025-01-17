import { useState, useEffect } from 'react';
import { fetchTotalMachineDownTime } from '../../../apis/down_time_api/FloorAPI';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const CardMachineDown = ({ floor, date, line, mode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (mode === 'Auto Cutting') {
          floor = 'Auto Cutting';
        } else if (mode === 'Stock Fitting') {
          floor = 'Stock Fitting';
        } else {
          // Reset to empty if neither mode is selected
          floor = '';
        }
        const totalBreakdown = await fetchTotalMachineDownTime(
          'LHG', // Factory
          floor, // Floor from props
          '', // Line
          '', // Section
          date, // Start date
          date // End date
        );

        setTotal(totalBreakdown);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [floor, date, line, mode]); // Run effect when floor, date, or line changes

  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        height: '150px',
        textAlign: 'left',
        padding: '16px',
        borderRadius: '8px',
      }}
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold', color: 'gray', fontSize: '15px' }}
      >
        {t['TOTAL MACHINE DOWNTIME']}
      </Typography>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Đẩy phần tử đầu và cuối ra hai phía
          height: '100%', // Đảm bảo chiếm toàn bộ chiều cao của Card
        }}
      >
        {loading ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : error ? (
          <Alert severity="error" sx={{ margin: 'auto' }}>
            {error}
          </Alert>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  alignSelf: 'flex-end', // Đưa giá trị xuống cuối
                  mt: 'auto', // Tự động đẩy cách đều
                  color: '#049962',
                  fontWeight: '900',
                  fontSize: '14px',
                  paddingBottom: 1.5,
                }}
              >
                {t['TOTAL']}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  alignSelf: 'flex-end', // Đưa giá trị xuống cuối
                  mt: 'auto', // Tự động đẩy cách đều
                  color: '#049962',
                  fontWeight: '900',
                }}
              >
                {total || 0}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  alignSelf: 'flex-end', // Đưa giá trị xuống cuối
                  mt: 'auto', // Tự động đẩy cách đều
                  color: '#049962',
                  fontWeight: '900',
                  fontSize: '14px',
                  paddingBottom: 1.5,
                }}
              >
                {t['AVERAGE']}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  alignSelf: 'flex-end', // Đưa giá trị xuống cuối
                  mt: 'auto', // Tự động đẩy cách đều
                  color: '#049962',
                  fontWeight: '900',
                }}
              >
                {total || 0}
              </Typography>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardMachineDown;
