import axios from "axios";
import {
  setLoading,
  setError,
  setChartData,
} from "@/redux/loading/loadingSlice";

export const fetchDailyTotalOutput = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    const response = await axios.post(
      `http://192.168.30.232:4567/api/Daily_Total_Output`,
      { YEAR: year, MONTH: month },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch(setChartData(response.data)); // Gửi dữ liệu vào Redux store
    dispatch(setLoading(false)); // Kết thúc loading

    // Gửi dữ liệu vào Redux
    dispatch(setChartData(data));
    dispatch(setLoading(false)); // Kết thúc loading
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};
