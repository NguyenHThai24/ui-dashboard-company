import { Grid, Typography } from '@mui/material';
import LanguageSelector from './LanguageSelector';
import { useTranslations } from '@/config/useTranslations';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const translations = useTranslations(); // Tự động lấy ngôn ngữ từ Redux

  const translatedSelectedItem =
    translations?.[selectedItem] || selectedItem || '';

  // Lấy giá trị dịch của selectedItem từ translations
  // const translatedSelectedItem = selectedItem
  //   ? translations[selectedItem]
  //   : selectedItem;
  return (
    <Grid
      container
      sx={{
        px: 2,
        py: 1.25,
        backgroundColor: '#239d85',
        borderBottom: '2px solid white',
      }}
    >
      <Grid item xs={10}>
        <Typography sx={{ fontSize: '36px', color: '#fff', fontWeight: 600 }}>
          {translations && translations['LHG']} {''}
          {translatedSelectedItem ? `- ${translatedSelectedItem}` : '- Welcome'}
        </Typography>
      </Grid>

      <Grid
        item
        xs={2}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <LanguageSelector />
      </Grid>
    </Grid>
  );
};

export default Navbar;
