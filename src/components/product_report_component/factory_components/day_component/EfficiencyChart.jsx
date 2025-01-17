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
import { fetchDailyEfficiency } from '@/apis/product_report_api/factoryAPI/DayAPI';
import { fetchWeekEfficiency } from '@/apis/product_report_api/factoryAPI/WeekAPI';
import { fetchMonthEfficiency } from '@/apis/product_report_api/factoryAPI/MonthAPI';

import { setLoading, setError } from '@/redux/data_factory_redux/ReportSlice';
import { useTranslations } from '@/config/useTranslations';

const EfficiencyChart = ({ selectedDate, timePeriod }) => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const { chartDataEfficiency, loading, error } = useSelector((state) => ({
    chartDataEfficiency: state.report.chartDataEfficiency, // Lấy chartDataDailyEfficiency từ state của Redux
    loading: state.report.loading,
    error: state.report.error,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1;
        if (timePeriod === 'day') {
          await dispatch(fetchDailyEfficiency(year, month));
        } else if (timePeriod === 'week') {
          await dispatch(fetchWeekEfficiency(year, month));
        } else if (timePeriod === 'month') {
          await dispatch(fetchMonthEfficiency(year, month));
        } else {
          throw new Error('Invalid timePeriod');
        }
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    fetchData();
  }, [selectedDate, timePeriod, dispatch]);

  const getTitle = () => {
    switch (timePeriod) {
      case 'day':
        return t['DAILY EFFICIENCY'];
      case 'week':
        return t['WEEKLY EFFICIENCY'];
      case 'month':
        return t['MONTHLY EFFICIENCY'];
      default:
        return t['TOTAL OUTPUT'];
    }
  };

  const options = {
    chart: {
      type: 'area',
      height: 280,
      spacingBottom: 0,
      spacingTop: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    title: null,
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      backgroundColor: 'white',
      itemStyle: {
        fontSize: '10px',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: '#0000FF',
      },
      itemDistance: 10,
      y: -10, // Điều chỉnh khoảng cách theo chiều dọc
    },
    xAxis: {
      categories:
        timePeriod === 'day'
          ? [...(chartDataEfficiency?.date || [])]
          : timePeriod === 'week'
            ? [...(chartDataEfficiency?.Week || [])]
            : [...(chartDataEfficiency?.Month || [])], // Mặc định là month
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      visible: false,
      offset: 0,
    },
    series: [
      {
        name: 'Actual',
        data:
          timePeriod === 'day'
            ? [...(chartDataEfficiency?.Factory_EFF || [])]
            : timePeriod === 'week'
              ? [...(chartDataEfficiency?.Factory_EFF || [])]
              : [...(chartDataEfficiency?.Factory_EFF || [])], // Mặc định là month
        marker: {
          enabled: true,
          radius: 4,
          fillColor: '#00B2EE',
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(0, 53, 102, 0.6)'],
            [1, 'rgba(0, 53, 102, 0.4)'],
          ],
        },
        lineColor: '#003566',
        dataLabels: {
          enabled: true,
          style: {
            color: '#000',
            fontWeight: 600,
            fontSize: '10px',
          },
          formatter: function () {
            return this.y.toFixed(2) + '%';
          },
        },
      },
      {
        name: 'Baseline',
        data: Array(
          timePeriod === 'day'
            ? chartDataEfficiency?.date?.length
            : timePeriod === 'week'
              ? chartDataEfficiency?.Week?.length
              : chartDataEfficiency?.Month?.length || 0
        ).fill(65),
        lineColor: '#0000FF',
        dashStyle: 'ShortDash',
        marker: {
          enabled: false, // Không hiển thị marker cho đường baseline
        },
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '1.5px',
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
              height: '100%',
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

export default EfficiencyChart;
