import { useEffect } from 'react';
import { fetchChartDataFixed } from '../../../apis/down_time_api/FloorAPI';
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from '@/config/useTranslations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MachineDowntimeByLineChart = ({ floor, line, date }) => {
  const { chartDataFixed, loading, error } = useSelector(
    (state) => state.downtime
  );
  const dispatch = useDispatch();
  const t = useTranslations();
  useEffect(() => {
    dispatch(
      fetchChartDataFixed(
        'LHG', // Factory (example value)
        floor, // Floor from props
        line, // Line from props
        '', // Section (optional)
        date, // Start date
        date // End date (if applicable)
      )
    );
  }, [dispatch, floor, line, date]); // Run effect when floor, line, or date changes

  const data = {
    labels: chartDataFixed.name || [], // X-axis labels (ensure it's not undefined)
    datasets: [
      {
        label: 'Total',
        data: chartDataFixed.total || [], // Y-axis data
        backgroundColor: 'rgba(56, 168, 255, 0.8)', // Background color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend (label)
      },
      title: null,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Hour', // X-axis label
        },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true, // Start Y-axis from 0
      },
    },
  };

  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        height: '350px',
        boxShadow: 10,
        borderRadius: 2,
        bgcolor: 'white',
      }}
    >
      <Typography
        sx={{ fontWeight: 'bold', color: 'gray', fontSize: '15px', p: 1 }}
      >
        {t['Machine Downtime By Line (Min)']}
      </Typography>
      <CardContent
        sx={{
          height: '100%',
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Bar data={data} options={options} height={350} />
        )}
      </CardContent>
    </Card>
  );
};

export default MachineDowntimeByLineChart;
