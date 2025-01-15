import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import tableData from '../../../../public/data/testTableCallingKanban.json'; // Import dữ liệu bảng

const CardDone = () => {
  const [totalDone, setTotalDone] = useState(0);

  useEffect(() => {
    // Tính tổng giá trị cột "TOTAL QTY"
    const calculateTotalQty = () => {
      const total = tableData.reduce((sum, row) => sum + (row.DONE || 0), 0);
      setTotalDone(total);
    };

    calculateTotalQty();
  }, []);

  return (
    <div className="bg-[#fff] border-4 border-green-700 rounded-md p-2">
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#000',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          marginBottom: '10px',
          textAlign: 'center',
          borderBottom: '4px solid green',
        }}
      >
        DONE
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80px"
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
          }}
        >
          {totalDone.toLocaleString()}{' '}
          {/* Hiển thị dạng số với dấu phân cách */}
        </Typography>
      </Box>
    </div>
  );
};

export default CardDone;
