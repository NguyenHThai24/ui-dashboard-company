import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fetchDailyTotalOutput } from "@/apis/product_report_api/DayAPI";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const DailyTotalOutputChart = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.loading.chartData,
    loading: state.loading.loading,
    error: state.loading.error,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1;
        await dispatch(fetchDailyTotalOutput(year, month));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.toString()));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

  const options = {
    chart: {
      type: "column",
      marginTop: 100,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: "DAILY TOTAL OUTPUT",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif", // Font chữ đẹp và phổ biến
        color: "#333", // Màu sắc chữ tinh tế
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Bóng chữ nhẹ
        letterSpacing: "1.5px", // Tăng khoảng cách giữa các chữ cái
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      borderColor: "#ccc",
      borderWidth: 2,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: (chartData?.categories || []).slice(0, 26), // Chỉ lấy 26 cột
      labels: { style: { fontSize: "10px" } },
    },
    yAxis: {
      title: { text: "" },
      stackLabels: {
        enabled: true,
        style: { color: "black", fontSize: "10px" },
      },
      labels: { enabled: false },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: { fontSize: "10px", fontWeight: "semibold" },
        },
      },
    },
    series: [
      {
        name: "Unreach",
        data: (chartData?.unachieved || []).slice(0, 26),
        color: "#f39c12",
      },
      {
        name: "Actual",
        data: (chartData?.actual || []).slice(0, 26),
        color: "#003566",
      },
      {
        name: "Target",
        data: (chartData?.target || []).slice(0, 26), // Thêm dữ liệu Target
        color: "#000", // Màu sắc cho Target
        // visible: false, // Ẩn khỏi biểu đồ nhưng hiển thị trong legend
      },
    ],
    credits: { enabled: false },
  };

  return (
    <Card>
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
