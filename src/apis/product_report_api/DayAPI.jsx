export const fetchDailyTotalOutput = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    const response = await fetch(
      `http://192.168.30.232:4567/api/Daily_Total_Output`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ YEAR: year, MONTH: month }),
      }
    );
    const data = await response.json();
    dispatch(setChartData(data)); // Gửi data vào Redux store
    dispatch(setLoading(false)); // Kết thúc loading
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi gặp lỗi
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};
