import { req } from '@/utils/request';

// Gọi API factory

export const fetchDistinctFloor = async () => {
  try {
    const response = await req.get('/getDistinctFloor');
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      console.error('Error fetching data:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// goi API cho component Attendance By Floor

export const fetchFloorDataS = async (date, factory) => {
  try {
    const response = await req.get(
      `/getFloorDataS?date=${date}&factory=${factory}`
    );
    if (response.data.status === 0) {
      return response.data.data.floorData.map((item) => ({
        lineAlias: item.lineAlias,
        assembly: item.worker.assembly,
        stitching: item.worker.stitching,
      }));
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Gọi API cho Card Top Line data

export const fetchStopLineDataS = async (date, factory) => {
  try {
    const response = await req.get(
      `/getFloorDataS?date=${date}&factory=${factory}`
    );
    if (response.data.status === 0) {
      const stopLineData = response.data.data.stopLineData || [];
      return {
        name: stopLineData.map((item) => item.line),
        time: stopLineData.map((item) => item.SL_NgungChuyen),
      };
    }
    return { name: [], time: [] };
  } catch (error) {
    throw new Error(error.message);
  }
};

// gọi api cho HourlyOutputByFloor

export const fetchHourlyFloorDataS = async (date, factory) => {
  try {
    const response = await req.get(
      `/getFloorDataS?date=${date}&factory=${factory}`
    );
    if (response.data.status === 0) {
      const floorData = response.data.data.floorData;
      const timePeriods = Array.from(
        new Set(floorData.flatMap((item) => Object.keys(item.actualAssembly)))
      );
      return {
        data: floorData,
        times: timePeriods,
      };
    }
    throw new Error('Failed to fetch data');
  } catch (error) {
    throw new Error(error.message);
  }
};

// Gọi API Output By Floor

export const fetchFloorOutputDataS = async (date, factory) => {
  try {
    const response = await req.get(
      `/getFloorDataS?date=${date}&factory=${factory}`
    );
    if (response.data.status === 0) {
      const floorData = response.data.data.floorData;

      const data = floorData.map((item) => ({
        totalActualAssembly: item.totalActualAssembly,
        lineAlias: item.lineAlias,
        targetAssembly: item.targetAssembly,
        unachieved: item.targetAssembly - item.totalActualAssembly, // Tính toán Unreach
      }));

      return data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Gọi API RFT By Floor

export const fetchRFTFloorDataS = async (date, factory) => {
  try {
    const response = await req.get(
      `/getFloorDataS?date=${date}&factory=${factory}`
    );
    if (response.data.status === 0) {
      return {
        floorData: response.data.data.floorData,
        baseline: response.data.data.baseline,
      };
    } else {
      throw new Error('API response status is not 0');
    }
  } catch (error) {
    throw new Error('Error fetching data from API: ' + error.message);
  }
};
