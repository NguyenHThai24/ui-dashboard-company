import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const ButtonAssemblyStitching = ({ onSelectionChange }) => {
  const [selectedAssembly, setSelectedAssembly] = useState('assembly');

  const handleSelectionChange = (selection) => {
    setSelectedAssembly(selection);
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
          py: '1px',
          px: '2px',
        }}
      >
        <Button
          sx={{
            backgroundColor:
              selectedAssembly === 'assembly' ? '#049962' : 'white',
            color: selectedAssembly === 'assembly' ? 'white' : '#049962',
            fontWeight: 'bold',
          }}
          onClick={() => handleSelectionChange('assembly')}
        >
          Assembly
        </Button>
        <Button
          sx={{
            backgroundColor:
              selectedAssembly === 'stitching' ? '#049962' : 'white',
            color: selectedAssembly === 'stitching' ? 'white' : '#049962',
            fontWeight: 'bold',
          }}
          onClick={() => handleSelectionChange('stitching')}
        >
          Stitching
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonAssemblyStitching;
