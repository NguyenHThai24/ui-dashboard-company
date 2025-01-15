import {
  Button,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchDistinctFloor } from '@/apis/factory_kpi_api/FactoryAPI';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FloorLineList = ({ onFloorChange, onLineChange }) => {
  const [data, setData] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const floors = await fetchDistinctFloor();
      setData(floors);
    };

    fetchData();
  }, []);

  const handleFloorClick = (floorAlias) => {
    setSelectedFloor(floorAlias);
    const floor = data.find((item) => item.floorAlias === floorAlias);
    setLines(floor ? floor.lineList : []);
  };

  const handleSelect = (floorAlias) => {
    setSelectedFloor(floorAlias);
    handleFloorClick(floorAlias);
    if (onFloorChange) {
      onFloorChange(floorAlias);
    }
  };

  const handleSelectLine = (lineAlias) => {
    //console.log("Selected Line in FloorLineList:", lineAlias); // Debu
    setSelectedLine(lineAlias);
    if (onLineChange) {
      onLineChange(lineAlias);
    }
  };

  return (
    <>
      <Grid2 container spacing={1} sx={{ py: '5px' }}>
        <Grid2
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Grid2
            item
            xs={6}
            sx={{
              bgcolor: '#239d85',
              py: 0.5,
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '102px',
              height: '42px',
              borderRadius: '5px',
              fontSize: '13px',
            }}
          >
            <p style={{ color: 'white' }}>Factory</p>
            <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '15px' }} />
          </Grid2>
          <Grid2 item sx={{ width: '70px', height: '42px' }}>
            <Button
              sx={{
                bgcolor: '#239d85',
                color: 'white',
                width: '100%',
                height: '100%',
                borderRadius: '5px',
              }}
            >
              LHG
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* Floor rendering */}
      <Grid2 container spacing={1} alignItems="center">
        <Grid2
          item
          xs={6}
          sx={{
            bgcolor: '#239d85',
            py: 0.5,
            px: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '102px',
            height: '42px',
            borderRadius: '5px',
            fontSize: '13px',
          }}
        >
          <p style={{ color: 'white' }}>Floor</p>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '15px' }} />
        </Grid2>
        <Grid2
          item
          sx={{
            display: 'flex',
            alignItems: 'center', // Align items vertically in the center
            justifyContent: 'flex-start',
            py: '0px',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center', // Align buttons vertically with the title
            }}
          >
            {data?.map((floor) => (
              <ListItem
                key={floor.floorId}
                disablePadding
                sx={{ width: 'auto' }}
              >
                <ListItemButton
                  onClick={() => handleSelect(floor.floorAlias)}
                  sx={{
                    bgcolor:
                      selectedFloor === floor.floorAlias ? '#239d85' : 'white',
                    color:
                      selectedFloor === floor.floorAlias ? 'white' : 'black',
                    width: '80px',
                    height: '42px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    border: 2,
                    borderColor: '#239d85',
                    '&:hover': {
                      bgcolor: '#239d85', // Nền trắng
                      color: 'black', // Chữ đen
                      border: '2px solid white', // Viền màu xanh
                    },
                  }}
                >
                  <ListItemText primary={floor.floorAlias} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>

      {/* Line rendering */}
      <Grid2 container spacing={1} alignItems="center">
        <Grid2
          item
          xs={6}
          sx={{
            bgcolor: '#239d85',
            py: 0.5,
            px: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '102px',
            height: '42px',
            borderRadius: '5px',
            fontSize: '13px',
          }}
        >
          <p style={{ color: 'white' }}>Line</p>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '15px' }} />
        </Grid2>
        <Grid2
          item
          sx={{
            display: 'flex',
            alignItems: 'center', // Align items vertically in the center
            justifyContent: 'flex-start',
            gap: '10px',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center', // Align buttons vertically with the title
            }}
          >
            {lines?.map((line, index) => (
              <ListItem key={index} disablePadding sx={{ width: 'auto' }}>
                <ListItemButton
                  onClick={() => handleSelectLine(line.lineAlias)}
                  sx={{
                    bgcolor:
                      selectedLine === line.lineAlias ? '#239d85' : 'white',
                    color: selectedLine === line.lineAlias ? 'white' : 'black',
                    width: '80px',
                    height: '42px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    border: 2,
                    borderColor: '#239d85',
                    '&:hover': {
                      bgcolor: '#239d85', // Nền trắng
                      color: 'black', // Chữ đen
                      border: '2px solid white', // Viền màu xanh
                    },
                  }}
                >
                  <ListItemText primary={line.lineAlias} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FloorLineList;
