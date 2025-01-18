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

const TotalActualOutput = () => {
  const [chartData, setChartData] = useState(null);
  const [totalOutput, setTotalOutput] = useState(null); // Thêm state cho totalOutput
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch(
          'http://192.168.30.245:8989/kpi_overview/total_actual_output?date=2025-01-18'
        );
        const result = await response.json();

        if (result.status === 0 && result.data.outputActual) {
          const categories = result.data.outputActual.map(
            (item) => item.outputtime
          );
          const target = result.data.outputActual.map((item) => item.target);
          const actual = result.data.outputActual.map((item) => item.actual);

          setChartData({
            categories, // Trục X
            target, // Dữ liệu "Target"
            actual, // Dữ liệu "Actual"
          });

          // Lấy giá trị từ totalOutput
          if (result.data.totalOutput && result.data.totalOutput[0]) {
            setTotalOutput(result.data.totalOutput[0].Actual_Quantity_LHG);
            setTarget(result.data.totalOutput[0].SCBZCL_Quantity); // Lấy target từ totalOutput
          }
        } else {
          throw new Error('Invalid API response structure');
        }
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
      height: 250,
      spacingTop: 0, // Loại bỏ khoảng cách trên
      spacingRight: 0, // Loại bỏ khoảng cách phải
      spacingBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: chartData?.categories || [], // Sử dụng trục X từ dữ liệu
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: '' },
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
      min: 0, // Đảm bảo giá trị bắt đầu từ 0
    },
    legend: {
      enabled: false, // Tắt legend
    },
    series: [
      {
        name: 'Target',
        data: chartData?.target || [], // Sử dụng dữ liệu "Target"
        color: '#ff2020',
        dataLabels: {
          enabled: true, // Hiển thị nhãn dữ liệu
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#ff2020',
          },
        },
      },
      {
        name: 'Actual',
        data: chartData?.actual || [], // Sử dụng dữ liệu "Actual"
        color: '#3bf715',
        dataLabels: {
          enabled: true, // Hiển thị nhãn dữ liệu
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#3bf715',
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
      <h1 className="font-bold text-gray-500">{t['TOTAL ACTUAL OUTPUT']}</h1>
      <div>
        {/* Hiển thị giá trị lấy từ API */}
        <span className="font-bold text-3xl">{totalOutput || '---'}</span>
        <span className="text-xs font-bold">{t['PAIRS']}</span>
      </div>
      <p className="font-bold text-right">
        {t['TARGET']}: {target || '---'}
      </p>
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

export default TotalActualOutput;
