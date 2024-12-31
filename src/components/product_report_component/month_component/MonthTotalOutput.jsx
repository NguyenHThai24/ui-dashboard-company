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
import { fetchMonthTotalOutput } from "@/apis/product_report_api/MonthAPI";
import dayjs from "dayjs";
import { setLoading, setError } from "@/redux/data_redux/MonthReportSlice";

const MonthTotalOutputChart = () => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.monthreport.chartData, // Lấy chartData từ state của Redux
    loading: state.monthreport.loading,
    error: state.monthreport.error,
  }));

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Start loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchMonthTotalOutput(year, month)); // Fetch data through dispatch
        dispatch(setLoading(false)); // End loading
      } catch (error) {
        dispatch(setError(error.toString())); // Log error to Redux
      }
    };

    fetchData();
  }, [selectedDate, dispatch]); // Watch for changes in selectedDate

  const options = {
    chart: {
      type: "column",
      marginTop: 100,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: "TOTAL OUTPUT BY MONTH",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      layout: "vertical",
      align: "left", // Đặt legend về giữa
      verticalAlign: "top", // Đặt lên trên biểu đồ
      borderColor: "#ccc", // Màu viền
      borderWidth: 2, // Độ dày viền
      backgroundColor: "white", // Màu nền cho hộp chứa series
      itemStyle: {
        fontSize: "14px", // Cỡ chữ cho tên series
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336", // Màu chữ khi di chuột vào tên series
      },
      itemDistance: 10, // Khoảng cách giữa các mục trong legend
    },
    xAxis: {
      categories: chartData?.categories
    },
    yAxis: {
      visible: false,
    },
    plotOptions: {
      column: {
        stacking: "normal", // Hiển thị các cột xếp chồng
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
    },
    series: [
      {
        name: "Unreach",
        data: chartData.unachieved, // Giá trị "Unachieved"
        color: "#f44336", // Màu cho Unachieved
      },
      {
        name: "Actual",
        data: chartData.actual, // Giá trị "Actual"
        color: "#4caf50", // Màu cho Actual
      },
      {
        name: "Target",
        type: "scatter", // Sử dụng scatter để hiển thị giá trị target
        data: chartData.Target,
        marker: {
          enabled: false, // Hiển thị điểm trên đồ thị
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y.toLocaleString();
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#000", // Màu chữ
          },
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
        borderRadius: 2, // border radius cho card
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

export default MonthTotalOutputChart;
