import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { useTranslations } from '../../config/useTranslations';

const EfficiencyChart = ({ timeFrame }) => {
  const [chartData, setChartData] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ánh xạ các giá trị timeFrame sang URL API tương ứng
        const urlMap = {
          WEEKLY:
            'http://192.168.30.245:8989/eff/getWeeklyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
          DAILY:
            'http://192.168.30.245:8989/eff/getDailyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
          MONTHLY:
            'http://192.168.30.245:8989/eff/getMonthlyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
        };

        // Lấy URL dựa trên timeFrame, mặc định là DAILY nếu không hợp lệ
        const url = urlMap[timeFrame] || urlMap['DAILY'];

        // Gọi API
        const response = await axios.get(url);
        const responseData = response.data;
        if (responseData.status === 0) {
          const baselineEFF = responseData.data[0].BaselineEFF;
          const eff = responseData.data[1].EFF;
          const rft = responseData.data[2].RFT;

          const formattedData = Object.keys(eff)
            .map((day) => {
              if (day !== null && !isNaN(day)) {
                const month = format(new Date(2025, 0, day), 'dd/MM');
                return {
                  day: parseInt(day),
                  month,
                  EFF: eff[day] || null,
                  RFT: rft[day] || null,
                  BaselineEFF: baselineEFF || null,
                };
              }
              return null;
            })
            .filter((item) => item !== null);

          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return (
    <div
      className="p-2 mt-4"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
        borderRadius: '8px',
      }}
    >
      <h1 className="pb-6 pl-3 font-bold text-xl">
        {t['Factory Efficiency Chart']}
      </h1>
      <div style={{ width: '100%', height: 350, backgroundColor: '#f5f5f5' }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
          >
            {/* Use regular SVG elements for gradients */}

            <defs>
              <linearGradient id="effGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#292bc2" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#292bc2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rftGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f70000" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f70000" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#555' }}
              axisLine={{ stroke: '#ddd' }}
              tickLine={{ stroke: '#ddd' }}
              label={false}
            />
            <YAxis tick={{ fill: '#555' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#e2d9cb',
                border: '5px solid green',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
            />
            <Legend verticalAlign="top" />

            {/* Vùng fill màu từ đường EFF xuống trục X */}
            <Area
              type="monotone"
              dataKey="EFF"
              stroke="none"
              fill="url(#effGradient)"
              fillOpacity={1}
              name="Efficiency (EFF)"
            />
            {/* Vùng fill màu từ đường RFT xuống trục X */}
            <Area
              type="monotone"
              dataKey="RFT"
              stroke="none"
              fill="url(#rftGradient)"
              fillOpacity={1}
              name="Right First Time (RFT)"
            />
            <Line
              type="monotone"
              dataKey="EFF"
              stroke="#292bc2"
              name="Efficiency (EFF)"
              strokeWidth={2}
              dot={true}
              activeDot={{
                r: 6,
                stroke: '#292bc2',
                strokeWidth: 2,
                fill: '#8884d8',
              }}
            />
            <Line
              type="monotone"
              dataKey="RFT"
              stroke="#f70000"
              name="Right First Time (RFT)"
              strokeWidth={2}
              dot={true}
              activeDot={{
                r: 6,
                stroke: '#f70000',
                strokeWidth: 2,
                fill: '#fefe07',
              }}
            />
            <Line
              type="monotone"
              dataKey="BaselineEFF"
              stroke="#ff7300"
              name="Baseline Efficiency"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 6,
                stroke: '#ff7300',
                strokeWidth: 2,
                fill: '#07fef3',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EfficiencyChart;
