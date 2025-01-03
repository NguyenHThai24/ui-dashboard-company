// Import axios
import axios from 'axios';

// Hàm để gọi API
export const getFactoryData = (date) => {
  // Tạo URL với tham số ngày và factory cố định là "LHG"
  const url = `http://192.168.30.245:8989/factory/getFloorDataS?date=${date}&factory=LHG`;

  // Gửi yêu cầu GET với axios
  axios.get(url)
    .then(response => {
      // Xử lý dữ liệu trả về từ API
      console.log('Data:', response.data);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('Error fetching data:', error);
    });
}

// Lấy ngày hiện tại từ lịch và gọi API
const currentDate = new Date().toISOString().split('T')[0]; // lấy ngày theo định dạng YYYY-MM-DD
getFactoryData(currentDate);
