import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '@/redux/languageSlice';
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import enFlag from '@public/images/English.png';
import viFlag from '@public/images/VN.png';
import myanmarFlag from '@public/images/flag-myanmar.png';
import taiwanFlag from '../../../public/images/flag-taiwan.png';

const LanguageSelector = () => {
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  //console.log(language);

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage)); // Cập nhật Redux và Cookies
    setAnchorEl(null);
  };

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'en':
        return 'English';
      case 'vi':
        return 'Việt Nam';
      case 'myanmar':
        return 'Myanmar';
      case 'taiwan':
        return 'Taiwan';
      default:
        return 'Language';
    }
  };

  const getLanguageFlag = (lang) => {
    switch (lang) {
      case 'en':
        return <img src={enFlag} alt="English Flag" className="w-5" />;
      case 'vi':
        return <img src={viFlag} alt="Vietnam Flag" className="w-5" />;
      case 'myanmar':
        return <img src={myanmarFlag} alt="Myanmar Flag" className="w-5" />;
      case 'taiwan':
        return <img src={taiwanFlag} alt="Taiwan Flag" className="w-5" />;
      default:
        return <LanguageIcon />;
    }
  };

  return (
    <div
      className="flex items-center justify-center text-center border-4 w-40 rounded-lg"
      style={{ borderColor: '#fff', borderBottom: '10px' }}
    >
      <IconButton onClick={toggleMenu} color="primary">
        {getLanguageFlag(language)}
        <Typography
          variant="body2"
          style={{
            marginLeft: 8,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          {getLanguageLabel(language)}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: 0.5,
        }}
      >
        <MenuItem onClick={() => handleLanguageChange('vi')}>
          <img
            src={viFlag}
            alt="Vietnam Flag"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          Vietnamese
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('taiwan')}>
          <img
            src={taiwanFlag}
            alt="Taiwal Flag"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          Taiwan
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <img
            src={enFlag}
            alt="English Flag"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          English
        </MenuItem>

        <MenuItem onClick={() => handleLanguageChange('myanmar')}>
          <img
            src={myanmarFlag}
            alt="Myanmar Flag"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          Myanmar
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
