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
      height: "300px",
    },
    title: {
      text: "Attendance By Floor",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "blue",
      },
    },
    xAxis: {
      categories: chartData.categories,
      
    },
    yAxis: {
      min: 0,
      title: {
        text: false,
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    legend: {
      align: "center",
      verticalAlign: "top",
      y: 20,
      floating: true,
      backgroundColor: "white",
      borderColor: "#ccc",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
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
        color: "#4caf50",
      },
      {
        name: "Assembly",
        data: chartData.assembly,
        color: "#f44336",
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

export default AttendanceByFloor;
