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
import { fetchDailyRFT } from '@/apis/product_report_api/factoryAPI/DayAPI';
import { fetchWeekRFT } from '@/apis/product_report_api/factoryAPI/WeekAPI';
import { fetchMonthRFT } from '@/apis/product_report_api/factoryAPI/MonthAPI';
import { setLoading, setError } from '@/redux/data_factory_redux/ReportSlice';

const RFTChart = ({ selectedDate, timePeriod }) => {
  const dispatch = useDispatch();
  const { chartDataRFT, loading, error } = useSelector((state) => ({
    chartDataRFT: state.report.chartDataRFT,
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
          await dispatch(fetchDailyRFT(year, month));
        } else if (timePeriod === 'week') {
          await dispatch(fetchWeekRFT(year, month));
        } else if (timePeriod === 'month') {
          await dispatch(fetchMonthRFT(year, month));
        } else {
          throw new Error('Invalid timePeriod');
        }
      } catch (error) {
        dispatch(setError(error.toString()));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [selectedDate, timePeriod, dispatch]);

  const getTitle = () => {
    switch (timePeriod) {
      case 'day':
        return 'DAILY RFT';
      case 'week':
        return 'WEEKLY RFT';
      case 'month':
        return 'MONTHLY RFT';
      default:
        return 'TOTAL OUTPUT';
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
      y: -10,
    },
    xAxis: {
      categories:
        timePeriod === 'day'
          ? [...(chartDataRFT?.date || [])]
          : timePeriod === 'week'
            ? [...(chartDataRFT?.week || [])]
            : [...(chartDataRFT?.Month || [])],
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        name: 'Actual',
        data: [...(chartDataRFT?.RFT || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: '#117864',
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(17, 120, 100, 0.6)'],
            [1, 'rgba(17, 120, 100, 0.4)'],
          ],
        },
        lineColor: '#117864',
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
          (timePeriod === 'day'
            ? chartDataRFT?.date?.length
            : timePeriod === 'week'
              ? chartDataRFT?.week?.length
              : chartDataRFT?.Month?.length) || 0
        ).fill(100),
        marker: {
          enabled: false,
        },
        lineColor: '#0e6251',
        dashStyle: 'ShortDash',
        enableMouseTracking: true,
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
        boxShadow: '2px 4px 10px rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        overflow: 'hidden',
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '1.5px',
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

export default RFTChart;
