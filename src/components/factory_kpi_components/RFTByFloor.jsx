import  { useState, useEffect } from 'react';
import { Card, CardContent, Box, CircularProgress, Typography } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';

const RFTByFloor = () => {
  const [chartData, setChartData] = useState([]);
  const [baseline, setBaseline] = useState(0);
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    axios
      .get('http://192.168.30.245:8989/factory/getFloorDataS?date=2025/01/03&factory=LHG')
      .then((response) => {
        if (response.data.status === 0) {
          const floorData = response.data.data.floorData;
          const baselineValue = response.data.data.baseline;
          setBaseline(baselineValue);

          // Cập nhật chartData với thông tin từ API
          const data = floorData?.map((item) => ({
            name: item.lineAlias,
            y: item.quality
          }));
          setChartData(data);
        }
        setLoading(false); 
      })
      .catch((error) => {
        setError('Error fetching data'); 
        setLoading(false); 
      });
  }, []);


 
  const options = {
    chart: {
      type: "line",
      marginTop: 80,
      marginLeft: 45,
      marginRight: 0,
      height: "300px"
    },
    title: {
      text: "RFT By Floor",
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
      verticalAlign: "top", // Căn ngang bằng tiêu đề
      y: 20,
      floating: true, // Giữ vị trí cố định
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
      categories: chartData?.map((item) => item.name),
      labels:{
        style:{
          fontSize: "10px"
        }
      }
    },
    yAxis: {
      visible: true, 
      title: "",
      labels:{
        style:{
          fontSize:"10px",
        }
      } 
    },
    series: [
      {
        name: "Actual",
        data: chartData.map((item) => item.y),
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
        name: "Base Line", // Tên của đường trung bình
        type: "line",
        data: chartData?.map(() => baseline), 
        marker: {
          enabled: false, // Không hiển thị marker cho đường này
        },
        lineColor: "#fc0905", // Màu đường trung bình
        dashStyle: "ShortDash", // Kiểu nét đứt
        enableMouseTracking: false, // Tắt sự kiện di chuột trên đường này
        dataLabels: {
          enabled: false, // Không hiển thị dữ liệu trên đường trung bình
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
      <Card
        sx={{
          borderRadius: 2, 
        }}
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

export default RFTByFloor;
