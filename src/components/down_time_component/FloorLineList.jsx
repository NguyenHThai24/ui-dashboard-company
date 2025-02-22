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
import { useTranslations } from '@/config/useTranslations';
import ButtonCuttingFitting from './ButtonCuttingFitting';

const FloorLineList = ({
  onFloorChange,
  onLineChange,
  onCuttingFittingChange,
}) => {
  const [data, setData] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lines, setLines] = useState([]);
  const [cuttingFittingState, setCuttingFittingState] = useState('');

  const t = useTranslations();

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
    setCuttingFittingState(''); // Reset Cutting/Fitting state
    handleFloorClick(floorAlias);
    if (onFloorChange) {
      onFloorChange(floorAlias);
    }
  };

  const handleCuttingFittingChange = (selection) => {
    setCuttingFittingState(selection); // Update local state
    setSelectedFloor(null); // Reset selectedFloor state
    if (onCuttingFittingChange) {
      onCuttingFittingChange(selection); // Pass the state to the parent
    }
  };

  const handleSelectLine = (lineAlias) => {
    setSelectedLine(lineAlias);
    if (onLineChange) {
      onLineChange(lineAlias);
    }
  };

  return (
    <>
      <Grid2 container spacing={1} sx={{ py: '5px' }}>
        {/* Factory and floor buttons */}
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
            <p style={{ color: 'white' }}>{t['FACTORY']}</p>
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
              {t['LHG']}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Floor rendering */}
      <Grid2 container spacing={1} alignItems="center" sx={{ my: -2 }}>
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
          <p style={{ color: 'white' }}>{t['Floor']}</p>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '15px' }} />
        </Grid2>
        <Grid2
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            py: '0px',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
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
                      bgcolor: '#239d85',
                      color: 'black',
                      border: '2px solid white',
                    },
                  }}
                >
                  <ListItemText primary={floor.floorAlias} />
                </ListItemButton>
              </ListItem>
            ))}
            <ButtonCuttingFitting
              onSelectionChange={handleCuttingFittingChange}
              selectedState={cuttingFittingState} // Truyền trạng thái hiện tại
            />
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
          <p style={{ color: 'white' }}>{t['Line']}</p>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '15px' }} />
        </Grid2>
        <Grid2
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
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
                      bgcolor: '#239d85',
                      color: 'black',
                      border: '2px solid white',
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
