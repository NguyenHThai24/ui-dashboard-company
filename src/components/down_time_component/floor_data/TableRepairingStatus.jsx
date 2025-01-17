import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableRepairingStatus } from '../../../apis/down_time_api/FloorAPI';
import { useTranslations } from '@/config/useTranslations';

const MechanicTable = ({ floor, date, line, mode }) => {
  const { tableRepairing, loading, error } = useSelector(
    (state) => state.downtime
  );

  const dispatch = useDispatch();
  const t = useTranslations();
  useEffect(() => {
    if (mode === 'Auto Cutting') {
      floor = 'Auto Cutting';
    } else if (mode === 'Stock Fitting') {
      floor = 'Stock Fitting';
    } else {
      // Reset to empty if neither mode is selected
      floor = '';
    }
    dispatch(
      fetchTableRepairingStatus(
        'LHG', // Factory
        floor, // Floor
        line, // Line
        '', // Section
        date, // Start date
        date // End date
      )
    );
  }, [dispatch, floor, line, date, mode]);

  // Calculate the status counts
  const counts = {
    waiting: 0,
    repairing: 0,
    done: 0,
  };

  if (tableRepairing) {
    tableRepairing.Name_en.forEach((_, index) => {
      if (tableRepairing.done[index]) {
        counts.done += 1;
      } else if (tableRepairing.repairing[index]) {
        counts.repairing += 1;
      } else {
        counts.waiting += 1;
      }
    });
  }

  return (
    <div
      className="font-bold grid grid-cols-1"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
        borderRadius: '8px',
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '14px',
          px: 1,
          pt: 1,
          textAlign: 'center',
        }}
      >
        {t['REPAIRING QUEUE']}
      </Typography>

      <div className="grid grid-cols-3 border-4 text-center text-lg p-1 my-2">
        <div className="grid grid-rows-2 bg-red-500">
          <div className="border-b-4">{t['WAITING']}</div>
          <div>{counts.waiting}</div>
        </div>
        <div className="grid grid-rows-2 bg-yellow-500">
          <div className="border-b-4">{t['REPAIRING']}</div>
          <div>{counts.repairing}</div>
        </div>
        <div className="grid grid-rows-2 bg-green-500">
          <div className="border-b-4">{t['DONE']}</div>
          <div>{counts.done}</div>
        </div>
      </div>

      {/* Table */}

      <TableContainer
        sx={{
          maxHeight: '350px',
          marginTop: '10px',
          paddingLeft: '2px',
          paddingRight: '2px',
          width: '100%',
          overflow: 'scroll',

          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
            <Typography variant="body1">Loading...</Typography>
          </div>
        ) : error ? (
          <Typography
            variant="body1"
            color="error"
            sx={{ textAlign: 'center', padding: '20px' }}
          >
            {t['Error']}: {error}
          </Typography>
        ) : !tableRepairing || tableRepairing.Name_en.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', padding: '20px' }}
          >
            {t['No data available']}
          </Typography>
        ) : (
          <Table
            sx={{
              overflow: 'auto',
              tableLayout: 'fixed',
              width: '100%',
              position: 'relative',
            }}
          >
            <TableHead
              sx={{
                backgroundColor: '#1e6a65',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                '& .MuiTableCell-root': {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: '4px 4px', // Giảm padding
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Line']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '500px' }}>
                  {t['Machine Name']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Request Time']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Waiting']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Repairing']}
                </TableCell>
                <TableCell sx={{ fontSize: '13px', width: '150px' }}>
                  {t['Done']}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRepairing.Name_en.map((_, index) => {
                // Xác định màu chữ dựa trên trạng thái của hàng
                let textColor = 'inherit'; // Mặc định màu chữ
                if (tableRepairing.done[index]) {
                  textColor = 'green'; // Màu xanh lá cho trạng thái "done"
                } else if (tableRepairing.repairing[index]) {
                  textColor = 'orange'; // Màu cam cho trạng thái "repairing"
                } else {
                  textColor = 'red'; // Màu đỏ cho trạng thái "waiting"
                }

                return (
                  <TableRow
                    key={index}
                    sx={{
                      '& .MuiTableCell-root': {
                        color: textColor, // Áp dụng màu chữ
                        padding: '4px 3.5px', // Giảm padding
                        backgroundColor:
                          index % 2 === 0 ? '#b9f7b9' : '#ffffff', // Tô màu cho hàng chẵn và lẻ
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: '13px', textAlign: 'center' }}>
                      {tableRepairing.floors[index] || ''}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px' }}>
                      {tableRepairing.Name_en[index]}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', textAlign: 'center' }}>
                      {tableRepairing.request[index] || ''}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', textAlign: 'center' }}>
                      {tableRepairing.waiting[index]}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', textAlign: 'center' }}>
                      {tableRepairing.repairing[index]}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', textAlign: 'center' }}>
                      {tableRepairing.done[index]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default MechanicTable;
