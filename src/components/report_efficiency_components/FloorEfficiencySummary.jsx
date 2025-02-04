import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslations } from '@/config/useTranslations';
import { format, set } from 'date-fns';

const FloorEfficiencySummary = ({ timeFrame }) => {
  const [tableData, setTableData] = useState([]);
  const t = useTranslations();
  const currentMonth = 0; // Tháng bắt đầu từ 0 (0 = tháng 1)
  const currentYear = 2025; // Năm cố định cho dữ liệu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlMap = {
          DAILY:
            'http://192.168.30.245:8989/eff/getDailyAVGBuilding?date=2025-01-23&modelName=BARREDA%20DECODE',
          WEEKLY:
            'http://192.168.30.245:8989/eff/getWeeklyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
          MONTHLY:
            'http://192.168.30.245:8989/eff/getMonthlyAVGFac?date=2025-01-23&modelName=BARREDA%20DECODE',
        };

        const url = urlMap[timeFrame] || urlMap['DAILY'];
        const response = await axios.get(url);
        const responseData = response.data;

        if (responseData.status === 0) {
          const baseline = responseData.data.BaselineEFF[0]?.BaselineEFF || 0;

          const buildings = responseData.data.EFF.map((effBuilding) => {
            const rftBuilding = responseData.data.RFT.find(
              (rft) => rft.Building === effBuilding.Building
            );

            return {
              floor: effBuilding.Building,
              baseline: baseline,
              days: Array.from({ length: 31 }, (_, index) => {
                const day = (index + 1).toString();
                return {
                  eff: effBuilding[day] || null,
                  rft: rftBuilding ? rftBuilding[day] : null,
                  dateFormatted: format(
                    set(new Date(currentYear, currentMonth, day), {
                      hours: 0,
                      minutes: 0,
                      seconds: 0,
                      milliseconds: 0,
                    }),
                    'dd/MM/yyyy'
                  ),
                };
              }),
            };
          });

          setTableData(buildings);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return (
    <div
      className="p-2 mb-4"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
        borderRadius: '8px',
      }}
    >
      <h1 className="pb-6 pl-3 font-bold text-xl">
        {t['Floor Efficiency Summary']}
      </h1>
      <TableContainer
        sx={{
          maxHeight: '400px', // Set the height to allow scroll on the body only
          overflowY: 'auto', // Enable vertical scrolling for body only
          '&::-webkit-scrollbar': {
            width: '6px', // Make the scrollbar thinner
            height: '6px', // Thinner horizontal scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', // Scrollbar color
            borderRadius: '4px', // Rounded scrollbar
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Hover effect on scrollbar
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Track color
          },
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ bgcolor: '#96f982' }}>
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                  fontSize: '0.85rem',
                  padding: '6px',
                  height: '4px',
                  position: 'sticky',
                  top: 0, // Keep header fixed at the top
                  backgroundColor: '#96f982', // Keep header background color
                  zIndex: 2, // Ensure header stays on top when scrolling
                }}
              >
                Date
              </TableCell>
              {Array.from({ length: 31 }, (_, index) => (
                <TableCell
                  key={index}
                  colSpan={2}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    fontSize: '0.85rem',
                    padding: '6px',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#96f982', // Keep header background color
                    zIndex: 2, // Ensure header stays on top when scrolling
                  }}
                >
                  {format(
                    set(new Date(currentYear, currentMonth, index + 1), {
                      hours: 0,
                      minutes: 0,
                      seconds: 0,
                      milliseconds: 0,
                    }),
                    'dd/MM/yyyy'
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                rowSpan={2}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                  fontSize: '0.85rem',
                  padding: '6px',
                }}
              >
                {t['Floor']}
              </TableCell>
              <TableCell
                rowSpan={2}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                  fontSize: '0.85rem',
                  padding: '6px',
                }}
              >
                {t['Baseline']}
              </TableCell>
              {Array.from({ length: 31 }, () => (
                <>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                      fontSize: '0.85rem',
                      padding: '6px',
                    }}
                  >
                    {t['EFF']}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                      fontSize: '0.85rem',
                      padding: '6px',
                    }}
                  >
                    {t['RFT']}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  {row.floor}
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  {row.baseline}
                </TableCell>
                {row.days.map((day, dayIndex) => (
                  <>
                    <TableCell
                      key={`eff-${dayIndex}`}
                      align="center"
                      sx={{ border: '1px solid #ccc', color: 'red' }}
                    >
                      {day.eff}
                    </TableCell>
                    <TableCell
                      key={`rft-${dayIndex}`}
                      align="center"
                      sx={{ border: '1px solid #ccc', color: 'blue' }}
                    >
                      {day.rft}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FloorEfficiencySummary;
