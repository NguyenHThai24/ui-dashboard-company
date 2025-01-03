import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { fetchEfficiencyByLine } from "@/apis/product_report_api/buildingAPI/BuildingBAPI";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const EfficiencyByLineB = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const { chartDataEfficiency, loading, error } = useSelector((state) => ({
    chartDataEfficiency: state.buildingb.chartDataEfficiency,
    loading: state.buildingb.loading,
    error: state.buildingb.error,
  }));

  //console.log(chartDataEfficiency);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchEfficiencyByLine(year, month));
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
      text: "BUILDING B: EFFICIENCY BY LINE",
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
      categories: [...(chartDataEfficiency?.line || [])],
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
    data: [
      ...(chartDataEfficiency?.EFF?.map((val) => parseFloat(val)) || []),
    ],
    marker: {
        enabled: true,
        radius: 3,
        fillColor: "#fff", // Màu nền là trắng
        lineColor: "#17a589", // Màu viền
        lineWidth: 2,
        symbol: "circle",
    },
    fillColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, "rgba(46, 204, 113, 0.6)"],
        [1, "rgba(46, 204, 113, 0.2)"],
      ],
    },
    lineColor: "#17a589",
    dataLabels: {
      enabled: true,
      style: {
        color: "#000",
        fontWeight: 600,
        fontSize: "10px",
      },
      formatter: function () {
        return this.y;
      },
    },
  },
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

export default EfficiencyByLineB;
