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

const DigitalAndonCase = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch('/data/mockChartData.json');
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
      type: 'area',
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      //height: 250,
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
      enabled: false, // Disables the legend
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 1,
          symbol: 'circle',
        },
        fillOpacity: 0.1,
        dataLabels: {
          enabled: true, // Enables data labels
          style: {
            fontSize: '10px',
            fontWeight: 600,
            color: '#333', // Label text color
          },
          formatter: function () {
            return `${this.y}`; // Displays the value of the data point
          },
        },
      },
    },
    series: [
      {
        name: 'Actual',
        data: chartData?.actual || [],
        color: '#b81f89',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(249, 47, 188, 0.5)'], // Top color
            [1, 'rgba(249, 47, 188, 0.1)'], // Bottom color
          ],
        },
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-md ">
      <h1 className="font-bold text-gray-500">DIGITAL ANDON CASES</h1>
      <div>
        <span className="font-bold text-3xl">19 TIMES</span>
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

export default DigitalAndonCase;
