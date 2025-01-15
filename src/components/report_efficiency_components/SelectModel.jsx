import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const SelectModel = () => {
  const [name, setName] = useState('all'); // Default to "All"

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="flex item-center my-4">
      <Typography variant="h6" sx={{ mr: 2, fontWeight: 'bold' }}>
        Model Name:
      </Typography>
      <Box sx={{ minWidth: 320 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            onChange={handleChange}
            sx={{
              height: 40, // Height
              width: 320, // Width
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={10}>Model 1</MenuItem>
            <MenuItem value={20}>Model 2</MenuItem>
            <MenuItem value={30}>Model 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectModel;
