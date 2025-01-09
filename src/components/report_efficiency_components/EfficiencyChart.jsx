import { useState, useEffect } from "react";
import { Card, CardContent, Box, CircularProgress, Typography } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const EfficiencyChart = ({ selectedDate, timeFrame }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Adjust the API endpoint based on the time frame
    const endpointMap = {
      DAILY: "/data/testEfficiencyChart.json",
      WEEKLY: "/data/weeklyEfficiencyChart.json",
      MONTHLY: "/data/monthlyEfficiencyChart.json",
    };
    const endpoint = endpointMap[timeFrame];

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [timeFrame]);

  if (!data) return null;

  const { date, RFT, EFF } = data;

  const options = {
    chart: {
      type: "column",
      marginTop: 80,
      marginLeft: 0,
      marginRight: 0,
      height: "300px",
    },
    title: {
      text: `Factory Efficiency - ${timeFrame}`,
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif",
        color: "#757775",
        textShadow: "1px 1px 2px rgba(218, 210, 210, 0.2)",
        letterSpacing: "0px",
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      y: 20,
      floating: true,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "10px",
        fontWeight: 900,
      },
      itemDistance: 2,
    },
    xAxis: {
      categories: date,
      labels:{
        style:{
          fontSize: "10px"
        }
      }
    },
    yAxis: {
      visible: true,
      title: "",
      labels: {
        style: {
          fontSize: "10px",
          color: "#000",
        },
      },
    },
    series: [
      {
        name: "Actual",
        data: RFT,
        color: "#03f545",
        lineColor: "#031A6B",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "10px",
          },
          formatter: function () {
            return this.y + "%";
          },
        },
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 5,
          fillColor: "#FF5733",
          lineColor: "#C70039",
          lineWidth: 2,
        },
      },
      {
        name: "EFF", // Thêm series mới cho EFF
        type: "column", // Loại biểu đồ
        data: EFF, // Dữ liệu từ EFF
        color: "#004199", // Màu cột cho EFF
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "10px",
          },
          formatter: function () {
            return this.y + "%";
          },
        },
      },
      {
        name: "Base Line",
        type: "line",
        data: Array(date.length).fill(80),
        marker: {
          enabled: false,
        },
        lineColor: "#fc0905",
        dashStyle: "ShortDash",
        enableMouseTracking: false,
        dataLabels: {
          enabled: false,
        },
        fillColor: "none",
      },
      
    ],
    credits: {
      enabled: false,
    },
  };
  

  return (
    <div className='mt-4 bg-white rounded-xl'>
        <h1 className='pl-3 pt-3 font-bold text-xl'>Factory Efficiency Chart</h1>
      <Card
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
    </div>
  );
};

export default EfficiencyChart;