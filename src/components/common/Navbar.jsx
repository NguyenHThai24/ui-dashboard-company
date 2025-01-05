import {  Grid } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "@/config/useTranslations";
import { useSelector } from "react-redux";

const Navbar = () => {
  const language = useSelector((state) => state.language.language);
  const translations = useTranslations(language);
  console.log(translations);
  
  return (
    <Grid container sx={{ py: 1, px: 2 }}>
      <Grid item xs={10}>
        <h1 className="font-bold text-5xl text-green-700">
        {/* {translations["LHG"] } */}
        LHG
        </h1>
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
