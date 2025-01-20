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

const DigitalAndonCase = ({ date }) => {
  const [chartData, setChartData] = useState(null);
  const [totalHourTime, setTotalHourTime] = useState(0); // State lưu tổng hourtime
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const formattedDate = date.format('YYYY-MM-DD');
        const response = await fetch(
          `http://192.168.30.245:8989/kpi_overview/get_digital_andon?date=${formattedDate}`
        );

        const result = await response.json();

        if (result.status === 0 && result.data.getDigitalAndon) {
          const categories = result.data.getDigitalAndon.map(
            (item) => item.hourtime
          );
          const data = result.data.getDigitalAndon?.map((item) => item.Lean);

          // Tính tổng hourtime
          const total = result.data.getDigitalAndon.reduce(
            (sum, item) => sum + (item.Lean || 0), // Nếu `hourtime` không tồn tại, cộng 0
            0
          );

          setTotalHourTime(total); // Lưu tổng vào state
          setChartData({
            categories,
            data,
          });
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
  }, [date]);

  const options = {
    chart: {
      type: 'area',
      spacingTop: 0, // Loại bỏ khoảng cách trên
      spacingRight: 0, // Loại bỏ khoảng cách phải
      spacingBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      height: 250,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: chartData?.categories || [],
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: '' },
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    legend: {
      enabled: false, // Tắt chú thích
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            fontWeight: 600,
          },
        },
        fillOpacity: 0.1,
      },
    },
    series: [
      {
        name: 'Lean',
        data: chartData?.data || [],
        color: '#b81f89',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(249, 47, 188, 0.5)'], // Màu trên cùng
            [1, 'rgba(249, 47, 188, 0.1)'], // Màu dưới cùng
          ],
        },
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div
      className="p-2 rounded-lg"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
      }}
    >
      <h1 className="font-bold text-gray-500">{t['DIGITAL ANDON CASES']}</h1>
      <div>
        <span className="font-bold text-3xl">
          {totalHourTime} {t['TIMES']}
        </span>
      </div>
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

export default DigitalAndonCase;
