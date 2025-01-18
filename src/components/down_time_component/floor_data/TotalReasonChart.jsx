import { useEffect } from 'react';
import { fetchChartTotalReason } from '../../../apis/down_time_api/FloorAPI';
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import plugin
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Title, Legend, ChartDataLabels); // Register plugin
import { useTranslations } from '@/config/useTranslations';

const TotalReasonChart = ({ floor, line, date, cuttingFitting }) => {
  const { chartTotalReason, loading, error } = useSelector(
    (state) => state.downtime
  );
  const dispatch = useDispatch();
  const t = useTranslations();
  useEffect(() => {
    let adjustedFloor;

    // Đảm bảo `floor` được gán đúng theo mode hoặc từ props
    if (cuttingFitting === 'cutting') {
      adjustedFloor = 'Auto Cutting';
    } else if (cuttingFitting === 'fitting') {
      adjustedFloor = 'Stock Fitting';
    } else {
      adjustedFloor = floor; // Nhận giá trị từ props nếu không phải cutting hoặc fitting
    }
    dispatch(
      fetchChartTotalReason(
        'LHG', // Factory (example value)
        adjustedFloor, // Floor from props
        line, // Line from props
        '', // Section (optional)
        date, // Start date
        date // End date (if applicable)
      )
    );
  }, [dispatch, floor, line, date, cuttingFitting]);

  const data = {
    labels: chartTotalReason.info_en || [], // Labels
    datasets: [
      {
        label: 'Total',
        data: chartTotalReason.total || [], // Data values
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#17a398',
          '#ffa600',
          '#bc5090',
          '#58508d',
          '#003f5c',
        ],
        hoverBackgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#17a398',
          '#ffa600',
          '#bc5090',
          '#58508d',
          '#003f5c',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Get raw value
            return `${tooltipItem.label}: ${value}`; // Customize tooltip text
          },
        },
      },
      datalabels: {
        color: '#000', // Label color
        font: {
          size: 12, // Font size
        },
        formatter: (value, context) => {
          return value; // Display value directly
        },
        anchor: 'end',
        align: 'start',
        offset: 10,
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
        {t['Most Breakdown By Reason']}
      </Typography>
      <CardContent
        sx={{
          height: '100%',
          p: 3,
          pb: 1,
          paddingTop: 0,
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
          <Pie data={data} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default TotalReasonChart;
