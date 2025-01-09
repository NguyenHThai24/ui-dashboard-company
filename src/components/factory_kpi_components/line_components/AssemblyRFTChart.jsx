import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, Box, CircularProgress, Typography } from "@mui/material";
import { fetchRFTLineData } from "@/apis/factory_kpi_api/FactoryLineAssemblyAPI";

const AssemblyRFTChart = ({ date, floor, line, mode }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!date || !floor || !line) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchRFTLineData(date, floor);

        // Find the specific line data
        const floorData = data.data.floorData.find((f) => f.lineAlias === line);
        if (floorData) {
          // Dynamically determine the key based on the mode
          const key = mode === "assembly" ? "assemblyRFT" : "stitchingRFT";
          const rftData = floorData[key];

          if (rftData) {
            // Format the data for the chart
            const formattedData = Object.keys(rftData).map((time) => ({
              time,
              value: rftData[time],
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
  }, [date, floor, line, mode]); // Refetch when props change

  const options = {
    chart: {
      type: "line",
      marginTop: 80,
      marginLeft: 45,
      marginRight: 0,
      height: "300px",
    },
    title: {
      text: mode === "assembly" ? "Assembly RFT By The Hour" : "Stitching RFT By The Hour",
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
        name: mode === "assembly" ? "Assembly RFT" : "Stitching RFT",
        data: chartData ? chartData.map((data) => data.value) : [],
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
            return this.y + "%";
          },
        },
      },
      {
        name: "Base Line",
        type: "line",
        data: Array(chartData ? chartData.length : 0).fill(80),
        marker: {
          enabled: false,
        },
        lineColor: "#17a589",
        dashStyle: "ShortDash",
        lineWidth: 3,
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

export default AssemblyRFTChart;
