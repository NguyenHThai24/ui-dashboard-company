import { useEffect, useState } from 'react';
import { fetchShoeData } from '@/apis/factory_kpi_api/FactoryLineAssemblyAPI';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Box,
  CircularProgress,
} from '@mui/material';

const ModelRunByLine = ({ date, floor, line }) => {
  const [shoeData, setShoeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!date || !floor || !line) return;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchShoeData(date, floor, line);
        const shoes = data.data.floorData[0]?.shoesData || [];
        setShoeData(shoes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, [date, floor, line]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const shoesPerPage = 1;
  const startIndex = (page - 1) * shoesPerPage;
  const currentShoes = shoeData.slice(startIndex, startIndex + shoesPerPage);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
          marginBottom: 2,
        }}
      >
        Model Run By Line
      </Typography>

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
        <Typography variant="h8" sx={{ textAlign: 'center', color: 'red' }}>
          No data found
        </Typography>
      ) : currentShoes.length === 0 ? (
        <Typography variant="h8" sx={{ textAlign: 'center', color: 'red' }}>
          No shoes found
        </Typography>
      ) : (
        currentShoes.map((shoe, index) => (
          <Card
            key={index}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{ maxHeight: '80px', objectFit: 'contain' }}
              image={shoe.img}
              alt={shoe.shoesName}
            />
            <CardContent sx={{ padding: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', paddingBottom: '5px' }}
              >
                {shoe.shoesName}
              </Typography>
              <div className="grid grid-row-2 gap-2 justify-items-start">
                <Typography variant="body2">
                  Article: <span className="font-semibold">{shoe.article}</span>
                </Typography>
                <div className="flex">
                  <Typography variant="body2">
                    Labor Count:{' '}
                    <span className="font-semibold">
                      {(
                        shoe.realStitchingLcValues + shoe.realAssemblyLcValues
                      ).toFixed(2)}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ px: 2 }}>
                    (A:{' '}
                    <span className="font-semibold">
                      {shoe.realAssemblyLcValues}
                    </span>
                    )
                  </Typography>
                  <Typography variant="body2">
                    (S:{' '}
                    <span className="font-semibold">
                      {shoe.realStitchingLcValues}
                    </span>
                    )
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {shoeData.length > 1 && (
        <Pagination
          count={Math.ceil(shoeData.length / shoesPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ marginTop: 2, alignSelf: 'center' }}
        />
      )}
    </Box>
  );
};

export default ModelRunByLine;
