import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";

const AttendanceByFloor = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    stitching: [],
    assembly: [],
  });

  useEffect(() => {
    // Tải dữ liệu từ file JSON
    const fetchData = async () => {
      try {
        const response = await fetch("/data/AttendanceByFloor.json"); // Đường dẫn file JSON
        const fakeData = await response.json();

        // Xử lý dữ liệu để phù hợp với Highcharts
        const processedData = {
          categories: fakeData.map((item) => item.floor),
          stitching: fakeData.map((item) => parseFloat(item.stitching)),
          assembly: fakeData.map((item) => parseFloat(item.assembly)),
        };

        setChartData(processedData);
      } catch (error) {
        console.error("Failed to fetch data.json:", error);
      }
    };

    fetchData();
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
      text: "Attendance By Floor",
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
    xAxis: {
      categories: chartData.categories,
      labels:{
        style:{
          fontSize: "10px"
        }
      }
    },
    yAxis: {
      visible: false,
      title: "",
      labels: {
        style: {
          fontSize: "10px",
          color: "#000",
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "right",
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
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
            fontWeight: "bold",
          },
        },
        grouping: true,
      },
    },
    series: [
      {
        name: "Stitching",
        data: chartData.stitching,
        color: "#0245C8",
      },
      {
        name: "Assembly",
        data: chartData.assembly,
        color: "#6324CF",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card sx={{
      borderRadius: 2, 
    }}>
      <CardContent>
        {chartData.categories.length === 0 ? (
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
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceByFloor;
