import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress } from "@mui/material";
import Calendar from "@/components/product_report_component/common_product_report/Calendar";
import { fetchDailyTotalOutput } from "@/apis/product_report_api/DayAPI";
import dayjs from "dayjs";
import {
  setLoading,
  setError,
  setChartData,
} from "@/redux/loading/loadingSlice";

const DailyTotalOutputChart = () => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.loading.chartData, // Lấy chartData từ state của Redux
    loading: state.loading.loading,
    error: state.loading.error,
  }));

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Bắt đầu loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() trả về từ 0-11
        await dispatch(fetchDailyTotalOutput(year, month)); // Fetch dữ liệu qua dispatch
        dispatch(setLoading(false)); // Kết thúc loading
      } catch (error) {
        dispatch(setError(error.toString())); // Lưu lỗi vào Redux
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

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
