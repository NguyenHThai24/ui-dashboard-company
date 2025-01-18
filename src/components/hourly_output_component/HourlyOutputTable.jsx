import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import { req } from '@/utils/request';
import { useTranslations } from '@/config/useTranslations';

const HourlyOutputTable = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    req
      .get(`/getPphHourlyReport?date=${date}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
        setLoading(false);
      });
  }, [date]);

  const groupedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const validData = data.filter((item) => item.Loc && item.QTY);
    if (validData.length === 0) return [];

    return validData.reduce((acc, item) => {
      const loc = item.Loc?.trim() || 'Unknown';
      const line = item.line || '';
      const lineAfterDash = line.includes('-') ? line.split('-')[1].trim() : '';
      const typeGroup = lineAfterDash.startsWith('G')
        ? 'G'
        : lineAfterDash.startsWith('M')
          ? 'M'
          : 'Unknown';

      if (!acc[loc]) acc[loc] = { G: [], M: [] };
      if (typeGroup !== 'Unknown') {
        acc[loc][typeGroup].push(item);
      }

      return acc;
    }, {});
  }, [data]);

  const calculateTotals = (group) => {
    const total = {};
    group.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key.includes(':') || key === 'QTY' || key === 'TARGET') {
          total[key] = (total[key] || 0) + (item[key] || 0);
        }
      });
    });
    return total;
  };

  const getColor = (value, target) => {
    if (value >= target) return 'green';
    if (value >= target - 20) return 'yellow';
    return 'red';
  };

  const getRowBackgroundColor = (index) =>
    index % 2 === 0 ? '#f2f2f2' : '#ffffff';

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="my-2 p-2">
      <Grid container spacing={2}>
        {Object.entries(groupedData).map(([locKey, locData], index) => (
          <Grid item xs={6} key={index}>
            <div
              style={{
                boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
                background: '#fff',
                borderRadius: '8px',
              }}
            >
              <h1 className="text-center font-bold text-2xl">{locKey}</h1>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 'full',
                  overflowY: 'auto',
                  marginTop: '10px',
                  '&::-webkit-scrollbar': {
                    width: '6px',
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
                <Table>
                  <TableHead sx={{ bgcolor: '#9aff7a' }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 900,
                          fontSize: '11px',
                          padding: '4px 8px', // Giảm padding
                          whiteSpace: 'nowrap', // Đảm bảo nội dung không xuống hàng
                        }}
                      >
                        {t['Line']}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 900,
                          fontSize: '11px',
                          padding: '4px 8px',
                        }}
                      >
                        {t['Daily Target']}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 900,
                          fontSize: '11px',
                          padding: '4px 8px',
                        }}
                      >
                        {t['Daily Actual']}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 900,
                          fontSize: '11px',
                          padding: '4px 8px',
                        }}
                      >
                        {t['Hourly Target']}
                      </TableCell>
                      {[...Array(9).keys()].map((i) => (
                        <TableCell
                          key={i}
                          sx={{
                            fontWeight: 900,
                            fontSize: '11px',
                            padding: '4px 8px',
                          }}
                        >
                          {`${7 + i}:30-${8 + i}:30`}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {['G', 'M'].map((lineType) => {
                      const lineData = locData[lineType];
                      const totalRow = calculateTotals(lineData);

                      return (
                        <>
                          {lineData.map((item, rowIndex) => (
                            <TableRow
                              key={rowIndex}
                              style={{
                                backgroundColor:
                                  getRowBackgroundColor(rowIndex),
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '11px',
                                  padding: '4px 8px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {item.line}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '11px',
                                  padding: '4px 8px',
                                }}
                              >
                                {item.TARGET * 8}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '11px',
                                  padding: '4px 8px',
                                }}
                              >
                                {item.QTY}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '11px',
                                  padding: '4px 8px',
                                }}
                              >
                                {item.TARGET}
                              </TableCell>
                              {[...Array(9).keys()].map((i) => {
                                const timeSlot = `${7 + i}:30-${8 + i}:30`;
                                const value = item[timeSlot] || 0;
                                const color = getColor(value, item.TARGET);
                                return (
                                  <TableCell
                                    key={i}
                                    sx={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      color:
                                        color === 'green'
                                          ? '#097709'
                                          : color === 'yellow'
                                            ? '#ffaa00'
                                            : '#FF0000',
                                      padding: '4px 8px',
                                    }}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}

                          <TableRow>
                            <TableCell
                              sx={{
                                fontWeight: 900,
                                fontSize: '11px',
                                padding: '4px 8px',
                              }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 900,
                                fontSize: '11px',
                                padding: '4px 8px',
                              }}
                            >
                              {totalRow.TARGET * 8 || 0}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 900,
                                fontSize: '11px',
                                padding: '4px 8px',
                              }}
                            >
                              {totalRow.QTY || 0}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 900,
                                fontSize: '11px',
                                padding: '4px 8px',
                              }}
                            >
                              {totalRow.TARGET || 0}
                            </TableCell>
                            {[...Array(9).keys()].map((i) => {
                              const timeSlot = `${7 + i}:30-${8 + i}:30`;
                              return (
                                <TableCell
                                  key={i}
                                  sx={{
                                    fontWeight: 900,
                                    fontSize: '11px',
                                    padding: '4px 8px',
                                  }}
                                >
                                  {totalRow[timeSlot] || 0}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HourlyOutputTable;
