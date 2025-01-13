import { useEffect } from "react"; 
import { fetchChartTotalMachine } from "../../../apis/down_time_api/FloorAPI";
import { Card, CardContent, CircularProgress, Alert, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalMachineChart = ({ floor, line, date }) => {
  
    const { chartTotalMachine, loading, error } = useSelector((state) => state.downtime);
      const dispatch = useDispatch();
    
      useEffect(() => {
        dispatch(fetchChartTotalMachine(
          "LHG",    // Factory (example value)
          floor,    // Floor from props
          line,     // Line from props
          "",       // Section (optional)
          date,     // Start date
          date,     // End date (if applicable)
        ));
      }, [dispatch, floor, line, date]); // Run effect when floor, line, or date changes
    
      const data = {
        labels: chartTotalMachine.name
      ? chartTotalMachine.name.map((name) => name?.slice(-6)) // Lấy 6 ký tự cuối
      : [],
        datasets: [
          {
            label: "Value",
            data: chartTotalMachine.value || [], // Y-axis data
            backgroundColor: "rgba(234, 45, 15, 0.8)", // Background color
            borderColor: "rgba(234, 45, 15, 1)", // Border color
            borderWidth: 1,
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
                const fullName = chartTotalMachine.name[index] || "Unknown"; // Tên đầy đủ
                const value = tooltipItem.raw; // Giá trị
                return [`${fullName}`, `${tooltipItem.dataset.label}: ${value}`];
              },
              
            },
          },
          title: null,
        },
        scales: {
          x: {
           stacked: false,
        ticks: {
          callback: function (value, index) {
            // Lấy 6 ký tự cuối trên trục X
            return chartTotalMachine.name
              ? chartTotalMachine.name[index]?.slice(-6)
              : value;
          },
        },
          },
          y: {
            title: {
              display: false,
            },
            beginAtZero: true, // Start Y-axis from 0
          },
        },
      };
  
    return (
   
        <Card sx={{ width: "100%", margin: "auto", height: "100%", boxShadow: 10, borderRadius: 2, bgcolor: "white" }}>
        <Typography sx={{ fontWeight: "bold", color: "gray", fontSize: "15px", p: 1 }}>
        Total Machine Waiting Time By Line (Min)
        </Typography>
          <CardContent sx={{ height: "100%", pt: 1, pb:3, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {loading ? (
              <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Bar data={data} options={options} height={350} />
            )}
          </CardContent>
        </Card>
  )
}

export default TotalMachineChart