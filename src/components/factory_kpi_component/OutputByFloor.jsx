import { useEffect, useState } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const OutputByFloor = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    Target: [],
    actual: [],
    unachieved: [],
  });

  useEffect(() => {
    // Tải dữ liệu từ file JSON
    const fetchData = async () => {
      try {
        const response = await fetch('/data/OutputByFloorAPI.json'); 
        const fakeData = await response.json();

        // Xử lý dữ liệu để phù hợp với Highcharts
        const processedData = {
          categories: fakeData.map((item) => item.floor),
          Target: fakeData.map((item) => item.Target),
          actual: fakeData.map((item) => item.actual),
          unachieved: fakeData.map((item) => item.Target - item.actual),
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
      y: -40,
      itemStyle: {
        fontSize: "10px",
        fontWeight: 900,
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 2,
      symbolWidth: 10, // Điều chỉnh kích thước hình vuông
      symbolHeight: 10, // Điều chỉnh kích thước hình vuông
      symbolRadius: 0, // Không làm tròn góc của hình vuông
    },
    xAxis: {
      categories: chartData.categories,
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
        data: chartData.unachieved,
        color: "#f44336",
      },
      {
        name: "Actual",
        data: chartData.actual,
        color: "#4caf50",
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
    <Card>
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

export default OutputByFloor;
