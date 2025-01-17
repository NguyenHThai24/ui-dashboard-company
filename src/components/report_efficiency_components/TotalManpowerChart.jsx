import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const TotalManpowerChart = ({ selectedDate, timeFrame }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();
  useEffect(() => {
    setLoading(true);

    // Adjust the API endpoint based on the time frame
    const endpointMap = {
      DAILY: '/data/testTotalManpowerChart.json',
      WEEKLY: '/data/weeklyEfficiencyChart.json',
      MONTHLY: '/data/monthlyEfficiencyChart.json',
    };
    const endpoint = endpointMap[timeFrame];

    fetch(endpoint)
      .then((response) => response.json())

      .then((data) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data', err);
        setLoading(false);
      });
  }, [selectedDate, timeFrame]);

  const options = {
    chart: {
      type: 'column',
      marginTop: 100,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: `Factory Total C2B Manpower - ${timeFrame}`,
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        color: '#333',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1.5px',
      },
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      borderColor: '#ccc',
      borderWidth: 2,
      backgroundColor: 'white',
      itemStyle: {
        fontSize: '10px',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: '#f44336',
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: chartData?.date || [],
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: '' },
      stackLabels: {
        enabled: true,
        style: { color: 'black', fontSize: '10px', fontWeight: 600 },
      },
      labels: { enabled: false },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          style: { fontSize: '10px', fontWeight: 'semibold' },
        },
        pointPadding: 0.1, // Reduce space between columns
        groupPadding: 0.2, // Reduce space between groups of columns
        borderWidth: 0, // Remove border to make columns visually tighter
      },
    },
    series: [
      {
        name: 'Cutting MP',
        data: chartData?.cutting || [],
        color: '#fe7c27',
      },
      {
        name: 'Stock Fitting',
        data: chartData?.stockfitting || [],
        color: '#2775fe',
      },
      {
        name: 'Assembly MP',
        data: chartData?.assembly || [],
        color: '#fc1010',
      },
      {
        name: 'Stitching MP',
        data: chartData?.stitching || [],
        color: '#59ff00',
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div
      className="my-4"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
        borderRadius: '8px',
      }}
    >
      <Card sx={{ overflow: 'auto' }}>
        <CardContent>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100px',
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {t['Error']}: {error}
            </Typography>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalManpowerChart;
