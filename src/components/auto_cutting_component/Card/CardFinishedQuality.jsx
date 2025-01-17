import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import tableData from '../../../../public/data/testTableData.json'; // Import dữ liệu bảng
import { useTranslations } from '@/config/useTranslations';

const CardFinishedQuality = ({ date }) => {
  const [totalFinished, setTotalFinished] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    const calculateTotalOngoing = () => {
      const total = tableData.reduce(
        (sum, row) => sum + (row?.FinishedQty || 0),
        0
      );
      setTotalFinished(total);
    };

    calculateTotalOngoing();
  }, []);
  return (
    <div
      className="bg-[#eaf9e9] p-2"
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
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          marginBottom: '10px',
          textAlign: 'center',
          borderBottom: '2px solid green',
        }}
      >
        {t['Finished Qty (PO)']}
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
            color: '#239d85',
            textAlign: 'center',
          }}
        >
          {totalFinished?.toLocaleString()}{' '}
          {/* Hiển thị dạng số với dấu phân cách */}
        </Typography>
      </Box>
    </div>
  );
};

export default CardFinishedQuality;
