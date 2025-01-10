import  { useState, useEffect } from 'react';
import { Card, CardContent, Box, CircularProgress, Typography, styled } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const EfficiencyByHour = ({mode}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/AssemblyByTheHour.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (!data) return null;

  const { time, assembly } = data;

  const options = {
    chart: {
      type: "line",
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
      categories: time,
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
    series: [
      {
        name: "Actual",
        data: assembly,
        //color: "#003566",
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
        marker: {
          enabled: true,
          symbol: "square",
          radius: 3,
          fillColor: "#00688B",
          lineColor: "#00688B",
          lineWidth: 2,
        },
      },
      
      {
        name: "Base Line",
        type: "line",
        data: Array(time.length).fill(80), // Giá trị cố định cho Base Line
        marker: {
          enabled: true,
          radius: 3,
          fillColor: "#fff", // Màu nền là trắng
          lineColor: "#17a589", // Màu viền
          lineWidth: 3,
          symbol: "circle",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(46, 204, 113, 0.6)"],
            [1, "rgba(46, 204, 113, 0.2)"],
          ],
        },
        lineColor: "#17a589",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: 600,
            fontSize: "10px",
          },
          formatter: function () {
            return this.y;
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };
  

  return (
    <div>
      <Card
        sx={{
          borderRadius: 2, 
        }}
      >
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
            {mode === "assembly" ? "Assembly Efficiency By The Hour" : "Stitching Efficiency By The Hour"}
          </Typography>
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

export default EfficiencyByHour;
