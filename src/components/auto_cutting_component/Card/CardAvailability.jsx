import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { getAutoCuttingUrl } from "../../../apis/auto_cutting_api/AutoCuttingAPI";

const CardAvailability = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalOperating, setTotalOperating] = useState(0);
  const [totalAvailableTime, setTotalAvailableTime] = useState(0);

  const fetchData = async () => {
    if (!date) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(getAutoCuttingUrl(date.format("YYYY-MM-DD")));

      if (response.status === 200) {
        const rawData = response.data.data || [];

        const totalOperatingValue = rawData.reduce(
          (sum, row) => sum + (row.Operating || 0),
          0
        );
        const totalAvailableTimeValue = rawData.reduce(
          (sum, row) => sum + (row.AvailableTime || 0),
          0
        );

        setTotalOperating(totalOperatingValue);
        setTotalAvailableTime(totalAvailableTimeValue);
        setData(rawData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="bg-red-100 rounded-md shadow-xl shadow-slate-500 p-4">
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
        AVAILABILITY
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1d76cf",
                fontSize: "14px"
              }}
            >
              UPTIME
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#239d85",
              }}
            >
              {totalOperating}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1d76cf",
                fontSize: "14px"
              }}
            >
              AVAILABLE TIME
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#239d85",
              }}
            >
              {totalAvailableTime}
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CardAvailability;
