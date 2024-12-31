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
import { fetchDailyRFT } from "@/apis/product_report_api/DayAPI";
import dayjs from "dayjs";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const DailyRFT = () => {
  const dispatch = useDispatch();
  const { chartDataDailyRFT, loading, error } = useSelector((state) => ({
    chartDataDailyRFT: state.loading.chartDataDailyRFT, // Lấy chartDataDailyRFT từ state của Redux
    loading: state.loading.loading,
    error: state.loading.error,
  }));

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Bắt đầu loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() trả về từ 0-11
        await dispatch(fetchDailyRFT(year, month)); // Fetch dữ liệu qua dispatch
        dispatch(setLoading(false)); // Kết thúc loading
      } catch (error) {
        dispatch(setError(error.toString())); // Lưu lỗi vào Redux
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

  const options = {
    chart: {
      type: "area",
      marginTop: 100,
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: "DAILY RFT",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      borderColor: "#ccc",
      marginBottom: 50,
      borderWidth: 2,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "8px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: [...(chartDataDailyRFT?.date || [])],
      labels: {
        style: {
          fontSize: "8px"
        }
      }
    },
    yAxis: {
      visible: false,
      offset: 0, // Đặt biểu đồ sát trục X
    },
    series: [
      {
        name: "Actual",
        data: [...(chartDataDailyRFT.RFT || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#00B2EE",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(65, 0, 147, 0.6)"],
            [1, "rgba(65, 0, 147,  0.2)"],
          ],
        },
        lineColor: "#00688B",
        dataLabels: {
          enabled: true, // Bật hiển thị dữ liệu trực tiếp
          style: {
            color: "#000", // Màu chữ
            fontWeight: "bold",
            fontSize: "8px",
          },
          formatter: function () {
            return this.y.toFixed(2) + "%"; // Hiển thị giá trị với 2 chữ số thập phân
          },
        },
      },
      {
        name: "Baseline", // Tên của đường trung bình
        data: Array(chartDataDailyRFT?.date.length).fill(90), // Giá trị cố định 65% cho tất cả các điểm trên trục x
        marker: {
          enabled: false, // Không hiển thị marker cho đường này
        },
        lineColor: "#0000CD", // Màu đường trung bình
        dashStyle: "ShortDash", // Kiểu nét đứt
        enableMouseTracking: false, // Tắt sự kiện di chuột trên đường này
        dataLabels: {
          enabled: false, // Không hiển thị dữ liệu trên đường trung bình
        },
        fillColor: "none",
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

export default DailyRFT;
