import { useEffect } from "react"; 
import { fetchChartRepairingTime } from "../../../apis/down_time_api/FloorAPI";
import { Card, CardContent, CircularProgress, Alert, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const RepairingTimeChart = ({ floor, line, date }) => {
  const { chartRepairingTime, loading, error } = useSelector((state) => state.downtime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchChartRepairingTime(
        "LHG", // Factory (example value)
        floor, // Floor from props
        line, // Line from props
        "", // Section (optional)
        date, // Start date
        date // End date (if applicable)
      )
    );
  }, [dispatch, floor, line, date]);

  const data = {
    labels: chartRepairingTime.name
      ? chartRepairingTime.name.map((name) => name.slice(-6)) // Lấy 6 ký tự cuối
      : [],
    datasets: [
        {
            label: "Waiting Time",
            data: chartRepairingTime.waitingTime || [],
            type: "line", // Render this dataset as a line
            borderColor: "rgba(241, 28, 6, 1)", // Line color
            backgroundColor: "rgba(56, 168, 255, 0.2)", // Line fill (if applicable)
            tension: 0.4, // Smoothness of the line
            borderWidth: 2,
            pointRadius: 3, // Adjust point size on the line
          },
      {
        label: "Repairing Time",
        data: chartRepairingTime.repairingTime || [],
        backgroundColor: "rgba(6, 120, 241, 1)", // Background color
        borderColor: "rgba(6, 120, 241, 2)", // Border color
        borderWidth: 1,
        barPercentage: 0.6, // Adjust bar width
        categoryPercentage: 0.8, // Adjust spacing between bars
      },
     
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend (label)
      },
      tooltip: {
        callbacks: {
          // Hiển thị tên đầy đủ khi hover vào trục X
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const fullName = chartRepairingTime.name[index] || "Unknown"; // Tên đầy đủ
            const value = tooltipItem.raw; // Giá trị
            return [`${fullName}`, `${tooltipItem.dataset.label}: ${value}`];
          },
          
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          callback: function (value, index) {
            // Lấy 6 ký tự cuối trên trục X
            return chartRepairingTime.name
              ? chartRepairingTime.name[index].slice(-6)
              : value;
          },
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };
  

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        height: "350px",
        boxShadow: 10,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography sx={{ fontWeight: "bold", color: "gray", fontSize: "15px", p: 1 }}>
        Mechanic Repairing Time (Min)
      </Typography>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 1, // Remove padding
        }}
      >
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Bar data={data} options={options} height={350}/>
        )}
      </CardContent>
    </Card>
  );
};

export default RepairingTimeChart;
