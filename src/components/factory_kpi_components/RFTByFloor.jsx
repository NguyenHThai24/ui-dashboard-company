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
import { fetchRFTFloorDataS } from '@/apis/factory_kpi_api/FactoryAPI';
import { fetchRFTFloorData } from '@/apis/factory_kpi_api/FactoryFloorAPI';
import { useTranslations } from '@/config/useTranslations';

const RFTByFloor = ({ date, floor }) => {
  const [chartData, setChartData] = useState([]);
  const [baseline, setBaseline] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const translation = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (floor) {
          response = await fetchRFTFloorData(date.format('YYYY/MM/DD'), floor);
        } else {
          response = await fetchRFTFloorDataS(date.format('YYYY/MM/DD'), 'LHG');
        }

        const { floorData, baseline } = response;
        setBaseline(baseline);
        const data = floorData?.map((item) => ({
          name: item.lineAlias,
          y: item.quality,
        }));
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor]);

  const options = {
    chart: {
      type: 'line',
      marginTop: 80,
      marginLeft: 45,
      marginRight: 0,
      height: '300px',
    },
    title: null, // Remove title from the chart configuration
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
      itemHoverStyle: {
        color: '#f44336',
      },
      itemDistance: 2,
    },
    xAxis: {
      categories: chartData?.map((item) => item.name),
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      visible: true,
      title: '',
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    series: [
      {
        name: 'Actual',
        data: chartData.map((item) => item.y),
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
      },
      {
        name: 'Base Line',
        type: 'line',
        data: chartData?.map(() => baseline),
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

  const titleKey = floor ? 'RFT BY LINE' : 'RFT BY FLOOR';

  return (
    <div>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
        }}
        style={{
          boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
          background: '#fff', // Nền trắng
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
            {translation[titleKey]}
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

export default RFTByFloor;
