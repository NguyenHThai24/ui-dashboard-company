import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import testTableCallingKanban from '../../../../public/data/testTableCallingKanban.json';
import CardRequest from '../Card/CardRequest';
import CardOngoing from '../Card/CardOngoing';
import CardDone from '../Card/CardDone';
import { useTranslations } from '@/config/useTranslations';

const TableCallingKanban = () => {
  const t = useTranslations();

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
        {t['MATERIAL CALLING KANBAN']}
      </Typography>
      <section className="flex gap-4 items-center my-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center">
            <Typography sx={{ mr: 0.5, fontWeight: 'bold', fontSize: '15px' }}>
              {t['RY']}:
            </Typography>
            <TextField
              id="ry-input"
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  height: '30px',
                  width: '120px',
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

          <div className="flex items-center">
            <Typography sx={{ mr: 0.5, fontWeight: 'bold', fontSize: '15px' }}>
              {t['MATERIAL ID']}:
            </Typography>
            <TextField
              id="material-id-input"
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  height: '30px',
                  width: '120px',
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
        <CardRequest />
        <CardOngoing />
        <CardDone />
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
                  t['DATE'],
                  t['RY'],
                  t['COMPONENT'],
                  t['MATERIAL ID'],
                  t['MATERIAL NAME'],
                  t['UNIT'],
                  t['USAGE'],
                  t['REQUEST'],
                  t['ONGOING'],
                  t['DONE'],
                ].map((header) => (
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
              {testTableCallingKanban.map((row, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#ffffff',
                    height: '40px', // Giảm chiều cao hàng
                  }}
                >
                  {[
                    row.DATE,
                    row.RY,
                    row.COMPONENT,
                    row.MATERIALID,
                    row.MATERIALNAME,
                    row.UNIT,
                    row.USAGE,
                    row.REQUEST,
                    row.ONGOING,
                    row.DONE,
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

export default TableCallingKanban;
