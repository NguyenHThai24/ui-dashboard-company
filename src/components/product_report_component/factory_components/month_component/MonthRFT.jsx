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
import { fetchMonthRFT } from "@/apis/product_report_api/factoryAPI/MonthAPI";
import { setLoading, setError } from "@/redux/data_redux/MonthReportSlice";

const MonthRFT = ({selectedDate}) => {
  const dispatch = useDispatch();
  const { chartDataMonthRFT, loading, error } = useSelector((state) => ({
    chartDataMonthRFT: state.monthreport.chartDataMonthRFT, // Lấy chartDataWeekRFT từ state của Redux
    loading: state.monthreport.loading,
    error: state.monthreport.error,
  }));


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Bắt đầu loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() trả về từ 0-11
        await dispatch(fetchMonthRFT(year, month)); // Fetch dữ liệu qua dispatch
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
      events: {
        load: function () {
          const chart = this;

          const actualData =
            chart.series[0]?.data?.map((point) => point.y) || [];
          if (actualData.length === 0) {
            console.warn("No data available for calculations.");
            return;
          }

          const average =
            actualData.reduce((sum, value) => sum + value, 0) /
            actualData.length;
          const current = actualData[actualData.length - 1] || 0;

          const textX = chart.plotLeft + chart.plotWidth - 150;
          const lineWidth = 6;
          const lineHeight = 30;
          const lineX = textX - 20;
          const averageY = chart.plotTop - 60; // Đẩy "AVERAGE" xuống dưới
          const currentY = chart.plotTop - 35; // Đẩy "CURRENT" xuống dưới

          chart.renderer
            .rect(lineX, averageY, lineWidth, lineHeight)
            .attr({
              fill: "#117864",
              radius: 2,
            })
            .add();

          chart.renderer
            .text(
              `AVERAGE: ${average.toFixed(2)}%`,
              textX,
              averageY + lineHeight / 2
            )
            .css({
              color: "#333",
              fontSize: "12px",
              fontWeight: "bold",
            })
            .add();

          chart.renderer
            .rect(lineX, currentY, lineWidth, lineHeight)
            .attr({
              fill: "#117864",
              radius: 2,
            })
            .add();

          chart.renderer
            .text(
              `CURRENT: ${current.toFixed(2)}%`,
              textX,
              currentY + lineHeight / 2
            )
            .css({
              color: "#333",
              fontSize: "12px",
              fontWeight: "bold",
            })
            .add();
        },
      },
    },
    title: {
      text: "MONTHLY RFT",
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
      marginBottom: 50,
      borderWidth: 2,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#0e6251",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: [...(chartDataMonthRFT?.Month || [])],
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      visible: false,
      offset: 0, // Đặt biểu đồ sát trục X
    },
    series: [
      {
        name: "Actual",
        data: [...(chartDataMonthRFT.RFT || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#117864",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(17, 120, 100, 0.6)"],
            [1, "rgba(17, 120, 100,  0.4)"],
          ],
        },
        lineColor: "#117864",
        dataLabels: {
          enabled: true, // Bật hiển thị dữ liệu trực tiếp
          style: {
            color: "#000", // Màu chữ
            fontWeight: 600,
            fontSize: "10px",
          },
          formatter: function () {
            return this.y.toFixed(2) + "%"; // Hiển thị giá trị với 2 chữ số thập phân
          },
        },
      },
      {
        name: "Baseline", // Tên của đường trung bình
        data: Array(chartDataMonthRFT?.Month.length).fill(90), // Giá trị cố định 65% cho tất cả các điểm trên trục x
        marker: {
          enabled: false, // Không hiển thị marker cho đường này
        },
        lineColor: "#0e6251", // Màu đường trung bình
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

export default MonthRFT;
