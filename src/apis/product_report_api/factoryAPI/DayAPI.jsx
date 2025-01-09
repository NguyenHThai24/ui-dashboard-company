import { request } from "@/utils/request";

import {
  setLoading,
  setError,
  setChartData,
  setChartDataDailySAMP,
  setChartDataDailyEfficiency,
  setChartDataDailyRFT,
} from "@/redux/data_factory_redux/DayReportSlice";

export const fetchDailyTotalOutput = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    const response = await request.post(
      `/Daily_Total_Output`,
      { YEAR: year, MONTH: month },
      { headers: { "Content-Type": "application/json" } }
    );
    const rawData = response.data;
 
    // Xử lý dữ liệu để tạo `categories`, `actual`, `unachieved`
    const categories = [];
    const actual = [];
    const unachieved = [];
    const Target = [];

    rawData.forEach((item) => {
      const targetValue = parseFloat(item.Target); // Sửa tên biến tránh nhầm lẫn
      const actualValue = parseFloat(item.actual);

      if (!isNaN(targetValue) && !isNaN(actualValue)) {
        categories.push(item.BZDate);
        actual.push(actualValue);
        unachieved.push(targetValue - actualValue);
        Target.push(targetValue); // Thêm giá trị target vào mảng target
      }
    });

    // Định dạng lại dữ liệu trước khi lưu vào Redux
    const formattedData = { categories, actual, unachieved, Target }; // Đúng định dạng

    //console.log(formattedData);
    dispatch(setChartData(formattedData)); // Gửi dữ liệu vào Redux store

    dispatch(setLoading(false)); // Kết thúc loading
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};

// Fetch API Daily Stitching Assembly MP
export const fetchDailyStitchingAssemblyMP =
  (year, month) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await request.post(
        `/Daily_Stitching_Assembly_MP`,
        { YEAR: year, MONTH: month },
        { headers: { "Content-Type": "application/json" } }
      );

      const rawData = res.data;

      // const response = await fetch("/data/daily_stitching_asysembl_mp.json");
      // const rawData = await response.json();

      const outputdate = [];
      const worker = [];

      rawData.forEach((item) => {
        const workerValue = parseFloat(item.worker);

        if (!isNaN(workerValue)) {
          outputdate.push(item.outputdate);
          worker.push(workerValue);
        }
      });
      const formatedData = { worker, outputdate };
      //console.log(formatedData);

      dispatch(setChartDataDailySAMP(formatedData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
      dispatch(setError(error.toString())); // Lưu lỗi vào Redux
      throw error; // Quăng lỗi cho component xử lý
    }
  };

export const fetchDailyEfficiency = (year, month) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await request.post(
      `/Daily_EFFICIENCY_Day`,
      { YEAR: year, MONTH: month },
      { headers: { "Content-Type": "application/json" } }
    );

    const rawData = res.data;

    // const response = await fetch("/data/daily_efficiency_day.json");
    // const rawData = await response.json();

    const date = [];
    const Factory_EFF = [];

    rawData.forEach((item) => {
      const efficiencyValue = parseFloat(item.Factory_EFF);

      if (!isNaN(efficiencyValue)) {
        date.push(item.date);
        Factory_EFF.push(efficiencyValue);
      }
    });
    const formatedData = { Factory_EFF, date };
    //console.log(formatedData);

    dispatch(setChartDataDailyEfficiency(formatedData));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};

export const fetchDailyRFT = (year, month) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await request.post(
      `/Daily_RFT_Day`,
      { YEAR: year, MONTH: month },
      { headers: { "Content-Type": "application/json" } }
    );

    const rawData = res.data;

    // const response = await fetch("/data/daily_rft_day.json");
    // const rawData = await response.json();

    const date = [];
    const RFT = [];

    rawData.forEach((item) => {
      const rftValue = parseFloat(item.RFT);

      if (!isNaN(rftValue)) {
        date.push(item.date);
        RFT.push(rftValue);
      }
    });
    const formatedData = { RFT, date };
    //console.log(formatedData);

    dispatch(setChartDataDailyRFT(formatedData));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};
