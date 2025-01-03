import { useEffect } from "react";
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
import { fetchWeekTotalOutput } from "@/apis/product_report_api/factoryAPI/WeekAPI";
import { setLoading, setError } from "@/redux/data_factory_redux/WeekReportSlice";

const WeekTotalOutputChart = ({selectedDate}) => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.weekreport.chartData, // Lấy chartData từ state của Redux
    loading: state.weekreport.loading,
    error: state.weekreport.error,
  }));


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Start loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchWeekTotalOutput(year, month)); // Fetch data through dispatch
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
      text: "WEEKLY TOTAL OUTPUT",
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
      align: "left", // Đặt legend về giữa
      verticalAlign: "top", // Đặt lên trên biểu đồ

      borderColor: "#ccc", // Màu viền
      borderWidth: 2, // Độ dày viền
      backgroundColor: "white", // Màu nền cho hộp chứa series
      itemStyle: {
        fontSize: "10px", // Cỡ chữ cho tên series
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336", // Màu chữ khi di chuột vào tên series
      },
      itemDistance: 10, // Khoảng cách giữa các mục trong legend
    },
    xAxis: {
      categories: [...(chartData?.categories || [])], // Sử dụng categories từ dữ liệu đã xử lý
      labels:{
        style: {
          fontSize: "10px",
          fontWeight: 600
        }
      }
    },
    yAxis: {
      title: {
        text: "",
    },
    stackLabels: {
        enabled: true,
        style: {
            color: "black",
            fontWeight: 600,
            fontSize: "10px", // Font chữ nhỏ hơn cho stack labels
        },
    },
    labels: { enabled: false },
    },
    plotOptions: {
      column: {
        stacking: "normal", // Hiển thị các cột xếp chồng
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
            fontWeight: "semibold",
          },
        },
      },
    },
    series: [
      {
        name: "Unreach",
        data: [...(chartData.unachieved || [])], // Giá trị "Unachieved"
        color: "#EF5350", // Màu cho Unachieved
      },
      {
        name: "Actual",
        data: [...(chartData.actual || [])], // Giá trị "Actual"
        color: "#003566", // Màu cho Actual
      },
      {
        name: "Target",
        data: [...(chartData?.target || [])].slice(0, 26), // Thêm dữ liệu Target
        color: "#000", // Màu sắc cho Target
        // visible: false, // Ẩn khỏi biểu đồ nhưng hiển thị trong legend
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card
      // sx={{
      //   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // shadow: X-offset, Y-offset, blurRadius, màu sắc
      //   borderRadius: 2, // border radius cho card
      // }}
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

export default WeekTotalOutputChart;
