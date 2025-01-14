import {  Grid, Typography } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "@/config/useTranslations";
import { useSelector } from "react-redux";

const Navbar = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const language = useSelector((state) => state.language.language);
  const translations = useTranslations(language);
  
  return (
    <Grid container sx={{  px: 2, backgroundColor: "rgba(221, 255, 93, 0.08)",
        border: "none"}}
    >
      <Grid item xs={10}>
        <Typography sx={{fontSize: "36px", color:"#239d85", fontWeight: 600}} >
        {/* {translations["LHG"] }*/} LHG {selectedItem && `- ${selectedItem}`} 
        </Typography>
      </Grid>

      <Grid
        item
        xs={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <LanguageSelector />
      </Grid>
    </Grid>
  );
};

export default Navbar;
