import  { useState, useEffect } from 'react';
import { Card, CardContent, Box, CircularProgress, Typography } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const EfficiencyByFloor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/testData.json')
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

  const { floor, RFT } = data;

  const options = {
    chart: {
      type: "column",
      marginTop: 80,
      marginLeft: 10,
      marginRight: 10,
      height: "300px"
    },
    title: {
      text: "Efficiency By Floor",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "green"
      },
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top", // Căn ngang bằng tiêu đề
      y: -10, // Dịch chuyển xuống dưới một chút để không bị chồng lên tiêu đề
      floating: true, // Giữ vị trí cố định
      backgroundColor: "white",
          itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#f44336",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: floor,
    },
    yAxis: {
    visible: false, 
      title:"",
      labels: {
        style: {
          fontSize: "12px",
          color: "#000",
        },
      },
    },
    series: [
      {
        name: "Actual",
        data: RFT,
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#00B2EE",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(65, 0, 147, 0.6)"],
            [1, "rgba(65, 0, 147,  0.2)"],
          ],
        },
        lineColor: "#00688B",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000", // Màu chữ
            fontWeight: "bold",
            fontSize: "12px",
          },
          formatter: function () {
            return this.y.toFixed(2) + "%"; // Hiển thị giá trị với 2 chữ số thập phân
          },
        },
      },
      {
        name: "Base Line", // Tên của đường trung bình
        type: "line",
        data: Array(floor.length).fill(20), // Giá trị cố định 90% cho tất cả các điểm trên trục x
        marker: {
          enabled: true, // Không hiển thị marker cho đường này
        },
        lineColor: "#0000CD", // Màu đường trung bình
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

export default EfficiencyByFloor;
