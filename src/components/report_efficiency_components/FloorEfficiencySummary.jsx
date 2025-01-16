import data from '@public/data/FloorEfficiencySummary.json';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const FloorEfficiencySummary = () => {
  const t = useTranslations();
  return (
    <div className="rounded-md p-2 bg-white my-4">
      <h1 className="pb-6 pl-3 font-bold text-xl">
        {t['Floor Efficiency Summary']}
      </h1>
      <TableContainer
        sx={{
          maxHeight: '400px', // Giới hạn chiều cao
          overflow: 'auto', // Cho phép cuộn
          '&::-webkit-scrollbar': {
            width: '8px', // Chiều rộng của thanh cuộn dọc
            height: '8px', // Chiều cao của thanh cuộn ngang
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', // Màu của thanh cuộn
            borderRadius: '4px', // Bo góc thanh cuộn
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Màu khi hover
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Màu nền của thanh cuộn
          },
        }}
      >
        <Table sx={{ width: '100%' }}>
          {/* Table Head */}
          <TableHead sx={{ bgcolor: '#96f982' }}>
            <TableRow sx={{ bgcolor: '#96f982' }}>
              <TableCell
                colSpan={2}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                  fontSize: '0.85rem', // Giảm kích thước font chữ
                  padding: '6px', // Giảm padding
                }}
              >
                Date
              </TableCell>
              {Array.from({ length: 26 }, (_, index) => (
                <TableCell
                  key={index}
                  colSpan={2}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    fontSize: '0.85rem', // Giảm kích thước font chữ
                    padding: '6px', // Giảm padding
                  }}
                >
                  {index + 1}
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
                  fontSize: '0.85rem', // Giảm kích thước font chữ
                  padding: '6px', // Giảm padding
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
                  fontSize: '0.85rem', // Giảm kích thước font chữ
                  padding: '6px', // Giảm padding
                }}
              >
                {t['Baseline']}
              </TableCell>
              {Array.from({ length: 26 }, () => (
                <>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                      fontSize: '0.85rem', // Giảm kích thước font chữ
                      padding: '6px', // Giảm padding
                    }}
                  >
                    {t['EFF']}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                      fontSize: '0.85rem', // Giảm kích thước font chữ
                      padding: '6px', // Giảm padding
                    }}
                  >
                    {t['RFT']}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.data.map((row, rowIndex) => (
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
