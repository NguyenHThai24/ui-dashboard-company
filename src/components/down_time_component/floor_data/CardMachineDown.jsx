import { useState, useEffect } from "react";
import { fetchTotalMachineDownTime } from "../../../apis/down_time_api/FloorAPI";
import { Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";

const CardMachineDown = ({ floor, date, line }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const totalBreakdown = await fetchTotalMachineDownTime(
          "LHG",   // Factory
          floor,   // Floor from props
          "",      // Line
          "",      // Section
          date,    // Start date
          date     // End date
        );
        
        setTotal(totalBreakdown);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [floor, date, line]); // Run effect when floor, date, or line changes

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        height: "150px",
        boxShadow: 10,
        borderRadius: 2,
        textAlign: "left",
        bgcolor: "white",
        padding: "16px",
      }}
    >
    <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "gray", fontSize:"15px" }}
            >
              Total Machine Downtime (MIN)
            </Typography>
      <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Đẩy phần tử đầu và cuối ra hai phía
          height: "100%", // Đảm bảo chiếm toàn bộ chiều cao của Card
         
        }}>
      
        {loading ? (
            <CircularProgress sx={{ margin: "auto" }} />
        ) : error ? (
          <Alert severity="error" sx={{ margin: "auto" }}>
            {error}
          </Alert>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-center">
           <div>
           <Typography
                variant="h4"
                component="div"
                sx={{
                alignSelf: "flex-end", // Đưa giá trị xuống cuối
                mt: "auto", // Tự động đẩy cách đều
                color: "#049962",
                 fontWeight: "900",
                fontSize: "14px",
                paddingBottom:1.5,
                }}
                >
                TOTAL
            </Typography>
            <Typography
                variant="h4"
                component="div"
                sx={{
                alignSelf: "flex-end", // Đưa giá trị xuống cuối
                mt: "auto", // Tự động đẩy cách đều
                color: "#049962",
                fontWeight: "900"
                }}
                > 
                {total || 0}
                </Typography>
           </div>
           <div>
           <Typography
                variant="h4"
                component="div"
                sx={{
                alignSelf: "flex-end", // Đưa giá trị xuống cuối
                mt: "auto", // Tự động đẩy cách đều
                color: "#049962",
                fontWeight: "900",
                fontSize: "14px",
                paddingBottom:1.5,
                }}
                >
           
              AVERAGE
            </Typography>
            <Typography
                variant="h4"
                component="div"
                sx={{
                alignSelf: "flex-end", // Đưa giá trị xuống cuối
                mt: "auto", // Tự động đẩy cách đều
                color: "#049962",
                fontWeight: "900"
                }}
                >
           
              {total || 0}
            </Typography>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardMachineDown;
