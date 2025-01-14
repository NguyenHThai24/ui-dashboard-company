import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { CircularProgress, Typography, Box } from "@mui/material";
import { getAutoCuttingUrl } from "../../../apis/auto_cutting_api/AutoCuttingAPI";

const ChartDowntimeReason = ({ date }) => {
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

        // Tính tổng cho từng nguyên nhân ngừng hoạt động
        const totals = rawData.reduce(
          (acc, row) => {
            acc.ShutDownData += row.ShutDownData || 0;
            acc.ChangeOver += row.ChangeOver || 0;
            acc.IdleTime += row.IdleTime || 0;
            acc.StartUp += row.StartUp || 0;
            acc.Equip += row.Equip || 0;
            return acc;
          },
          {
            ShutDownData: 0,
            ChangeOver: 0,
            IdleTime: 0,
            StartUp: 0,
            Equip: 0,
          }
        );

        setData(totals);
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

  // Dữ liệu biểu đồ
  const chartData = {
    labels: ["ShutDownData", "ChangeOver", "IdleTime", "StartUp", "Equip"],
    datasets: [
      {
        label: "Total Downtime (minutes)",
        data: [
          data.ShutDownData,
          data.ChangeOver,
          data.IdleTime,
          data.StartUp,
          data.Equip,
        ],
        backgroundColor: [
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
        ],
        borderColor: [
          "#1a5a88",
          "#cc650d",
          "#227d24",
          "#a51e1f",
          "#754b95",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: false
    },
    scales: {
      x: {
        title: false
      },
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
        DOWNTIME REASON
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

export default ChartDowntimeReason;
