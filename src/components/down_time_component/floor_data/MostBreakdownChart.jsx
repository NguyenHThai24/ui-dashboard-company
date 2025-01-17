import { useEffect } from 'react';
import { fetchChartMostBreakdown } from '../../../apis/down_time_api/FloorAPI';
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2'; // Đổi từ Line sang Bar
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

const MostBreakdownChart = ({ floor, line, date, mode }) => {
  const { chartMostBreakdown, loading, error } = useSelector(
    (state) => state.downtime
  );
  const dispatch = useDispatch();
  const t = useTranslations();

  useEffect(() => {
    if (mode === 'Auto Cutting') {
      floor = 'Auto Cutting';
    } else if (mode === 'Stock Fitting') {
      floor = 'Stock Fitting';
    } else {
      // Reset to empty if neither mode is selected
      floor = '';
    }
    dispatch(
      fetchChartMostBreakdown(
        'LHG', // Factory (example value)
        floor, // Floor from props
        line, // Line from props
        '', // Section (optional)
        date, // Start date
        date // End date (if applicable)
      )
    );
  }, [dispatch, floor, mode, line, date]); // Run effect when floor, line, or date changes

  const data = {
    labels: [...(chartMostBreakdown.Name_en || [])], // X-axis labels (ensure it's not undefined)

    datasets: [
      {
        label: 'Total',
        data: chartMostBreakdown.total || [], // Y-axis data
        backgroundColor: 'rgba(30, 143, 44, 0.8)', // Background color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
        barPercentage: 0.5, // Adjust bar thickness
        categoryPercentage: 0.8, // Adjust spacing between bars
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        display: false, // Hide the legend (label)
      },
      tooltip: {
        callbacks: {
          // Hiển thị tên đầy đủ khi hover vào trục X
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const fullName = chartMostBreakdown.Name_en[index] || 'Unknown'; // Tên đầy đủ
            const value = tooltipItem.raw; // Giá trị
            return [`${fullName}`, `${tooltipItem.dataset.label}: ${value}`];
          },
        },
      },
      title: null,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '', // X-axis label
        },

        beginAtZero: true, // Start X-axis from 0
      },
      y: {
        ticks: {
          callback: function (value, index) {
            // Lấy 6 ký tự cuối trên trục X
            return chartMostBreakdown.Name_en
              ? chartMostBreakdown.Name_en[index].slice(-6)
              : value;
          },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        height: '100%',
      }}
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
        borderRadius: '8px',
      }}
    >
      <Typography
        sx={{ fontWeight: 'bold', color: 'gray', fontSize: '15px', p: 1 }}
      >
        {t['Most Breakdown By Machine Type (Count)']}
      </Typography>
      <CardContent
        sx={{
          height: '100%',
          p: 1,
          pb: 1,
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

export default MostBreakdownChart;
