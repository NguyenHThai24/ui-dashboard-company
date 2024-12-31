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
import dayjs from "dayjs";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const DailyTotalOutputChart = () => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector((state) => ({
    chartData: state.loading.chartData, // Lấy chartData từ state của Redux
    loading: state.loading.loading,
    error: state.loading.error,
  }));

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Start loading
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchDailyTotalOutput(year, month)); // Fetch data through dispatch
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
    },
    title: {
      text: "DAILY TOTAL OUTPUT",
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
      borderWidth: 2, 
      backgroundColor: "white", 
      itemStyle: {
        fontSize: "14px", 
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336", 
      },
      itemDistance: 10, 
    },
    xAxis: {
      categories: [...(chartData?.categories || [])], 
      labels: {
        style: {
          fontSize: "8px",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
    },
    stackLabels: {
        enabled: true,
        style: {
            color: "black",
            fontSize: "7px", // Font chữ nhỏ hơn cho stack labels
        },
    },
    lineWidth: 0,
    gridLineWidth: 0,
    labels: {
        enabled: false,
        step: 1, 
    },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "8px",
            fontWeight: "bold",
          },
        },
      },
    },
    series: [
      {
        name: "Unreach",
        data: [...(chartData.unachieved || [])], 
        color: "#f44336",
      },
      {
        name: "Actual",
        data: [...(chartData.actual || [])], 
        color: "#4caf50",
      },
      // {
      //   name: "Target",
      //   type: "scatter",
      //   data: [...(chartData.Target || [])], 
      //   marker: {
      //     enabled: false,
      //   },
      //   dataLabels: {
      //     enabled: true,
      //     formatter: function () {
      //       return this.y.toLocaleString();
      //     },
      //     style: {
      //       fontSize: "12px",
      //       fontWeight: "bold",
      //       color: "#000",
      //     },
      //   },
      // },
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

export default DailyTotalOutputChart;
