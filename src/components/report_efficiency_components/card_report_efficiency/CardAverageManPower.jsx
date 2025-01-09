import { Card, Typography } from "@mui/material"

const CardAverageManPower = () => {
  return (
    <Card   sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        boxShadow: "0 4px 6px rgb(255, 255, 255), 2px 1px 3px rgb(255, 250, 250)", // Hiệu ứng bóng
        border: "1px solid rgba(0, 0, 0, 0.5)", // Đường viền nhấn mạnh
        borderRadius: 2, // Góc bo tròn
        backgroundColor: "#fff", // Màu nền
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hiệu ứng hover mượt
        // "&:hover": {
        //   transform: "translateY(-2px)", // Nâng thẻ lên
        //   boxShadow: "0 8px 15px rgba(1, 1, 1, 0.2)", // Tăng bóng
        // },
      }}>
        <Typography 
            component="div" 
            color="text.secondary"
            sx={{ fontWeight: 900, fontSize: 12, textAlign: 'left' }}
        >
           AVERAGE C2B MANPOWER
        </Typography>
        <Typography 
            sx={{ fontSize: 50, textAlign: 'right', alignSelf: 'flex-end', fontWeight: 900 }}
        >
            40
        </Typography>
    </Card>
  
  )
}

export default CardAverageManPower