import { useState, useEffect } from 'react';
import { fetchTotalBreakdown } from '../../../apis/down_time_api/FloorAPI';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const CardBreakdown = ({ floor, date, line, mode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const t = useTranslations();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ensure the floor is set based on the mode
        if (mode === 'Auto Cutting') {
          floor = 'Auto Cutting';
        } else if (mode === 'Stock Fitting') {
          floor = 'Stock Fitting';
        } else {
          // Reset to empty if neither mode is selected
          floor = '';
        }

        const totalBreakdown = await fetchTotalBreakdown(
          'LHG', // Factory
          floor, // Floor from props or mode
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
  }, [floor, date, line, mode]); // Add mode to the dependency array

  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        height: '150px',
        textAlign: 'left',
        borderRadius: '8px',
      }}
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Đẩy phần tử đầu và cuối ra hai phía
          height: '100%', // Đảm bảo chiếm toàn bộ chiều cao của Card
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', color: 'gray', fontSize: '15px' }}
        >
          {t['TOTAL BREAKDOWN']}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : error ? (
          <Alert severity="error" sx={{ margin: 'auto' }}>
            {error}
          </Alert>
        ) : (
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
            {total}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CardBreakdown;
