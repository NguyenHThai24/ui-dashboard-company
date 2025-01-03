import { request } from "@/utils/request";
import {
  setLoading,
  setError,
  setChartDataEfficiency,
  setChartDataRFT
} from "@/redux/data_building_redux/BuidingBSlice";

export const fetchEfficiencyByLine = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    //const response = await request.post(
    //   `/EFFICIENCY_BY_LINE_Building`,
    //   { YEAR: year, MONTH: month, Building: "B" }
    // );
    // const rawData = response.data;
    const response = await fetch(`/data/week_total_output.json`, {
      params: { YEAR: year, MONTH: month, Building: "B" }, 
    });
    const rawData = await response.json();

    const line = [];
    const EFF = [];

    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        const effValue = parseFloat(item.EFF);
        if (!isNaN(effValue)) {
          line.push(item.line);
          EFF.push(item.EFF);
        }
      });
    } else {
      throw new Error("Dữ liệu API không hợp lệ");
    }

    const formattedData = { line, EFF };
    dispatch(setChartDataEfficiency(formattedData)); // Gửi dữ liệu vào Redux store
    dispatch(setLoading(false)); // Kết thúc loading
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    const errorMessage = error.response?.data?.message || error.toString();
    dispatch(setError(errorMessage)); // Lưu lỗi vào Redux
    console.error("API Error:", error.response || error);
    throw error; // Quăng lỗi cho component xử lý
  }
};

export const fetchRFTByLine = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    // const response = await request.post(
    //   `/RFT_BY_LINE_Building`,
    //   { YEAR: year, MONTH: month, Building: "B" }
    // );
    // const rawData = response.data;
    const response = await fetch(`/data/testData.json`, {
      params: { YEAR: year, MONTH: month, Building: "B" }, 
    });
    const rawData = await response.json();

    const line = [];
    const rft = [];

    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        const effValue = parseFloat(item.rft);
        if (!isNaN(effValue)) {
          line.push(item.line);
          rft.push(item.rft);
        }
      });
    } else {
      throw new Error("Dữ liệu API không hợp lệ");
    }

    const formattedData = { line, rft };
    dispatch(setChartDataRFT(formattedData)); // Gửi dữ liệu vào Redux store
    dispatch(setLoading(false)); // Kết thúc loading
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    const errorMessage = error.response?.data?.message || error.toString();
    dispatch(setError(errorMessage)); // Lưu lỗi vào Redux
    console.error("API Error:", error.response || error);
    throw error; // Quăng lỗi cho component xử lý
  }
};
