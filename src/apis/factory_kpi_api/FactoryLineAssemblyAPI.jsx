import { req } from '../../utils/request';

// Gọi API Output By Line
export const fetchOuputLineData = async (date, floor) => {
  try {
    const response = await req.get(
      `/getFloorData?date=${date.format('YYYY-MM-DD')}&floor=${floor}`
    );

    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ', error);
  }
};

// Gọi api RFT By The Hour Line
export const fetchRFTLineData = async (date, floor) => {
  try {
    const response = await req.get(
      `/getFloorData?date=${date.format('YYYY-MM-DD')}&floor=${floor}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ', error);
  }
};

// Gọi API Model Run By Line
export const fetchShoeData = async (date, floor, line) => {
  try {
    const response = await req.get(
      `/getFloorData?date=${date.format('YYYY-MM-DD')}&floor=${floor}&line=${line}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};
