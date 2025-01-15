import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const ButtonCuttingFitting = ({ onSelectionChange }) => {
  const [selectedCutting, setSelectedCutting] = useState('');

  const handleSelectionChange = (selection) => {
    setSelectedCutting(selection);
    onSelectionChange(selection); // Truyền trạng thái mới lên cha
  };

  return (
    <>
      <ButtonGroup
        sx={{
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: '10px',
          fontSize: '13px',
          backgroundColor: '#049962',
          py: '2px',
          px: '2px',
        }}
      >
        <Button
          sx={{
            backgroundColor:
              selectedCutting === 'cutting' ? '#049962' : 'white',
            color: selectedCutting === 'cutting' ? 'white' : '#049962',
            fontWeight: 'bold',
          }}
          onClick={() => handleSelectionChange('cutting')}
        >
          Auto Cutting
        </Button>
        <Button
          sx={{
            backgroundColor:
              selectedCutting === 'fitting' ? '#049962' : 'white',
            color: selectedCutting === 'fitting' ? 'white' : '#049962',
            fontWeight: 'bold',
          }}
          onClick={() => handleSelectionChange('fitting')}
        >
          Stock Fitting
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonCuttingFitting;
