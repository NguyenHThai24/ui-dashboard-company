import { useEffect } from 'react';
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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableMechanic } from '../../../apis/down_time_api/FloorAPI';
import { useTranslations } from '@/config/useTranslations';

const MechanicTable = ({ floor, date, line, cuttingFitting }) => {
  const { tableMechanic, loading, error } = useSelector(
    (state) => state.downtime
  );
  const dispatch = useDispatch();
  const t = useTranslations();
  useEffect(() => {
    let adjustedFloor;

    // Đảm bảo `floor` được gán đúng theo mode hoặc từ props
    if (cuttingFitting === 'cutting') {
      adjustedFloor = 'Auto Cutting';
    } else if (cuttingFitting === 'fitting') {
      adjustedFloor = 'Stock Fitting';
    } else {
      adjustedFloor = floor; // Nhận giá trị từ props nếu không phải cutting hoặc fitting
    }
    dispatch(
      fetchTableMechanic(
        'LHG', // Factory
        adjustedFloor, // Floor
        line, // Line
        '', // Section
        date, // Start date
        date // End date
      )
    );
  }, [dispatch, floor, line, date, cuttingFitting]);

  return (
    <div
      className=" h-[350px] font-bold"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
        borderRadius: '8px',
      }}
    >
      {/* Tiêu đề bảng */}
      <Typography
        sx={{
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '15px',
          px: 1,
          pt: 1,
          textAlign: 'center',
        }}
      >
        {t['Mechanic List']}
      </Typography>

      {/* Bảng dữ liệu */}
      <TableContainer
        component={Paper}
        sx={{
          paddingLeft: '4px',
          paddingRight: '4px',
          maxHeight: '300px',
          marginTop: '10px',
          width: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px', // Đặt chiều rộng thanh cuộn nhỏ hơn
            height: '4px', // Đặt chiều cao thanh cuộn nhỏ hơn
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#a1a1a1', // Màu thanh cuộn
            borderRadius: '8px', // Làm thanh cuộn tròn góc
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#888', // Màu khi di chuột vào thanh cuộn
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0', // Màu nền của track
          },
        }}
      >
        {loading ? (
          // Hiển thị loading
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
            <Typography variant="body1">Loading...</Typography>
          </div>
        ) : error ? (
          // Hiển thị lỗi
          <Typography
            variant="body1"
            color="error"
            sx={{ textAlign: 'center', padding: '20px' }}
          >
            {t['Error']}: {error}
          </Typography>
        ) : !tableMechanic || tableMechanic.mechanic.length === 0 ? (
          // Hiển thị thông báo không có dữ liệu
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', padding: '20px' }}
          >
            {t['No data available']}
          </Typography>
        ) : (
          // Hiển thị dữ liệu bảng
          <Table
            sx={{
              '& .MuiTableCell-root': {
                padding: '4px 8px', // Padding chung cho tất cả cell
                fontSize: '13px', // Font chữ lớn hơn
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: '#1e6a65',
                position: 'sticky', // Cố định tiêu đề
                top: 0, // Vị trí cố định ở trên cùng
                zIndex: 1, // Đặt z-index để tiêu đề luôn nổi trên nội dung
                '& .MuiTableCell-root': {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  py: 1,
                  fontSize: '13px', // Font chữ lớn hơn cho tiêu đề
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Mechanic']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Type']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Current Task']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Status']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Counts']}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableMechanic.mechanic.map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#b9f7b9' : '#ffffff', // Tô màu cho hàng chẵn và lẻ
                  }}
                >
                  <TableCell sx={{ py: 2, fontWeight: 'bold' }}>
                    {tableMechanic.mechanic[index]}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', py: 2 }}>
                    {tableMechanic.mechanic_type[index]}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: 'center', py: 2, fontWeight: 'bold' }}
                  >
                    {tableMechanic.current_task[index] || ''}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', py: 2 }}>
                    {tableMechanic.status[index]}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: 'center', py: 2, fontWeight: 'bold' }}
                  >
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
