import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useEffect } from 'react';
import { fetchDailyStitchingAssemblyMP } from '@/apis/product_report_api/factoryAPI/DayAPI';
import { fetchWeekStitchingAssemblyMP } from '@/apis/product_report_api/factoryAPI/WeekAPI';
import { fetchMonthStitchingAssemblyMP } from '@/apis/product_report_api/factoryAPI/MonthAPI';

import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError } from '@/redux/data_factory_redux/ReportSlice';
import { useTranslations } from '@/config/useTranslations';

const StitchingAssemblyMPChart = ({ selectedDate, timePeriod }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { chartDataSAMP, loading, error } = useSelector((state) => ({
    chartDataSAMP: state.report.chartDataSAMP, // Lấy chartData từ state của Redux
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
          await dispatch(fetchDailyStitchingAssemblyMP(year, month));
        } else if (timePeriod === 'week') {
          await dispatch(fetchWeekStitchingAssemblyMP(year, month));
        } else if (timePeriod === 'month') {
          await dispatch(fetchMonthStitchingAssemblyMP(year, month));
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
  }, [selectedDate, dispatch, timePeriod]);

  const getTitle = () => {
    switch (timePeriod) {
      case 'day':
        return t['DAILY STITCHING & ASSEMBLY MP'];
      case 'week':
        return t['WEEKLY STITCHING & ASSEMBLY MP'];
      case 'month':
        return t['MONTHLY STITCHING & ASSEMBLY MP'];
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
    xAxis: {
      categories:
        timePeriod === 'day'
          ? [...(chartDataSAMP?.outputdate || [])]
          : [...(chartDataSAMP?.Week || [])], // Áp dụng cho week và month
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      title: { text: null },
      labels: { enabled: false },
      stackLabels: {
        enabled: true,
        style: { color: 'black', fontSize: '10px', fontWeight: 600 }, // Smaller stack labels
      },
    },
    legend: {
      enabled: false, // Tắt hoàn toàn phần legend và màu sắc
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true, // Hiển thị giá trị trên đầu cột
          style: {
            fontSize: '10px',
            fontWeight: 600,
            color: '#000000',
          },
        },
      },
    },
    series: [
      {
        name: 'Worker',
        data: [...(chartDataSAMP.worker || [])], // Dữ liệu của cột Y
        color: '#003566',
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
      <CardContent>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: "'Roboto', sans-serif",
            color: '#333',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '1.5px',
            textAlign: 'center',
            mb: 2, // Khoảng cách dưới tiêu đề
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
  );
};

export default StitchingAssemblyMPChart;
