import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableMechanic } from "../../../apis/down_time_api/FloorAPI";

const MechanicTable = ({ floor, date, line }) => {
  const { tableMechanic, loading, error } = useSelector((state) => state.downtime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTableMechanic(
        "LHG", // Factory
        floor, // Floor
        line, // Line
        "", // Section
        date, // Start date
        date // End date
      )
    );
  }, [dispatch, floor, line, date]);

  return (
    <div
      className="bg-white h-[350px] rounded-xl font-bold"
      style={{
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", // Hiệu ứng đổ bóng
      }}
    >
      {/* Tiêu đề bảng */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "gray",
          fontSize: "15px",
          px: 1,
          pt: 1,
          textAlign: "center",
        }}
      >
        Mechanic List
      </Typography>

      {/* Bảng dữ liệu */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "300px", // Bớt chiều cao để dành không gian cho tiêu đề
          marginTop: "10px",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        {loading ? (
          // Hiển thị loading
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <Typography variant="body1">Loading...</Typography>
          </div>
        ) : error ? (
          // Hiển thị lỗi
          <Typography
            variant="body1"
            color="error"
            sx={{ textAlign: "center", padding: "20px" }}
          >
            Error: {error}
          </Typography>
        ) : !tableMechanic || tableMechanic.mechanic.length === 0 ? (
          // Hiển thị thông báo không có dữ liệu
          <Typography
            variant="body1"
            sx={{ textAlign: "center", padding: "20px" }}
          >
            No data available
          </Typography>
        ) : (
          // Hiển thị dữ liệu bảng
          <Table
            sx={{
              "& .MuiTableCell-root": {
                padding: "10px 4px", // Padding chung cho tất cả cell
                fontSize: "12px", // Font chữ lớn hơn
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#c0f1c5",
                position: "sticky", // Cố định tiêu đề
                top: 0, // Vị trí cố định ở trên cùng
                zIndex: 1, // Đặt z-index để tiêu đề luôn nổi trên nội dung
                "& .MuiTableCell-root": {
                  textAlign: "center",
                  fontWeight: 900,
                  color: "#000",
                  py: 2,
                  fontSize: "13px", // Font chữ lớn hơn cho tiêu đề
                },
              }}
            >
              <TableRow>
                <TableCell>Mechanic</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Type</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Current Task</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Counts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableMechanic.mechanic.map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Tô màu cho hàng chẵn và lẻ
                  }}
                >
                  <TableCell sx={{ py: 2 }}>{tableMechanic.mechanic[index]}</TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.mechanic_type[index]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.current_task[index] || ""}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.status[index]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.counts[index]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default MechanicTable;
