import { Button, ButtonGroup } from '@mui/material';
import { useTranslations } from '@/config/useTranslations';

const ButtonCuttingFitting = ({ selectedState, onSelectionChange }) => {
  const t = useTranslations();

  const handleSelectionChange = (selection) => {
    onSelectionChange(selection); // Truyền trạng thái mới lên cha
  };

  return (
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
          backgroundColor: selectedState === 'cutting' ? '#049962' : 'white',
          color: selectedState === 'cutting' ? 'white' : '#049962',
          fontWeight: 'bold',
        }}
        onClick={() => handleSelectionChange('cutting')}
      >
        {t['Auto Cutting']}
      </Button>
      <Button
        sx={{
          backgroundColor: selectedState === 'fitting' ? '#049962' : 'white',
          color: selectedState === 'fitting' ? 'white' : '#049962',
          fontWeight: 'bold',
        }}
        onClick={() => handleSelectionChange('fitting')}
      >
        {t['Stock Fitting']}
      </Button>
    </ButtonGroup>
  );
};

export default ButtonCuttingFitting;
