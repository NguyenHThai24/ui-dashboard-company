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

const RFTChart = () => {
  const [chartData, setChartData] = useState(null);
  const [RFTFactory, setRFTFactory] = useState(null);
  const [RFTValues, setRFTValues] = useState([]);
  const [timeRanges, setTimeRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://192.168.30.245:8989/kpi_overview/getRFT?date=2025-01-18'
        );
        const data = await response.json();
        const { getRFTtime, getRFTFactory } = data.data;

        setRFTValues(getRFTtime.map((item) => item.RFT));
        setRFTFactory(getRFTFactory[0]?.RFTFactory);
        setTimeRanges(getRFTtime.map((item) => item.TimeRange));
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const RFTValuesPercentage = RFTValues.map((value) => value * 100);

  const options = {
    chart: {
      type: 'area',
      height: 250,
      spacingTop: 0, // Loại bỏ khoảng cách trên
      spacingRight: 0, // Loại bỏ khoảng cách phải
      spacingBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: '',
      align: 'center',
    },
    xAxis: {
      categories: timeRanges,
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: '' },
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
      min: 0,
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        marker: { enabled: true, radius: 1, symbol: 'circle' },
        fillOpacity: 0.1,
        dataLabels: {
          enabled: true,
          style: { fontSize: '10px', fontWeight: 600, color: '#333' },
          formatter: function () {
            return `${this.y.toFixed(1)}%`;
          },
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormat: `<span style="color:{point.color}">{series.name}: </span><b>{point.y:.1f}%</b><br/>`,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      style: { fontSize: '12px', fontWeight: 'bold', color: '#333' },
    },
    series: [
      {
        name: 'Target (85%)',
        data: Array(RFTValues.length).fill(85),
        color: '#25283D',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(251, 86, 9, 0.5)'],
            [1, 'rgba(251, 86, 9, 0.5)'],
          ],
        },
        dashStyle: 'Solid',
        enableMouseTracking: true,
        dataLabels: { enabled: false },
      },
      {
        name: 'Actual RFT',
        data: RFTValuesPercentage,
        color: '#0b9dcc',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(57, 162, 174, 0.5)'],
            [1, 'rgba(57, 162, 174, 0.5)'],
          ],
        },
        dataLabels: {
          enabled: true,
          style: { fontSize: '10px', fontWeight: 600, color: '#333' },
          formatter: function () {
            return `${this.y.toFixed(1)}%`;
          },
        },
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div
      className="px-2 py-2 rounded-lg shadow-md"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <h1 className="font-bold text-gray-500">{t['RFT']}</h1>
      <div>
        <span className="font-bold text-3xl">
          {RFTFactory !== null ? (RFTFactory * 100).toFixed(1) : '--'}%{' '}
        </span>
      </div>
      <p className="font-bold text-right">{t['TARGET']}: 85%</p>
      <Card>
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

export default RFTChart;
