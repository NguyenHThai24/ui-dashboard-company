import { useEffect } from "react"; 
import { fetchChartMostDowntime } from "../../../apis/down_time_api/FloorAPI";
import { Card, CardContent, CircularProgress, Alert, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2"; // Đổi từ Line sang Bar
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

const MostDowntimeChart = ({ floor, line, date }) => {
  const { chartMostDowntime, loading, error } = useSelector((state) => state.downtime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChartMostDowntime(
      "LHG",    // Factory (example value)
      floor,    // Floor from props
      line,     // Line from props
      "",       // Section (optional)
      date,     // Start date
      date,     // End date (if applicable)
    ));
  }, [dispatch, floor, line, date]); // Run effect when floor, line, or date changes

  const data = {
    labels: [...(chartMostDowntime.Name_en || [])], // X-axis labels (ensure it's not undefined)
    datasets: [
      {
        label: "Total (Min)",
        data: chartMostDowntime.total || [], // Y-axis data
        backgroundColor: "rgba(56, 168, 255, 0.8)", // Background color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
        barPercentage: 0.5, // Adjust bar thickness
        categoryPercentage: 0.8, // Adjust spacing between bars
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        position: "top", // Position of legend
      },
      title: null,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "", // X-axis label
        },
        beginAtZero: true, // Start X-axis from 0
      },
      y: {
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <Card sx={{ width: "100%", margin: "auto", height: "100%", boxShadow: 10, borderRadius: 2, bgcolor: "white" }}>
      <Typography sx={{ fontWeight: "bold", color: "gray", fontSize: "15px", p: 1 }}>
      Most Downtime By Machine Type (Min)
      </Typography>
      <CardContent sx={{ height: "100%", p: 0, pb:1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Bar data={data} options={options} height={350} />
        )}
      </CardContent>
    </Card>
  );
};

export default MostDowntimeChart;
