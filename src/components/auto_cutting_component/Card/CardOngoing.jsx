import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import tableData from '../../../../public/data/testTableCallingKanban.json'; // Import dữ liệu bảng
import { useTranslations } from '@/config/useTranslations';

const CardOngoing = () => {
  const [totalOngoing, setTotalOngoing] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    // Tính tổng giá trị cột "TOTAL QTY"
    const calculateTotalQty = () => {
      const total = tableData.reduce((sum, row) => sum + (row.ONGOING || 0), 0);
      setTotalOngoing(total);
    };

    calculateTotalQty();
  }, []);

  return (
    <div
      className="bg-[#fff] border-4 border-[#0098f5] p-2"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        borderRadius: '8px',
      }}
    >
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
          borderBottom: '4px solid #0098f5',
        }}
      >
        {t['ONGOING']}
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
          {totalOngoing?.toLocaleString()}{' '}
          {/* Hiển thị dạng số với dấu phân cách */}
        </Typography>
      </Box>
    </div>
  );
};

export default CardOngoing;
