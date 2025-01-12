import axios from "axios";


import { setLoading, setError, setChartData, setChartDataFixed, setChartRepairingTime,setChartMostDowntime,setChartMostBreakdown  } from '@/redux/downTimeSlice';

//Gọi API cho Card Total Breakdown
export const fetchTotalBreakdown = async (factory, floor, line, section, dates, datee) => {
  try {
    const response = await axios.post("http://192.168.30.245:8989/downtime/TotalBreakdown", {
      factory,
      floor,
      line,
      section,
      dates,
      datee,
    });
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0].total;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};


// gọi api cho Card Total Machine downtime (min)
export const fetchTotalMachineDownTime = async (factory, floor, line, section, dates, datee) => {
    try {
      const response = await axios.post("http://192.168.30.245:8989/downtime/TotalMachineDowntime", {
        factory,
        floor,
        line,
        section,
        dates,
        datee,
      });
      if (response.status === 200 && response.data.data.length > 0) {
        return response.data.data[0].total;
        
      } else {
        throw new Error("No data available");
      }      
    } catch (error) {
      throw new Error(error.message || "Failed to fetch data");
    }
  };
  

//Gọi API cho Card Repairing time (min)
export const fetchTotalRepairingTime = async (factory, floor, line, section, dates, datee) => {
  try {
    const response = await axios.post("http://192.168.30.245:8989/downtime/TotalRepairTimeOfMechanic", {
      factory,
      floor,
      line,
      section,
      dates,
      datee,
    });
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0].total;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

// Goi API bieu do MACHINE BREAKDOWN BY LINE (COUNT)
export const fetchChartDataBreakdown = (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
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
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response.data); // Check response structure in the console

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
    console.error("Error in fetching chart data:", error);
  }
};

// Gọi API biểu đồ MACHINE DOWNTIME BY LINE (MIN)
export const fetchChartDataFixed = (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
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
      { headers: { "Content-Type": "application/json" } }
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
    console.error("Error in fetching chart data:", error);
  }
};

// Gọi API biểu đồ MECHANIC REPAIRING TIME (MIN)
export const fetchChartRepairingTime = (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
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
      { headers: { "Content-Type": "application/json" } }
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
        const waitingTimeValue  = parseFloat(item.waitingTime)

        if (!isNaN(repairingTimeValue) && !isNaN(waitingTimeValue)) {
          name.push(nameValueFixed); // Push string name
          waitingTime.push(waitingTimeValue); // Push numeric 
          repairingTime.push(repairingTimeValue)
        }
      });

      // Dispatch the formatted data to Redux store
      dispatch(setChartRepairingTime({ name, waitingTime,repairingTime  }));
    } else {
      throw new Error('Invalid response format: No data or wrong structure');
    }

    dispatch(setLoading(false)); // End loading
  } catch (error) {
    dispatch(setLoading(false)); // End loading if error occurs
    dispatch(setError(error.toString())); // Dispatch the error message to Redux
    console.error("Error in fetching chart data:", error);
  }
};


// Gọi API biểu đồ MOST DOWNTIME BY MACHINE TYPE (MIN)
export const fetchChartMostDowntime = (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
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
      { headers: { "Content-Type": "application/json" } }
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
      dispatch(setChartMostDowntime({ Name_en, total  }));
    } else {
      throw new Error('Invalid response format: No data or wrong structure');
    }

    dispatch(setLoading(false)); // End loading
  } catch (error) {
    dispatch(setLoading(false)); // End loading if error occurs
    dispatch(setError(error.toString())); // Dispatch the error message to Redux
    console.error("Error in fetching chart data:", error);
  }
};


// Gọi API biểu đồ MOST BREAKDOWN BY MACHINE TYPE (COUNT)
export const fetchChartMostBreakdown = (factory, floor, line, section, dates, datee, lang) => async (dispatch) => {
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
      { headers: { "Content-Type": "application/json" } }
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
      dispatch(setChartMostBreakdown({ Name_en, total  }));
    } else {
      throw new Error('Invalid response format: No data or wrong structure');
    }

    dispatch(setLoading(false)); // End loading
  } catch (error) {
    dispatch(setLoading(false)); // End loading if error occurs
    dispatch(setError(error.toString())); // Dispatch the error message to Redux
    console.error("Error in fetching chart data:", error);
  }
};