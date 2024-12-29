// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { CircularProgress } from "@mui/material";
// import Calendar from "@/components/product_report_component/common_product_report/Calendar";
// import { fetchDailyTotalOutput } from "@/apis/product_report_api/DayAPI";
// import dayjs from "dayjs";
// import {
//   setLoading,
//   setError,
//   setChartData,
// } from "@/redux/loading/loadingSlice";

// const DailyTotalOutputChart = () => {
//   const dispatch = useDispatch();
//   const { chartData, loading, error } = useSelector((state) => ({
//     chartData: state.loading.chartData, // Lấy chartData từ state của Redux
//     loading: state.loading.loading,
//     error: state.loading.error,
//   }));

//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const handleDateChange = (date) => {
//     if (date) {
//       setSelectedDate(date);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(setLoading(true)); // Bắt đầu loading
//       try {
//         const year = selectedDate.year();
//         const month = selectedDate.month() + 1; // month() trả về từ 0-11
//         await dispatch(fetchDailyTotalOutput(year, month)); // Fetch dữ liệu qua dispatch
//         dispatch(setLoading(false)); // Kết thúc loading
//       } catch (error) {
//         dispatch(setError(error.toString())); // Lưu lỗi vào Redux
//       }
//     };

//     fetchData();
//   }, [selectedDate, dispatch]);

//   // Highcharts options
//   const options = {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "Daily Total Output",
//     },
//     xAxis: {
//       categories: chartData.categories,
//       title: {
//         text: "Date",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "RFT",
//       },
//     },
//     series: [
//       {
//         name: "RFT",
//         data: chartData.data,
//       },
//     ],
//     credits: {
//       enabled: false,
//     },
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: 20 }}>
//         <Calendar
//           selectedDate={selectedDate}
//           handleDateChange={handleDateChange}
//         />
//       </div>
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <div>Error: {error}</div>
//       ) : (
//         <HighchartsReact highcharts={Highcharts} options={options} />
//       )}
//     </div>
//   );
// };

// export default DailyTotalOutputChart;

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import dayjs from "dayjs";
import data from "@public/data/daily_total_output.json"; // Import file JSON

const DailyTotalOutputChart = () => {
  const [chartData, setChartData] = useState({ categories: [], data: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        // Lọc dữ liệu theo tháng và năm đã chọn
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() trả về từ 0-11
        const filteredData = data.filter((item) => {
          const [day, monthStr] = item.date.split("/").map(Number);
          return monthStr === month && year === 2024; // Giả sử dữ liệu năm 2024
        });

        // Chuyển đổi dữ liệu thành format cho Highcharts
        const categories = filteredData.map((item) => item.date);
        const seriesData = filteredData.map((item) => item.RFT);

        //setChartData({ categories, data: seriesData });
        setChartData({
          categories: ["12/04", "12/05", "12/06"], // Ngày tháng
          actual: [75235, 76405, 77250], // Dữ liệu Actual
          unreach: [53645, 50220, 49160], // Dữ liệu Unreach
          target: [128880, 126470, 126280], // Dữ liệu Target
        });

        setError(null);
      } catch (err) {
        setError("Error loading data.");
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchData();
  }, [selectedDate]);

  // Highcharts options
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Daily Total Output",
    },
    xAxis: {
      categories: chartData.categories,
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: null },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
        formatter: function () {
          return this.total; // Hiển thị tổng giá trị
        },
      },
    },
    legend: {
      align: "center",
      verticalAlign: "top",
      layout: "horizontal",
    },
    plotOptions: {
      column: {
        stacking: "normal", // Cột xếp chồng lên nhau
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y; // Hiển thị giá trị của mỗi phần
          },
          style: {
            fontWeight: "bold",
            fontSize: "10px",
          },
        },
      },
    },
    series: [
      {
        name: "Actual",
        data: chartData.actual, // Dữ liệu cho "Actual"
        color: "#4CAF50", // Màu xanh lá
      },
      {
        name: "Unreach",
        data: chartData.unreach, // Dữ liệu cho "Unreach"
        color: "#FF5722", // Màu đỏ
      },
      {
        name: "Target",
        data: chartData.target, // Dữ liệu cho "Target"
        color: "#000000", // Màu đen
        dataLabels: {
          enabled: false, // Không hiển thị nhãn riêng cho Target
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card
      sx={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // shadow: X-offset, Y-offset, blurRadius, màu sắc
        borderRadius: 2, // border radius cho card, tùy chỉnh theo thiết kế
      }}
    >
      <CardContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100px",
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

export default DailyTotalOutputChart;
