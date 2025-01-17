import { request } from '@/utils/request';
import {
  setLoading,
  setError,
  setChartData,
  setChartDataSAMP,
  setChartDataEfficiency,
  setChartDataRFT,
} from '@/redux/data_factory_redux/ReportSlice';

export const fetchWeekTotalOutput = (year, month) => async (dispatch) => {
  dispatch(setLoading(true)); // Bắt đầu loading
  try {
    const response = await request.post(
      `/Daily_Total_Output_Week`,
      { YEAR: year, MONTH: month },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const rawData = response.data;
    // const response = await fetch(`/data/week_total_output.json`, {
    //   params: { year, month },
    // });
    // const rawData = await response.json();
    // Xử lý dữ liệu để tạo `categories`, `actual`, `unachieved`
    const categories = [];
    const actual = [];
    const unachieved = [];
    const Target = [];

    rawData.forEach((item) => {
      const targetValue = parseFloat(item.Target); // Sửa tên biến tránh nhầm lẫn
      const actualValue = parseFloat(item.actual);

      if (!isNaN(targetValue) && !isNaN(actualValue)) {
        categories.push(item.Week);
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

export const fetchWeekStitchingAssemblyMP =
  (year, month) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await request.post(
        `/Daily_Stitching_Assembly_MP_Week`,
        { YEAR: year, MONTH: month },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const rawData = res.data;

      // const response = await fetch("/data/daily_stitching_asysembl_mp.json");
      // const rawData = await response.json();

      const Week = [];
      const worker = [];

      rawData.forEach((item) => {
        const workerValue = parseFloat(item.worker);

        if (!isNaN(workerValue)) {
          Week.push(item.Week);
          worker.push(workerValue);
        }
      });
      const formatedData = { worker, Week };
      //console.log(formatedData);

      dispatch(setChartDataSAMP(formatedData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
      dispatch(setError(error.toString())); // Lưu lỗi vào Redux
      throw error; // Quăng lỗi cho component xử lý
    }
  };

export const fetchWeekEfficiency = (year, month) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await request.post(
      `/Daily_EFFICIENCY_WEEK`,
      { YEAR: year, MONTH: month },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const rawData = res.data;

    // const response = await fetch("/data/daily_efficiency_day.json");
    // const rawData = await response.json();

    const Week = [];
    const Factory_EFF = [];

    rawData.forEach((item) => {
      const efficiencyValue = parseFloat(item.Factory_EFF);

      if (!isNaN(efficiencyValue)) {
        Week.push(item.Week);
        Factory_EFF.push(efficiencyValue);
      }
    });
    const formatedData = { Factory_EFF, Week };
    //console.log(formatedData);

    dispatch(setChartDataEfficiency(formatedData));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};

export const fetchWeekRFT = (year, month) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await request.post(
      `/Daily_RFT_WEEK`,
      { YEAR: year, MONTH: month },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const rawData = res.data;

    // const response = await fetch("/data/daily_rft_day.json");
    // const rawData = await response.json();

    const week = [];
    const RFT = [];

    rawData.forEach((item) => {
      const rftValue = parseFloat(item.RFT);

      if (!isNaN(rftValue)) {
        week.push(item.week);
        RFT.push(rftValue);
      }
    });
    const formatedData = { RFT, week };
    //console.log(formatedData);

    dispatch(setChartDataRFT(formatedData));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false)); // Kết thúc loading khi lỗi xảy ra
    dispatch(setError(error.toString())); // Lưu lỗi vào Redux
    throw error; // Quăng lỗi cho component xử lý
  }
};
