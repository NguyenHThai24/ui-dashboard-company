import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import CardTotalQuality from '../Card/CardTotalQuality';
import CardOngoingQuality from '../Card/CardOngoingQuality';
import CardFinishedQuality from '../Card/CardFinishedQuality';
import tableData from '../../../../public/data/testTableData.json';

import { useTranslations } from '@/config/useTranslations';
const TableTrackingBoard = () => {
  // section 1
  const [name, setName] = useState('all'); // Default to "All"
  const t = useTranslations();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  // section 2
  return (
    <section className="bg-white rounded-lg p-4">
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          marginBottom: '10px',
          textAlign: 'center',
          borderBottom: '2px solid green',
        }}
      >
        {t['DAILY PO TRACKING BOARD']}
      </Typography>
      <section className="flex gap-4">
        <div className="">
          <div className="flex item-center my-4">
            <Typography sx={{ mr: 0.5, fontWeight: 'bold', fontSize: '15px' }}>
              {t['MACHINE']}:
            </Typography>
            <Box sx={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  onChange={handleChange}
                  sx={{
                    height: 30, // Height
                    width: 180, // Width
                  }}
                >
                  <MenuItem value="all">{t['All']}</MenuItem>
                  <MenuItem value={10}>Machine 1</MenuItem>
                  <MenuItem value={20}>Machine 2</MenuItem>
                  <MenuItem value={30}>Machine 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex item-center my-4">
            <Typography sx={{ mr: 0.5, fontWeight: 'bold', fontSize: '15px' }}>
              {t['ARTICLE']}:
            </Typography>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  height: '30px',
                  width: '180px',
                  alignItems: 'center',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                },
                '& .MuiInputLabel-root': {
                  top: '-10px',
                  fontSize: '14px',
                },
                '& .MuiInputLabel-shrink': {
                  top: '0px',
                },
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex item-center my-4">
            <Typography sx={{ mr: 0.5, fontWeight: 'bold', fontSize: '15px' }}>
              {t['RY']}:
            </Typography>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  height: '30px',
                  width: '180px',
                  alignItems: 'center',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                },
                '& .MuiInputLabel-root': {
                  top: '-10px',
                  fontSize: '14px',
                },
                '& .MuiInputLabel-shrink': {
                  top: '0px',
                },
              }}
            />
          </div>

          <Button variant="contained" sx={{ height: 30 }}>
            {t['SEARCH']}
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-2">
        <CardTotalQuality />
        <CardOngoingQuality />
        <CardFinishedQuality />
      </section>
      <section className="mt-4">
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '500px',
            padding: '0px 2px',
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
              <TableRow
                sx={{
                  textTransform: 'uppercase',
                  height: '40px',
                }}
              >
                {[
                  t['MACHINE'],
                  t['ARTICLE'],
                  t['MODEL NAME'],
                  t['COMPONENT'],
                  t['RY'],
                  t['STITCHING DATE'],
                  t['TOTAL QTY'],
                  t['ONGOING QTY'],
                  t['FINISHED QTY'],
                ]?.map((header) => (
                  <TableCell
                    key={header}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '12px', // Chỉnh font chữ nhỏ lại
                      backgroundColor: '#1d76cf',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '4px 6px', // Tăng chiều rộng
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#ffffff',
                    height: '40px', // Giảm chiều cao hàng
                  }}
                >
                  {[
                    row.Machine,
                    row.Article,
                    row.ModelName,
                    row.Component,
                    row.Ry,
                    row.StitchingDate,
                    row.TotalQty,
                    row.OngoingQty,
                    row.FinishedQty,
                  ].map((value, i) => (
                    <TableCell
                      key={i}
                      style={{
                        textAlign: 'center',
                        border: '1px solid #ddd',
                        padding: '6px 16px', // Giảm chiều cao và tăng chiều rộng
                        fontSize: '12px', // Chỉnh font chữ nhỏ lại
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
      </section>
    </section>
  );
};

export default TableTrackingBoard;
