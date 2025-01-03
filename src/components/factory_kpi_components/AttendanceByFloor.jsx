import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";

const AttendanceByFloor = () => {
  const [chartData, setChartData] = useState([]);

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
            lineAlias: item.lineAlias,
            assembly: item.worker.assembly,
            stitching: item.worker.stitching,
          }));
          setChartData(data);
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
      categories: chartData?.map((item) => item.lineAlias),
      labels: {
        style: {
          fontSize: "10px",
        },
      },
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
        data: chartData.map((item) => item.stitching),
        color: "#0245C8",
      },
      {
        name: "Assembly",
        data: chartData.map((item) => item.assembly),
        color: "#6324CF",
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
