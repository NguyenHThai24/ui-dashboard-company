import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import axios from "axios";

const OutputByFloor = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://192.168.30.245:8989/factory/getFloorDataS?date=2025/01/03&factory=LHG"
      )
      .then((response) => {
        if (response.data.status === 0) {
          const floorData = response.data.data.floorData;

          // Cập nhật chartData với thông tin từ API
          const data = floorData?.map((item) => ({
            totalActualAssembly: item.totalActualAssembly,
            lineAlias: item.lineAlias,
            targetAssembly: item.targetAssembly,
            unachieved: item.targetAssembly - item.totalActualAssembly, // Tính toán Unreach
          }));
          setChartData(data);
        } else {
          setError("Failed to fetch data");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  const options = {
    chart: {
      type: "column",
      marginTop: 80,
      marginLeft: 0,
      marginRight: 0,
      height: "300px",
    },
    title: {
      text: "Output By Floor",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif",
        color: "#195b12",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        letterSpacing: "0px",
      },
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        fontWeight: 900,
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 2,
      symbolWidth: 10,
      symbolHeight: 10,
      symbolRadius: 0,
    },
    xAxis: {
      categories: chartData.map((item) => item.lineAlias),
      labels: {
        style: {
          fontSize: "10px",
        },
      },
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
          style: {
            fontSize: "10px",
            fontWeight: "bold",
          },
        },
      },
    },
    series: [
      {
        name: "Unreach",
        data: chartData.map((item) => item.unachieved),
        color: "#D5B5FF",
      },
      {
        name: "Actual",
        data: chartData.map((item) => item.totalActualAssembly),
        color: "#092698",
      },
      {
        name: "Target",
        data: chartData.map((item) => item.targetAssembly),
        color: "#000",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            {error}
          </Box>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default OutputByFloor;
