import { useState, useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
} from '@mui/material';
import { fetchHourlyFloorDataS } from '@/apis/factory_kpi_api/FactoryAPI';
import { fetchHourlyFloorData } from '@/apis/factory_kpi_api/FactoryFloorAPI';
import { useTranslations } from '../../config/useTranslations';

const HourlyOutputByFloor = ({ date, floor }) => {
  // console.log(floor);

  const [floorData, setFloorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  const translation = useTranslations();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (floor) {
          response = await fetchHourlyFloorData(
            date.format('YYYY/MM/DD'),
            floor
          );
        } else {
          response = await fetchHourlyFloorDataS(
            date.format('YYYY/MM/DD'),
            'LHG'
          );
        }

        const { data, times } = response;
        setTimePeriods(times);
        setFloorData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor]);

  return (
    <div className="bg-white rounded-xl shadow-md font-bold">
      <p
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          textAlign: 'center',
          paddingTop: '10px',
        }}
      >
        {translation['HOURLY OUTPUT BY FLOOR']}
      </p>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 'full',
            overflowY: 'auto',
            marginTop: '10px',
            '&::-webkit-scrollbar': {
              width: '6px', // Độ rộng của thanh cuộn
              height: '6px', // Chiều cao của thanh cuộn (nếu là cuộn ngang)
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888', // Màu thanh cuộn
              borderRadius: '10px', // Độ cong của thanh cuộn
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555', // Màu khi hover vào thanh cuộn
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1', // Màu nền của đường ray thanh cuộn
            },
          }}
        >
          <Table
            sx={{
              '& .MuiTableCell-root': {
                padding: '3px 4px',
                fontSize: '10px',
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: '#c0f1c5',
                '& .MuiTableCell-root': {
                  textAlign: 'center',
                  fontWeight: 900,
                  color: '#000',
                },
              }}
            >
              <TableRow>
                <TableCell rowSpan={2} sx={{ width: '45px', minWidth: '45px' }}>
                  Line
                </TableCell>
                <TableCell rowSpan={2} sx={{}}>
                  Target
                </TableCell>
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
                    backgroundColor: rowIndex % 2 === 0 ? '#f5f5f5' : 'white',
                  }}
                >
                  <TableCell
                    sx={{ width: '45px', minWidth: '45px', fontWeight: 900 }}
                  >
                    {row.lineAlias}
                  </TableCell>
                  <TableCell sx={{ color: 'blue', fontWeight: 900 }}>
                    {row.totalTarget}
                  </TableCell>
                  {timePeriods?.map((time, colIndex) => {
                    const actualValue = row.actualAssembly[time];
                    const isExceeding = actualValue > row.totalTarget;
                    return (
                      <TableCell
                        key={colIndex}
                        sx={{
                          textAlign: 'center',
                          color: isExceeding ? 'green' : 'red', // Màu chữ
                          fontWeight: isExceeding ? 'bold' : 'normal',
                        }}
                      >
                        {actualValue || '-'}
                      </TableCell>
                    );
                  })}
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
