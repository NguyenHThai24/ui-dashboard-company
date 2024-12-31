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
    //   marginLeft: 5,
    //   marginRight: 5,
      height: "300px",
    },
    title: {
      text: "Output By Floor",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "green",
      },
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      y: -40,
      itemStyle: {
        fontSize: "10px",
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 5,
    },
    xAxis: {
      categories: chartData.categories,
    },
    yAxis: {
      title: {
        text: "",
      },    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
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
        type: "scatter",
        data: chartData.Target,
        marker: {
            symbol: "square", 
            fillColor: "#000", 
            width: 15, 
            height: 5, 
          },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y.toLocaleString();
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#000",
          },
        },
        color: "transparent", // Màu trong biểu đồ không hiển thị
        showInLegend: true, // Đảm bảo hiển thị trong legend
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
