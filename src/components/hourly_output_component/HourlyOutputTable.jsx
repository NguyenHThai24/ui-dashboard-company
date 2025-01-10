import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CircularProgress, Box } from '@mui/material';
import { req } from "@/utils/request";

const HourlyOutputTable = ({ date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    req
      .get(`/getPphHourlyReport?date=${date}`)
      .then((response) => {
        // Set the response data into state
        setData(response.data.data);
        setLoading(false); // Done loading
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
        setLoading(false); // Done loading
      });
  }, [date]);

  // Group data by 'Loc'
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.Loc]) {
      acc[item.Loc] = [];
    }
    acc[item.Loc].push(item);
    return acc;
  }, {});

  // Function to determine the color based on the value and target
  const getColor = (value, target) => {
    if (value >= target) {
      return 'green'; // If the value is equal to or greater than the target
    }
    if (value >= target - 20) {
      return 'yellow'; // If the value is between target-20 and target-1
    }
    return 'red'; // If the value is much smaller than the target
  };

  // Alternating row background color
  const getRowBackgroundColor = (index) => {
    return index % 2 === 0 ? '#f2f2f2' : '#ffffff'; // Alternating between light gray and white
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-white my-2 p-2 rounded-md">
      <Grid container spacing={2}>
        {Object.keys(groupedData).map((locKey, index) => (
          <Grid item xs={6} key={index}>
            <div>
              <h1 className="text-center font-bold text-2xl">{locKey}</h1>
              <TableContainer  component={Paper}
              sx={{
                maxHeight: "full",
                overflowY: "auto",
                marginTop: "10px",
                "&::-webkit-scrollbar": {
                  width: "6px", // Độ rộng của thanh cuộn
                  height: "6px", // Chiều cao của thanh cuộn (nếu là cuộn ngang)
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888", // Màu thanh cuộn
                  borderRadius: "10px", // Độ cong của thanh cuộn
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // Màu khi hover vào thanh cuộn
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1", // Màu nền của đường ray thanh cuộn
                },
              }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#9aff7a' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 900, padding: '2px 4px', width: '150px', fontSize: "11px" }}>Line</TableCell>
                      <TableCell sx={{ fontWeight: 900, padding: '2px 4px', fontSize: "11px" }}>Daily Target</TableCell>
                      <TableCell sx={{ fontWeight: 900, padding: '2px 4px', fontSize: "11px" }}>Daily Actual</TableCell>
                      <TableCell sx={{ fontWeight: 900, padding: '2px 4px', fontSize: "11px" }}>Hourly Target</TableCell>
                      {['07:30-08:30', '08:30-09:30', '09:30-10:30', '10:30-11:30', '11:30-12:30', '12:30-13:30', '13:30-14:30', '14:30-15:30', '15:30-16:30'].map((timeSlot, idx) => (
                        <TableCell key={idx} sx={{ fontWeight: 900, padding: '2px 4px', fontSize: "11px" }}>{timeSlot}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedData[locKey].map((lineData, rowIndex) => (
                      <TableRow key={rowIndex} style={{ backgroundColor: getRowBackgroundColor(rowIndex) }}>
                        <TableCell sx={{ padding: '2px 4px', fontWeight: 600, width: '150px', fontSize: "11px" }}>{lineData.line}</TableCell>
                        <TableCell sx={{ padding: '2px 4px', fontWeight: 600, fontSize: "11px" }}>{lineData.TARGET * 8}</TableCell>
                        <TableCell sx={{ padding: '2px 4px', fontWeight: 600, fontSize: "11px" }}></TableCell>
                        <TableCell sx={{ padding: '2px 4px', fontWeight: 600, fontSize: "11px" }}>{lineData.TARGET}</TableCell>
                        {['07:30-08:30', '08:30-09:30', '09:30-10:30', '10:30-11:30', '11:30-12:30', '12:30-13:30', '13:30-14:30', '14:30-15:30', '15:30-16:30'].map((timeSlot, idx) => {
                          const value = lineData[timeSlot] || 0;
                          const target = lineData.TARGET;
                          const color = getColor(value, target);

                          return (
                            <TableCell
                              key={idx}
                              sx={{
                                padding: '2px 4px',
                                fontSize: "11px",
                                fontWeight: 600,
                                color: color === 'green' ? '#097709' : color === 'yellow' ? '#ffaa00' : '#FF0000',
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
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
