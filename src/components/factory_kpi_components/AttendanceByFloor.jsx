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
import { fetchFloorDataS } from '@/apis/factory_kpi_api/FactoryAPI';
import { fetchFloorData } from '@/apis/factory_kpi_api/FactoryFloorAPI';
import { useTranslations } from '@/config/useTranslations';

const AttendanceByFloor = ({ date, floor }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translations = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = floor
          ? await fetchFloorData(date.format('YYYY/MM/DD'), floor)
          : await fetchFloorDataS(date.format('YYYY/MM/DD'), 'LHG');

        setChartData(response); // Directly use the returned array
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor]);

  const options = {
    chart: {
      type: 'column',
      marginTop: 80,
      marginLeft: 0,
      marginRight: 0,
      height: '300px',
    },
    title: null,

    xAxis: {
      categories: chartData?.map((item) => item.lineAlias),
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
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
          },
        },
        grouping: true,
      },
    },
    series: [
      {
        name: 'Stitching',
        data: chartData?.map((item) => item.stitching),
        color: '#0245C8',
      },
      {
        name: 'Assembly',
        data: chartData?.map((item) => item.assembly),
        color: '#6324CF',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
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
          {translations['ATTENDANCE BY FLOOR']}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px',
            }}
          >
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          </Box>
        ) : chartData.length === 0 ? (
          <Typography variant="body1" align="center">
            No data available.
          </Typography>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceByFloor;
