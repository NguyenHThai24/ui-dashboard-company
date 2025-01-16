import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useTranslations } from '../../config/useTranslations';

const EfficiencyByFloor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const translation = useTranslations();

  useEffect(() => {
    fetch('/data/testData1.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (!data) return null;

  const { floor, RFT, EFF } = data;

  const options = {
    chart: {
      type: 'column',
      marginTop: 80,
      marginLeft: 0,
      marginRight: 0,
      height: '300px',
    },
    title: null,
    legend: {
      layout: 'horizontal',
      align: 'right',
      verticalAlign: 'top',
      y: 20,
      floating: true,
      backgroundColor: 'white',
      itemStyle: {
        fontSize: '10px',
        fontWeight: 900,
      },
      itemDistance: 2,
    },
    xAxis: {
      categories: floor,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      visible: false,
      title: '',
      labels: {
        style: {
          fontSize: '10px',
          color: '#000',
        },
      },
    },
    series: [
      {
        name: 'Actual',
        data: RFT,
        color: '#003566',
        lineColor: '#00688B',
        dataLabels: {
          enabled: true,
          style: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: '10px',
          },
          formatter: function () {
            return this.y + '%';
          },
        },
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 5,
          fillColor: '#FF5733',
          lineColor: '#C70039',
          lineWidth: 2,
        },
      },
      {
        name: 'EFF', // Thêm series mới cho EFF
        type: 'column', // Loại biểu đồ
        data: EFF, // Dữ liệu từ EFF
        color: '#FF9800', // Màu cột cho EFF
        dataLabels: {
          enabled: true,
          style: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: '10px',
          },
          formatter: function () {
            return this.y + '%';
          },
        },
      },
      {
        name: 'Base Line',
        type: 'line',
        data: Array(floor.length).fill(80),
        marker: {
          enabled: false,
        },
        lineColor: '#fc0905',
        dashStyle: 'ShortDash',
        enableMouseTracking: false,
        dataLabels: {
          enabled: false,
        },
        fillColor: 'none',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <Card
        sx={{
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: "'Roboto', sans-serif",
              color: '#239d85',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0px',
            }}
          >
            {translation['EFFICIENCY BY FLOOR']}
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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

export default EfficiencyByFloor;
