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
  Button,
  TextField,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { useTranslations } from '@/config/useTranslations';

const useStyles = makeStyles({
  datePicker: {
    '& .MuiInputBase-root': {
      height: '40px', // Giảm chiều cao của input field
      width: '320px',
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  textField: {
    '& .MuiInputBase-input': {
      textAlign: 'center', // Canh giữa input text
    },
  },
});

const DowntimeTableExcel = () => {
  const t = useTranslations();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().startOf('day'));
  const [endDate, setEndDate] = useState(dayjs().endOf('day'));
  const [error, setError] = useState('');
  const classes = useStyles();

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://192.168.30.245:8989/downtime/ExportExcel',
        {
          factory: 'LHG',
          dates: startDate.format('YYYY-MM-DD'),
          datee: endDate.format('YYYY-MM-DD'),
        }
      );

      if (response.status === 200) {
        setData(response.data.data || []);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      alert('No data available to export.');
      return;
    }

    // Chuẩn bị dữ liệu để xuất
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    // Tạo sheet và thêm vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Downtime Report');

    // Xuất file Excel
    XLSX.writeFile(workbook, 'DowntimeReport.xlsx');
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="my-4">
        <Grid container alignItems="center" className="mb-2 flex gap-4">
          <Grid item sx={{}}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className={classes.textField}
                />
              )}
              className={classes.datePicker}
            />
          </Grid>
          <Grid item sx={{}}>
            <DatePicker
              label="End Date"
              className={classes.datePicker}
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className={classes.textField}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={exportToExcel}
              startIcon={
                <img
                  src="/images/excel.png"
                  alt="Export Excel"
                  style={{ height: '40px', width: '40px' }}
                />
              }
            >
              {t['Export to Excel']}
            </Button>
          </Grid>
        </Grid>

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
            style={{
              maxHeight: '500px',
              marginTop: '16px',
              overflow: 'auto',
              boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    t['Breakdown Date'],
                    t['Department'],
                    t['Machine Asset Code'],
                    t['Machine Specification'],
                    t['Machine Name'],
                    t['Mechanic'],
                    t['Request Time'],
                    t['Repairing Accept Time'],
                    t['Repairing Start Time'],
                    t['Repairing End Time'],
                    t['Waiting Time (min)'],
                    t['Repairing Time (min)'],
                    t['Downtime (min)'],
                    t['Issue'],
                    t['Method'],
                    t['Replaced Machine'],
                    t['Accumulated Breakdown'],
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
                      'Breakdown Date',
                      'Department',
                      'Machine Asset Code',
                      'Machine Specification',
                      'Machine Name',
                      'Mechanic',
                      'Request Time',
                      'Repairing Accept Time',
                      'Repairing Start Time',
                      'Repairing End Time',
                      'Waiting Time (min)',
                      'Repairing Time (min)',
                      'Downtime (min)',
                      'Issue',
                      'Method',
                      'Replaced Machine',
                      'Accumulated Breakdown',
                    ].map((field) => (
                      <TableCell
                        key={field}
                        style={{
                          textAlign: 'center',
                          border: '1px solid #ddd',
                          padding: '8px',
                        }}
                      >
                        {row[field] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default DowntimeTableExcel;
