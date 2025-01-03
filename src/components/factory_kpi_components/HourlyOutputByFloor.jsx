import { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const HourlyOutputByFloor = () => {
  const [floorData, setFloorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.30.245:8989/factory/getFloorDataS?date=2025/01/03&factory=LHG")
      .then((response) => {
        if (response.data.status === 0) {
          const data = response.data.data.floorData;
          const times = Array.from(
            new Set(data.flatMap((item) => Object.keys(item.actualAssembly)))
          );
          setTimePeriods(times);
          setFloorData(data);
        } else {
          setError("Failed to fetch data");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md font-bold">
      <p
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          color: "#195b12",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          letterSpacing: "0px",
          textAlign:"center"
        }}
      >
        HOURLY OUTPUT BY FLOOR
      </p>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: "full", overflowY: "auto"}}>
          <Table
            sx={{
              "& .MuiTableCell-root": {
                padding: "0px 2px", // Giảm padding để thu nhỏ khoảng cách dòng
                fontWeight: "bold", // Toàn bộ in đậm
                fontSize: "10px", // Cỡ chữ nhỏ hơn
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#c0f1c5",
                "& .MuiTableCell-root": {
                 textAlign:"center",
                 fontWeight: "bold"
                },
              }}
            >
              <TableRow>
                <TableCell rowSpan={2}>Line</TableCell>
                <TableCell rowSpan={2}>Target</TableCell>
                <TableCell colSpan={timePeriods.length}>Time</TableCell>
              </TableRow>
              <TableRow>
                {timePeriods?.map((time, index) => (
                  <TableCell key={index}>{time}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {floorData?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "white",
                  }}
                >
                  <TableCell>{row.lineAlias}</TableCell>
                  <TableCell>{row.totalTarget}</TableCell>
                  {timePeriods?.map((time, colIndex) => (
                    <TableCell key={colIndex} style={{ textAlign: "center" }}>
                      {row.actualAssembly[time] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default HourlyOutputByFloor;
