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
import { fetchDailyTotalOutput } from "@/apis/product_report_api/factoryAPI/DayAPI";
import { setLoading, setError } from "@/redux/data_factory_redux/DayReportSlice";

const DailyTotalOutputChart = ({ selectedDate }) => {
  const dispatch = useDispatch();

  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.dayreport.chartData, // Lấy chartData từ state của Redux
    loading: state.dayreport.loading,
    error: state.dayreport.error,
  }));


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchDailyTotalOutput(year, month)); // Fetch data through dispatch
        dispatch(setLoading(false)); // End loading
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
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        letterSpacing: "1.5px",
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
      categories: chartData?.categories || [],
      labels: { style: { fontSize: "10px", fontWeight: 600 } },
    },
    yAxis: {
      title: { text: "" },
      stackLabels: {
        enabled: true,
        style: { color: "black", fontSize: "10px", fontWeight: 600 },
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
