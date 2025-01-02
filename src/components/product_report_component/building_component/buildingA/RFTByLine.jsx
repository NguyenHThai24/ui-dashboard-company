import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { fetchRFTByLine } from "@/apis/product_report_api/buildingAPI/BuildingAAPI";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const RFTByLine = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const { chartDataRFT, loading, error } = useSelector((state) => ({
    chartDataRFT: state.buildinga.chartDataRFT,
    loading: state.buildinga.loading,
    error: state.buildinga.error,
  }));

  //console.log(chartDataEfficiency);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchRFTByLine(year, month));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

  const options = {
    chart: {
      type: "area",
      marginLeft: 0,
      marginRight: 0,
    },
    title: {
      text: "BUILDING A: RFT BY LINE",
      align: "center",
      verticalAlign: "top", // Đặt title ở trên cùng
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
      verticalAlign: "top", // Đặt legend ở trên cùng
      y: 40, // Tạo khoảng cách với top

      borderColor: "#ccc",
      borderWidth: 2,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#0000FF",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: [...(chartDataRFT?.line || [])],
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      visible: false,
      offset: 0,
    },
    series: [
      {
        name: "EFF",
        data: [...(chartDataRFT?.rft?.map((val) => parseFloat(val)) || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#00B2EE",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(0, 53, 102, 0.6)"],
            [1, "rgba(0, 53, 102, 0.4)"],
          ],
        },
        lineColor: "#003566",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: 600,
            fontSize: "10px",
          },
          formatter: function () {
            return this.y.toFixed(2) + "%";
          },
        },
      },
      // {
      //   name: "Baseline",
      //   data: Array(chartDataRFT?.line.length).fill(65),
      //   lineColor: "#0000FF",
      //   dashStyle: "ShortDash",
      //   dataLabels: {
      //     enabled: true,
      //     style: {
      //       color: "#333",
      //       fontSize: "10px",
      //     },
      //     formatter: function () {
      //       return "65%";
      //     },
      //   },
      //   label: {
      //     align: "right",
      //     style: {
      //       color: "#333",
      //       fontSize: "10px",
      //     },
      //     formatter: function () {
      //       return "65%";
      //     },
      //   },
      //   fillColor: "none",
      // },
    ],

    credits: {
      enabled: false,
    },
  };

  return (
    <Card>
      <CardContent>
        {loading ? (
          <CircularProgress />
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

export default RFTByLine;
