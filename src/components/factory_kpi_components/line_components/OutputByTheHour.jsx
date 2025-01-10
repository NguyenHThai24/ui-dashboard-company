import  { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, Box, CircularProgress, Typography } from "@mui/material";
import { fetchOuputLineData } from "@/apis/factory_kpi_api/FactoryLineAssemblyAPI";

const OutputByTheHour = ({ date, floor, line, mode }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!date || !floor || !line) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchOuputLineData(date, floor);

        const floorData = data.data.floorData.find((f) => f.lineAlias === line);

        if (floorData) {
          // Chọn dữ liệu dựa vào `mode`
          const key = mode === "assembly" ? "actualAssembly" : "actualStitching";
          const actualData = floorData[key];

          if (actualData) {
            const formattedData = Object.keys(actualData).map((key) => ({
              time: key,
              value: actualData[key],
            }));
            setChartData(formattedData);
          } else {
            setError(`No data found for ${mode} mode.`);
          }
        } else {
          setError("No data found for the selected line");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor, line, mode]); // Refetch khi `mode` thay đổi

  const baseline = 200; // Giá trị mục tiêu cơ bản

  const options = {
    chart: {
      type: "column",
      marginTop: 80,
      marginLeft: 45,
      marginRight: 0,
      height: "300px",
    },
    title: null,
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
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 2,
    },
    xAxis: {
      categories: chartData ? chartData.map((data) => data.time) : [],
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      visible: true,
      title: "",
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    series: [
      {
        name: mode === "assembly" ? "Actual" : "Actual",
        data: chartData
          ? chartData.map((data) => ({
              y: data.value,
              color: data.value < baseline ? "#fc0905" : "#003566",
            }))
          : [],
        color: "#003566",
        lineColor: "#00688B",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "10px",
          },
          formatter: function () {
            return this.y;
          },
        },
      },
      {
        name: "Base Line",
        type: "line",
        data: Array(chartData ? chartData.length : 0).fill(baseline),
        marker: {
          enabled: false,
        },
        lineColor: "#17a589",
        lineWidth: 3,
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
    <div>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
        <Typography
            sx={{
             fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif",
        color: "#239d85",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        letterSpacing: "0px",
            }}
          >
            {mode === "assembly" ? "Assembly Output By The Hour" : "Stitching Output By The Hour"}
          </Typography>
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

export default OutputByTheHour;
