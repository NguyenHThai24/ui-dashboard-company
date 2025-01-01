import { Button, Grid } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  return (
    <Grid container sx={{ py: 1, px: 2 }}>
      <Grid item xs={10}>
        <h1 className="font-bold text-5xl text-green-700">LHG</h1>
      </Grid>

      <Grid
        item
        xs={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          sx={{ borderColor: "black", color: "black" }}
        >
          <LanguageIcon /> <h1 className="pl-5">Language</h1>{" "}
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Navbar;
