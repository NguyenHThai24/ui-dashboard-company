import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { getAutoCuttingUrl } from '../../../apis/auto_cutting_api/AutoCuttingAPI';

const TableOEEbyMachine = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!date) return; // Chỉ tải nếu có giá trị `date`
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        getAutoCuttingUrl(date.format('YYYY-MM-DD'))
      );

      if (response.status === 200) {
        const rawData = response.data.data || [];

        // Tính các giá trị phần trăm
        const processedData = rawData.map((row) => {
          const availabilityFactor =
            row.AvailableTime && row.Operating
              ? ((row.Operating / row.AvailableTime) * 100).toFixed(2)
              : 0;

          const performanceFactor =
            row.TheoreticalOutput && row.ActualOutput
              ? ((row.ActualOutput / row.TheoreticalOutput) * 100).toFixed(2)
              : 0;

          const oee =
            availabilityFactor && performanceFactor && row.QualityFactor
              ? (
                  (availabilityFactor / 100) *
                  (performanceFactor / 100) *
                  row.QualityFactor
                ).toFixed(2)
              : 0;

          return {
            ...row,
            AvailabilityFactor: availabilityFactor,
            PerformanceFactor: performanceFactor,
            OEE: oee,
          };
        });

        setData(processedData);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]); // Gọi lại `fetchData` khi `date` thay đổi

  return (
    <div className="bg-white rounded-md shadow-xl shadow-slate-500 p-4">
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          borderBottom: '2px solid green',
          marginBottom: '2px',
        }}
      >
        OEE BY MACHINE
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '500px',
            padding: '0px 8px',
            overflow: 'auto',
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
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ textTransform: 'uppercase' }}>
                {[
                  'MACHINE',
                  'UP TIME',
                  'TOTAL DOWNTIME',
                  'AVAILABLE TIME',
                  'AVAILABILITY (%)',
                  'Theoretical Output',
                  'ActualOutput',
                  'Performance Factor (%)',
                  'Defect',
                  'OEE (%)',
                ].map((header) => (
                  <TableCell
                    key={header}
                    style={{
                      fontWeight: 'bold',
                      backgroundColor: '#1d76cf',
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#ffffff',
                  }}
                >
                  {[
                    row.Layer,
                    row.Operating,
                    row.TotalDowntime,
                    row.AvailableTime,
                    `${row.AvailabilityFactor} %`,
                    row.TheoreticalOutput,
                    row.ActualOutput,
                    `${row.PerformanceFactor} %`,
                    row.DefectiveProduct,
                    `${row.OEE} %`,
                  ].map((value, i) => (
                    <TableCell
                      key={i}
                      style={{
                        textAlign: 'center',
                        border: '1px solid #ddd',
                        padding: '8px',
                      }}
                    >
                      {value || '-'}
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

export default TableOEEbyMachine;
