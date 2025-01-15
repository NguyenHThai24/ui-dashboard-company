import axios from 'axios';

import {
  setLoading,
  setError,
  setChartData,
  setChartDataFixed,
  setChartRepairingTime,
  setChartMostDowntime,
  setChartMostBreakdown,
  setChartMostRepairing,
  setChartTotalMachine,
} from '@/redux/downTimeSlice';
import {
  setChartReasonMin,
  setTableMechanicList,
  setChartTotalReason,
  setChartRepairingMethod,
  setTableRepairingStatus,
} from '../../redux/downTimeSlice';

//Gọi API cho Card Total Breakdown
export const fetchTotalBreakdown = async (
  factory,
  floor,
  line,
  section,
  dates,
  datee
) => {
  try {
    const response = await axios.post(
      'http://192.168.30.245:8989/downtime/TotalBreakdown',
      {
        factory,
        floor,
        line,
        section,
        dates,
        datee,
      }
    );
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0].total;
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data');
  }
};

// gọi api cho Card Total Machine downtime (min)
export const fetchTotalMachineDownTime = async (
  factory,
  floor,
  line,
  section,
  dates,
  datee
) => {
  try {
    const response = await axios.post(
      'http://192.168.30.245:8989/downtime/TotalMachineDowntime',
      {
        factory,
        floor,
        line,
        section,
        dates,
        datee,
      }
    );
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0].total;
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data');
  }
};

//Gọi API cho Card Repairing time (min)
export const fetchTotalRepairingTime = async (
  factory,
  floor,
  line,
  section,
  dates,
  datee
) => {
  try {
    const response = await axios.post(
      'http://192.168.30.245:8989/downtime/TotalRepairTimeOfMechanic',
      {
        factory,
        floor,
        line,
        section,
        dates,
        datee,
      }
    );
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0].total;
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data');
  }
};

// Goi API bieu do MACHINE BREAKDOWN BY LINE (COUNT)
export const fetchChartDataBreakdown =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalBreakdownHourly`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const name = [];
        const total = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValue = item.name;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            name.push(nameValue); // Push string name
            total.push(totalValue); // Push numeric total
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartData({ name, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MACHINE DOWNTIME BY LINE (MIN)
export const fetchChartDataFixed =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/FixedRangeOfDowntime`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const name = [];
        const total = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValueFixed = item.name;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            name.push(nameValueFixed); // Push string name
            total.push(totalValue); // Push numeric total
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartDataFixed({ name, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MECHANIC REPAIRING TIME (MIN)
export const fetchChartRepairingTime =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/MechanicRepairingTime`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const name = [];
        const waitingTime = [];
        const repairingTime = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValueFixed = item.name;
          const repairingTimeValue = parseFloat(item.repairingTime); // 'total' should be a number
          const waitingTimeValue = parseFloat(item.waitingTime);

          if (!isNaN(repairingTimeValue) && !isNaN(waitingTimeValue)) {
            name.push(nameValueFixed); // Push string name
            waitingTime.push(waitingTimeValue); // Push numeric
            repairingTime.push(repairingTimeValue);
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartRepairingTime({ name, waitingTime, repairingTime }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MOST DOWNTIME BY MACHINE TYPE (MIN)
export const fetchChartMostDowntime =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalMachineDowntimeByMachineType`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const Name_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValue = item.Name_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            Name_en.push(nameValue); // Push string name
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartMostDowntime({ Name_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MOST BREAKDOWN BY MACHINE TYPE (COUNT)
export const fetchChartMostBreakdown =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalBreakdownMachineType`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const Name_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValue = item.Name_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            Name_en.push(nameValue); // Push string name
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartMostBreakdown({ Name_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MOST REPAIRING TIME BY MACHINE TYPE (MIN)
export const fetchChartMostRepairing =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalRepairTimeByMachineType`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const Name_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValue = item.Name_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            Name_en.push(nameValue); // Push string name
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartMostRepairing({ Name_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ TOTAL MACHINE WAITING TIME BY LINE (MIN)
export const fetchChartTotalMachine =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalMachineWaitingTime`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const name = [];
        const value = [];

        rawData.forEach((item) => {
          // 'name' should remain a string (not converted to float)
          const nameValue = item.name;
          const totalValue = parseFloat(item.value); // 'total' should be a number

          if (!isNaN(totalValue)) {
            name.push(nameValue); // Push string name
            value.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartTotalMachine({ name, value }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MECHANIC LIST
export const fetchChartReasonMin =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalMachineByReason`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const info_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'info_en' should remain a string (not converted to float)
          const info_enValue = item.info_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            info_en.push(info_enValue); // Push string info_en
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartReasonMin({ info_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MECHANIC LIST
export const fetchTableMechanic =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/ListMechanic`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        // Initialize arrays to store formatted data
        const mechanic = [];
        const mechanic_type = [];
        const current_task = [];
        const status = [];
        const counts = []; // number

        rawData.forEach((item) => {
          // Extract data from item
          const {
            mechanic: mech,
            mechanic_type: type,
            current_task: task,
            status: stat,
            counts: cnt,
          } = item;

          // Push extracted data into respective arrays
          mechanic.push(mech);
          mechanic_type.push(type);
          current_task.push(task);
          status.push(stat);
          counts.push(parseFloat(cnt)); // Convert counts to number
        });

        // Dispatch the formatted data to Redux store
        dispatch(
          setTableMechanicList({
            mechanic,
            mechanic_type,
            current_task,
            status,
            counts,
          })
        );
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MOST BREAKDOWN BY REASON
export const fetchChartTotalReason =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalMachineByReason`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const info_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'info_en' should remain a string (not converted to float)
          const info_enValue = item.info_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            info_en.push(info_enValue); // Push string info_en
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartTotalReason({ info_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API biểu đồ MOST REPAIRING TIME BY METHOD (MIN)
export const fetchChartRepairingMethod =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/TotalRepairTimeByReason`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        const info_en = [];
        const total = [];

        rawData.forEach((item) => {
          // 'info_en' should remain a string (not converted to float)
          const info_enValue = item.info_en;
          const totalValue = parseFloat(item.total); // 'total' should be a number

          if (!isNaN(totalValue)) {
            info_en.push(info_enValue); // Push string info_en
            total.push(totalValue); // Push numeric
          }
        });

        // Dispatch the formatted data to Redux store
        dispatch(setChartRepairingMethod({ info_en, total }));
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };

// Gọi API  REPAIRING QUEUE
export const fetchTableRepairingStatus =
  (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true

    try {
      const response = await axios.post(
        `http://192.168.30.245:8989/downtime/RepairingStatus`,
        {
          factory,
          floor,
          line,
          section,
          dates,
          datee,
          lang,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if response contains the expected data format
      if (response.data && Array.isArray(response.data.data)) {
        const rawData = response.data.data;

        // Initialize arrays to store formatted data
        const Name_en = [];
        const request = [];
        const waiting = [];
        const repairing = [];
        const done = []; // number
        const floors = [];

        rawData.forEach((item) => {
          const {
            Name_en: name,
            request: req,
            waiting: wait,
            repairing: repai,
            done: don,
            floors: flo,
          } = item;
          floors.push(flo);
          Name_en.push(name);
          request.push(req); // Keep as string (e.g., "13:40:56")
          waiting.push(parseInt(wait?.replace(' min', ''), 10) || 0); // Extract numeric value
          repairing.push(repai || ''); // Handle null or empty values
          done.push(don || ''); // Handle null or empty values
        });

        // Dispatch the formatted data to Redux store
        dispatch(
          setTableRepairingStatus({
            Name_en,
            request,
            waiting,
            repairing,
            done,
            floors,
          })
        );
      } else {
        throw new Error('Invalid response format: No data or wrong structure');
      }

      dispatch(setLoading(false)); // End loading
    } catch (error) {
      dispatch(setLoading(false)); // End loading if error occurs
      dispatch(setError(error.toString())); // Dispatch the error message to Redux
      console.error('Error in fetching chart data:', error);
    }
  };
