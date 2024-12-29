import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress } from "@mui/material";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import dayjs from "dayjs";
import data from "@/data/dailyTotalOutput.json"; // Import file JSON

const DailyTotalOutputChart = () => {
  const [chartData, setChartData] = useState({ categories: [], data: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

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

        setChartData({ categories, data: seriesData });
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
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "RFT",
      },
    },
    series: [
      {
        name: "RFT",
        data: chartData.data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Calendar
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default DailyTotalOutputChart;
