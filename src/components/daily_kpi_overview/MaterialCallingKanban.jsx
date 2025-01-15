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

const MaterialCallingKanban = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch('/data/MaterialCallingKanban.json');
        if (!response.ok) {
          throw new Error('Failed to fetch mock data');
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
  }, []);

  const options = {
    chart: {
      type: 'column',
      marginTop: 100,
      marginLeft: 0,
      marginRight: 0,
      // height: 250,
    },
    title: {
      text: '',
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
    xAxis: {
      categories: chartData?.categories || [],
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: '' },
      stackLabels: {
        enabled: true,
        style: { color: 'black', fontSize: '10px', fontWeight: 600 },
      },
      labels: { enabled: true },
    },
    legend: {
      enabled: true,
      layout: 'vertical', // Ensures the legend is displayed vertically
      align: 'left', // Aligns the legend to the left
      verticalAlign: 'top',
      itemStyle: {
        fontSize: '12px', // Optional: Adjust font size
        fontWeight: 'normal', // Optional: Adjust font weight
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            fontWeight: 600,
            color: '#333',
          },
          formatter: function () {
            return `${this.y}`;
          },
        },
      },
    },
    series: [
      {
        name: 'Request',
        data: chartData?.request || [],
        color: '#0b9dcc',
      },
      {
        name: 'Ongoing',
        data: chartData?.ongoing || [],
        color: '#f5a623',
      },
      {
        name: 'Deliver',
        data: chartData?.deliver || [],
        color: '#50b432',
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="font-bold text-gray-500">MATERIAL CALLING KANBAN</h1>
      </div>
      <Card>
        <CardContent
          sx={{
            paddingBottom: '0 !important', // Removes bottom padding
            padding: '16px', // Optional: Adjust overall padding
          }}
        >
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
              Error: {error}
            </Typography>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialCallingKanban;
