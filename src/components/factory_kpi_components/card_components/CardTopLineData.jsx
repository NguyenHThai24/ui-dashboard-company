import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const CardTopLineData = () => {
  const [stopTimeLine, setTopTimeLine] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    axios
      .get("http://192.168.30.245:8989/factory/getFloorDataS?date=2025/01/03&factory=LHG")
      .then((response) => {
        if (response.data.status === 0) {
          const stopLineData = response.data.data.stopLineData;

          // Cập nhật stopTimeLine với thông tin từ API
          const data = stopLineData.map((item) => ({
            name: item.line,
            time: item.SL_NgungChuyen,
          }));
          setTopTimeLine(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-1 rounded-xl shadow-md w-full border-4 border-red-600 h-[162px]">
      <h1
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          color: "#f10606",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          letterSpacing: "0px",
          textAlign: "center",
          borderBottom: "2px solid red",
        }}
      >
        Digital Andon Cases
      </h1>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul
          className="grid grid-cols-2 gap-1 mt-2"
          style={{
            maxHeight: "100px", // Giới hạn chiều cao
            overflowY: "auto", // Hiển thị thanh cuộn dọc nếu vượt quá chiều cao
            padding: "0 4px", // Giảm padding để hiển thị tốt hơn
          }}
        >
          {stopTimeLine?.map((item, index) => (
            <li key={index} className="text-sm">
              <strong>{item.name}</strong>: {item.time} times
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardTopLineData;
