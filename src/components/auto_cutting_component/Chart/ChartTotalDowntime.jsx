import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { CircularProgress, Typography, Box } from "@mui/material";
import { getAutoCuttingUrl } from "../../../apis/auto_cutting_api/AutoCuttingAPI";

const ChartTotalDowntime = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!date) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(getAutoCuttingUrl(date.format("YYYY-MM-DD")));

      if (response.status === 200) {
        const rawData = response.data.data || [];

        // Lọc và chuẩn hóa dữ liệu cho biểu đồ
        const chartData = rawData.map((row) => ({
          layer: row.Layer || "Unknown",
          totalDowntime: row.TotalDowntime || 0,
        }));

        setData(chartData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: data.map((item) => item.layer),
    datasets: [
      {
        label: "Total Downtime (minutes)",
        data: data.map((item) => item.totalDowntime),
        backgroundColor: "#1d76cf",
        borderColor: "#1d4f8a",
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      
    },
   
    
    scales: {
      x: false,
      y: {
        title: {
          display: true,
          text: "Total Downtime (minutes)",
          color: "#555",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#555",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-md shadow-xl shadow-slate-500 p-4">
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          color: "#239d85",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          letterSpacing: "0px",
          marginBottom: "10px",
          textAlign: "center",
          borderBottom: "2px solid green",
        }}
      >
        TOTAL DOWNTIME BY MACHINE
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartTotalDowntime;
