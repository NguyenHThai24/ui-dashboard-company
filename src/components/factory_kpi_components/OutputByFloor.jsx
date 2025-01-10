import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { fetchFloorOutputDataS } from "@/apis/factory_kpi_api/FactoryAPI";
import { fetchFloorOutputData } from "@/apis/factory_kpi_api/FactoryFloorAPI";

const OutputByFloor = ({ date, floor }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = floor
          ? await fetchFloorOutputData(date.format("YYYY/MM/DD"), floor)
          : await fetchFloorOutputDataS(date.format("YYYY/MM/DD"), "LHG");

        setChartData(response); // Directly use the returned array
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor]);

  const options = {
    chart: {
      type: "column",
      marginTop: 80,
      marginLeft: 0,
      marginRight: 0,
      height: "300px",
    },
    title: null,
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
        name: "Unachieved",
        data: chartData.map((item) => item.unachieved),
        color: "#D5B5FF",
      },
      {
        name: "Actual",
        data: chartData.map((item) => item.totalActualAssembly),
        color: "#092698",
      },
      // {
      //   name: "Target",
      //   data: chartData.map((item) => item.targetAssembly),
      //   color: "#000",
      //   visible: false
      // },
      {
        name: "Target",
        data: [...(chartData?.target || [])],
        color: "#000",
       // visible: false
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
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
          Output By Floor
         </Typography>
        {loading ? (
          <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", color: "red" }}>
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
