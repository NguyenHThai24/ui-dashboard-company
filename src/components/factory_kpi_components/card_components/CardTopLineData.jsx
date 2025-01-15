import { Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

import { fetchStopLineDataS } from '@/apis/factory_kpi_api/FactoryAPI';
import { fetchStopLineData } from '@/apis/factory_kpi_api/FactoryFloorAPI';

const CardTopLineData = ({ date, floor }) => {
  const [stopTimeLine, setStopTimeLine] = useState([]);
  const [nameTimeLine, setNameTimeLine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (floor) {
          res = await fetchStopLineData(date.format('YYYY/MM/DD'), floor);
        } else {
          res = await fetchStopLineDataS(date.format('YYYY/MM/DD'), 'LHG');
        }
        setStopTimeLine(res.time);
        setNameTimeLine(res.name);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [date, floor]);

  return (
    <div className="bg-white p-1 rounded-xl shadow-md w-full border-4 border-red-600 ">
      <p
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#f10606',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          textAlign: 'center',
          borderBottom: '2px solid red',
        }}
      >
        Digital Andon Cases
      </p>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul
          className="grid grid-cols-2 gap-1 mt-2"
          style={{
            maxHeight: '100px',
            overflowY: 'auto',
            padding: '0 4px',
          }}
        >
          {stopTimeLine.map((time, index) => (
            <li key={index} className="text-sm">
              <strong>{nameTimeLine[index]}</strong>: {time} times
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardTopLineData;
