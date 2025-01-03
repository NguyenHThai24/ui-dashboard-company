import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/languageSlice";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import enFlag from "@public/images/English.png";
import viFlag from "@public/images/VN.png";

const LanguageSelector = () => {
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage)); // Cập nhật ngôn ngữ trong Redux
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
      case "en":
        return "English";
      case "vi":
        return "Việt Nam";
      default:
        return "Language";
    }
  };

  const getLanguageFlag = (lang) => {
    switch (lang) {
      case "en":
        return <img src={enFlag} alt="Flag English" className="w-5" />;
      case "vi":
        return <img src={viFlag} alt="Flag VietNam" className="w-5" />;
      default:
        return <LanguageIcon />;
    }
  };

  return (
    <div className="flex justify-center items-center border-2 w-32 rounded-lg border-green-900">
      <IconButton onClick={toggleMenu} color="primary">
        {getLanguageFlag(language)}
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {getLanguageLabel(language)}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ w: 40, mt: 1 }}
      >
        <MenuItem onClick={() => handleLanguageChange("en")}>
          <img
            src={enFlag}
            alt="Flag English"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("vi")}>
          <img
            src={viFlag}
            alt="Flag VietNam"
            className="w-5"
            style={{ marginRight: 8 }}
          />
          Việt Nam
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
