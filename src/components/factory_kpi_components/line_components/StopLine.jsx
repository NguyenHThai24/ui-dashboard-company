import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StopLine = () => {
  const chartData = [
    { name: 'LEM KEO HOAC LEM XU LY', y: 24, color: '#f44336' },
    { name: 'HO KEO', y: 19, color: '#ffeb3b' },
    {
      name: 'LEM KEO HOAC LEM XU LY (VANG HOAC BAC MAU)',
      y: 35,
      color: '#8bc34a',
    },
  ];

  const options = {
    chart: {
      type: 'pie',
      backgroundColor: '#ffffff',
      plotBackgroundColor: '#ffffff',
      plotBorderWidth: null,
      plotShadow: false,
      width: 300, // Kích thước cố định của biểu đồ
    },
    title: {
      text: 'STOP LINE TOP 3 DEFECT',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        color: '#239d85',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        letterSpacing: '0px',
      },
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'middle',
      symbolRadius: 0,
      symbolHeight: 10,
      symbolWidth: 10,
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'normal',
        color: '#000',
      },
      itemMarginBottom: 6,
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Defects',
        colorByPoint: true,
        data: chartData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  // Dữ liệu bảng được lấy từ biểu đồ
  const rows = chartData.map((item) => ({
    name: item.name,
    action: 'Pending', // Bạn có thể thay thế bằng dữ liệu cụ thể
    picture: 'No Picture', // Hoặc đường dẫn hình ảnh thực tế
  }));

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: 2,
        mb: 4,
        p: 2,
        gap: 2,
      }}
    >
      {/* Biểu đồ tròn */}
      <div style={{ flexShrink: 0 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      {/* Bảng */}
      <TableContainer
        component={Paper}
        sx={{ flexGrow: 1, width: 'auto', marginLeft: 2 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: '#a4f1b9', color: '#fff' }}>
            <TableRow>
              <TableCell sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                Defect Name
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: '15px', fontWeight: 'bold' }}
              >
                Action Plan & Follow-up
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: '15px', fontWeight: 'bold' }}
              >
                Picture
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.action}</TableCell>
                <TableCell align="right">{row.picture}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default StopLine;
