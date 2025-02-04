import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ComposedChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns'; // Sử dụng date-fns để xử lý ngày tháng
import { useTranslations } from '../../config/useTranslations';

const TotalManpowerChart = ({ timeFrame, date }) => {
  const [data, setData] = useState([]);

  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      const formatDate = date.format('YYYY-MM-DD');
      try {
        // Ánh xạ các giá trị timeFrame sang URL API tương ứng
        const urlMap = {
          DAILY: `http://192.168.30.245:8989/eff/getDailyTotalManpower?date=${formatDate}&modelName=BARREDA%20DECODE`,
          WEEKLY: `http://192.168.30.245:8989/eff/getWeeklyTotalManpower?date=${formatDate}&modelName=BARREDA%20DECODE`,
          MONTHLY: `http://192.168.30.245:8989/eff/getMonthlyTotalManpower?date=${formatDate}&modelName=BARREDA%20DECODE`,
        };

        // Lấy URL dựa trên timeFrame, mặc định là DAILY nếu không hợp lệ
        const url = urlMap[timeFrame] || urlMap['DAILY'];

        // Gọi API
        const response = await axios.get(url);
        const responseData = response.data;

        if (responseData.status === 0) {
          const actualOutput = responseData.data[0].Actual_output;
          const autoCutting = responseData.data[1].Autocutting;
          const stockFitting = responseData.data[2].Stockfitting;
          const assembly = responseData.data[3].Assembly;
          const stitching = responseData.data[4].Stitching;

          const formattedData = Object.keys(actualOutput)
            .map((key) => {
              if (key !== null && !isNaN(key)) {
                const date = new Date(2025, 0, parseInt(key)); // Thay đổi năm/tháng theo dữ liệu của bạn
                return {
                  day: format(date, 'dd/MM'), // Định dạng ngày/tháng
                  Actual_output: actualOutput[key] || null,
                  Autocutting: autoCutting[key] || null,
                  Stockfitting: stockFitting[key] || null,
                  Assembly: assembly[key] || null,
                  Stitching: stitching[key] || null,
                };
              }
              return null;
            })
            .filter((item) => item !== null);

          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeFrame, date]); // Đảm bảo useEffect được gọi lại khi timeFrame thay đổi

  return (
    <div
      className="p-2 my-4"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
        borderRadius: '8px',
      }}
    >
      <h1 className="pb-6 pl-3 font-bold text-xl">
        {t['Factory Total C2B Manpower']}
      </h1>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fill: '#555' }} />
            <YAxis yAxisId="left" tick={{ fill: '#555' }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#555' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#e2d9cb',
                border: '5px solid green',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
              cursor={{
                fill: 'rgba(0, 0, 0, 0.1)', // Màu nền làm nổi bật
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ color: '#555' }} />
            <Bar
              yAxisId="left"
              dataKey="Autocutting"
              fill="#d024e1"
              name="Autocutting"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="Stockfitting"
              fill="#f09407"
              name="Stockfitting"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="Assembly"
              fill="#d50f0f"
              name="Assembly"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="Stitching"
              fill="#0158e6"
              name="Stitching"
              barSize={20}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Actual_output"
              stroke="#111383"
              name="Actual Output"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalManpowerChart;
