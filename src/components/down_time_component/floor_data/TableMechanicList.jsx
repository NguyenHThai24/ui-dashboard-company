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
      className="bg-white h-[350px] rounded-lg font-bold"
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
          paddingLeft: "4px",
          paddingRight: '4px',
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
                padding: "4px 8px", // Padding chung cho tất cả cell
                fontSize: "13px", // Font chữ lớn hơn
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#1e6a65",
                position: "sticky", // Cố định tiêu đề
                top: 0, // Vị trí cố định ở trên cùng
                zIndex: 1, // Đặt z-index để tiêu đề luôn nổi trên nội dung
                "& .MuiTableCell-root": {
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#fff",
                  py: 1,
                  fontSize: "13px", // Font chữ lớn hơn cho tiêu đề
                },
              }}
            >
              <TableRow>
                <TableCell  sx={{ fontSize: "13px", width:'150px' }}>Mechanic</TableCell>
                <TableCell  sx={{ fontSize: "13px", width:'150px' }}>Type</TableCell>
                <TableCell  sx={{ fontSize: "13px", width:'150px' }}>Current Task</TableCell>
                <TableCell  sx={{ fontSize: "13px", width:'150px' }}>Status</TableCell>
                <TableCell  sx={{ fontSize: "13px", width:'150px' }}>Counts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableMechanic.mechanic.map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#b9f7b9" : "#ffffff", // Tô màu cho hàng chẵn và lẻ
                  }}
                >
                  <TableCell sx={{ py: 2, fontWeight:"bold" }}>{tableMechanic.mechanic[index]}</TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.mechanic_type[index]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 , fontWeight:"bold"}}>
                    {tableMechanic.current_task[index] || ""}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2 }}>
                    {tableMechanic.status[index]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 2, fontWeight:"bold" }}>
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
