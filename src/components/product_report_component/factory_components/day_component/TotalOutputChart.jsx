import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';

import { fetchDailyTotalOutput } from '@/apis/product_report_api/factoryAPI/DayAPI';
import { fetchWeekTotalOutput } from '@/apis/product_report_api/factoryAPI/WeekAPI';
import { fetchMonthTotalOutput } from '@/apis/product_report_api/factoryAPI/MonthAPI';

import { setLoading, setError } from '@/redux/data_factory_redux/ReportSlice';
import { useTranslations } from '@/config/useTranslations';

const TotalOutputChart = ({ selectedDate, timePeriod }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.report.chartData,
    loading: state.report.loading,
    error: state.report.error,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1;

        // Xử lý fetch dựa trên timePeriod
        if (timePeriod === 'day') {
          await dispatch(fetchDailyTotalOutput(year, month));
        } else if (timePeriod === 'week') {
          await dispatch(fetchWeekTotalOutput(year, month));
        } else if (timePeriod === 'month') {
          await dispatch(fetchMonthTotalOutput(year, month));
        } else {
          throw new Error('Invalid timePeriod');
        }
      } catch (err) {
        dispatch(setError(err.toString()));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [selectedDate, timePeriod, dispatch]);

  const getTitle = () => {
    switch (timePeriod) {
      case 'day':
        return t['DAILY TOTAL OUTPUT'];
      case 'week':
        return t['WEEKLY TOTAL OUTPUT'];
      case 'month':
        return t['MONTHLY TOTAL OUTPUT'];
      default:
        return t['TOTAL OUTPUT'];
    }
  };

  const options = {
    chart: {
      type: 'column',
      height: 280,
      spacingBottom: 0,
      spacingTop: 0,
    },
    title: null,
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      itemStyle: { fontSize: '10px', fontWeight: 'bold' },
      itemHoverStyle: { color: '#f44336' },
    },
    xAxis: {
      categories: [...(chartData?.categories || [])],
      labels: { style: { fontSize: '10px', fontWeight: 600 } },
    },
    yAxis: {
      title: { text: null },
      labels: { enabled: false },
      stackLabels: {
        enabled: true,
        style: { color: 'black', fontSize: '10px', fontWeight: 600 },
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          style: { fontSize: '10px', fontWeight: 'semibold' },
        },
      },
    },
    series: [
      {
        name: 'Unreach',
        data: [...(chartData.unachieved || [])],
        color: '#EF5350',
      },
      { name: 'Actual', data: [...(chartData.actual || [])], color: '#003566' },
      {
        name: 'Target',
        data: [...(chartData?.target || [])].slice(0, 26),
        color: '#000',
      },
    ],
    credits: { enabled: false },
  };

  return (
    <Card
      sx={{
        height: 350,
        border: 1,
        overflow: 'hidden',
      }}
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: "'Roboto', sans-serif",
            color: '#333',
            textAlign: 'center',
          }}
        >
          {getTitle()}
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // height: "100%",
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
  );
};

export default TotalOutputChart;
