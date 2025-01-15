import { Button, ButtonGroup, Card } from '@mui/material';
import { useState } from 'react';

const KaizenPage = ({ onSelectionChange }) => {
  const [selectedAssembly, setSelectedAssembly] = useState('assembly');

  const handleSelectionChange = (selection) => {
    setSelectedAssembly(selection);
    onSelectionChange(selection); // Truyền trạng thái mới lên cha
  };

  return (
    <Card sx={{ borderRadius: 2, my: 2, p: 2 }}>
      <div className="flex">
        <h1 className="font-bold text-base text-green-500">
          KAIZEN IMPROVEMENT BY MODEL
        </h1>
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
            LHG
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
            LVL
          </Button>
        </ButtonGroup>
      </div>
      <p className="text-center text-red-600">Chưa có dữ liệu</p>
    </Card>
  );
};

export default KaizenPage;
