import { Grid } from '@mui/material';

const Navbar = () => {
  return (
    <Grid container spacing={2} sx={{ py: 1 }}>
      <Grid item xs={10}>
        <h1 className='font-bold text-5xl text-green-700'>LHG</h1>
      </Grid>

      <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Language</h1>
      </Grid>
    </Grid>
  );
};

export default Navbar;
