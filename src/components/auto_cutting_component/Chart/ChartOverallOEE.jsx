import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LabelList,
} from 'recharts';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import { getAutoCuttingUrl } from '../../../apis/auto_cutting_api/AutoCuttingAPI';
import { useTranslations } from '@/config/useTranslations';

// Đảm bảo đăng ký các thành phần của Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const OverallOEE = ({ date }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [overallOEE, setOverallOEE] = useState(0);
  const [newAvailability, setNewAvailability] = useState(0);
  const [newPerformance, setNewPerformance] = useState(0);
  const [newQuality, setNewQuality] = useState(0);
  const [chartData, setChartData] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    if (!date) return; // If no date, skip fetching data

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          getAutoCuttingUrl(date.format('YYYY-MM-DD'))
        );
        if (response.status === 200) {
          const rawData = response.data.data || [];

          // Aggregate data for calculations
          const availableTime = rawData.reduce(
            (acc, item) => acc + (item.AvailableTime || 0),
            0
          );
          const operating = rawData.reduce(
            (acc, item) => acc + (item.Operating || 0),
            0
          );
          const theoreticalOutput = rawData.reduce(
            (acc, item) => acc + (item.TheoreticalOutput || 0),
            0
          );
          const actualOutput = rawData.reduce(
            (acc, item) => acc + (item.ActualOutput || 0),
            0
          );
          const defectiveProduct = rawData.reduce(
            (acc, item) => acc + (item.DefectiveProduct || 0),
            0
          );

          // Calculate OEE components
          const availability = availableTime ? operating / availableTime : 0;
          const performance = theoreticalOutput
            ? actualOutput / theoreticalOutput
            : 0;
          const quality = actualOutput
            ? (actualOutput - defectiveProduct) / actualOutput
            : 0;

          // Prepare chart data
          const newChartData = [
            {
              name: 'Quality',
              value: parseFloat((quality * 100).toFixed(1)) || 0,
              fill: '#8884d8',
            },
            {
              name: 'Performance',
              value: parseFloat((performance * 100).toFixed(1)) || 0,
              fill: '#82ca9d',
            },
            {
              name: 'Availability',
              value: parseFloat((availability * 100).toFixed(1)) || 0,
              fill: '#82adf9',
            },
          ];

          // Calculate overall OEE
          const newOverallOEE = availability * performance * quality * 100 || 0;

          // Update state
          setChartData(newChartData);
          setOverallOEE(newOverallOEE.toFixed(2));
          setNewAvailability((availability * 100).toFixed(2));
          setNewPerformance((performance * 100).toFixed(2));
          setNewQuality((quality * 100).toFixed(2));
        } else {
          setError('Failed to fetch data: Invalid response');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  return (
    <Card
      style={{
        padding: '16px',
        height: '560px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.8)',
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          marginBottom: '10px',
          textAlign: 'center',
          borderBottom: '2px solid green',
        }}
      >
        {t['OVERALL OEE']}
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <>
          <Box>
            <Typography variant="h3" textAlign="center" fontWeight={900}>
              {overallOEE}%
            </Typography>
          </Box>
          <Box display="" justifyContent="space-around" marginTop="30px">
            <Typography>
              {t['Availability']}:{' '}
              <span className="font-bold">{newAvailability}%</span>
            </Typography>
            <Typography>
              {t['Performance']}:{' '}
              <span className="font-bold">{newPerformance}%</span>
            </Typography>
            <Typography>
              {t['Quality']}: <span className="font-bold">{newQuality}%</span>
            </Typography>
          </Box>
          <Box width="100%" height="50%">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                startAngle={90}
                endAngle={450}
                innerRadius="20%"
                outerRadius="90%"
                data={chartData}
              >
                <RadialBar dataKey="value" background={{ fill: '#eee' }}>
                  <LabelList
                    dataKey="value"
                    position="insideEnd"
                    fill="#000"
                    fontSize={12}
                    formatter={(label) => `${label || 0}%`}
                  />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Card>
  );
};

export default OverallOEE;
