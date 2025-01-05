import { Button, Grid2, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchDistinctFloor } from "@/apis/factory_kpi_api/FactoryAPI"

const FloorLineList = ({onFloorChange}) => {
  const [data, setData] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const floors = await fetchDistinctFloor();
      setData(floors);
    };

    fetchData();
  }, []);

  const handleFloorClick = (floorAlias) => {
    setSelectedFloor(floorAlias);
    const floor = data.find((item) => item.floorAlias === floorAlias);
    setLines(floor ? floor.lineList : []);
  };

  const handleSelect = (floorAlias) => {
    setSelectedFloor(floorAlias);
    handleFloorClick(floorAlias);
    if (onFloorChange) {
      onFloorChange(floorAlias);
    }
  };
  

  const handleSelectLine = (lineAlias) => {
    setSelectedLine(lineAlias);
  };

  return (
    <>
      <Grid2 container spacing={1} sx={{ pt: "10px" }}>
        <Grid2
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Grid2
            item
            xs={6}
            sx={{
              bgcolor: "#049962",
              py: 0.5,
              px: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "102px",
              height: "42px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            <p style={{ color: "white" }}>Factory</p>
            <ArrowForwardIosIcon sx={{ color: "white", fontSize: "15px" }} />
          </Grid2>
          <Grid2 item sx={{ width: "70px", height: "42px" }}>
            <Button
              sx={{
                bgcolor: "#049962",
                color: "white",
                width: "100%",
                height: "100%",
                borderRadius: "5px",
              }}
            >
              LHG
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>

      {/*floor*/}
      <Grid2 container spacing={2} sx={{ py: "10px" }}>
        <Grid2
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Grid2
            item
            xs={6}
            sx={{
              bgcolor: "#049962",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "102px",
              height: "42px",
              borderRadius: "5px",
              fontSize: "13px",
              padding: "0 12px", // Add padding for better text alignment
            }}
          >
            <p style={{ color: "white", margin: 0 }}>Floor</p>
            <ArrowForwardIosIcon sx={{ color: "white", fontSize: "15px" }} />
          </Grid2>
          <Grid2 item sx={{ display: "flex", alignItems: "center" }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "row", // Ensures items are in a row
                gap: "10px",
                padding: 0,
              }}
            >
              {data?.map((floor) => (
                <ListItem
                  key={floor.floorId}
                  disablePadding
                  sx={{ width: "auto" }} // Ensures item auto adjusts
                >
                  <ListItemButton
                    onClick={() => handleSelect(floor.floorAlias)}
                    sx={{
                      bgcolor:
                        selectedFloor === floor.floorAlias ? "#049962" : "gray",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "70px",
                      height: "42px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary={floor.floorAlias}
                      primaryTypographyProps={{
                        sx: {
                          textAlign: "center",
                          color:
                            selectedFloor === floor.floorAlias
                              ? "white"
                              : "inherit",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid2>
        </Grid2>
      </Grid2>

      {/*Line*/}
      <Grid2 container spacing={2}>
        <Grid2
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Grid2
            item
            xs={6}
            sx={{
              bgcolor: "#049962",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "102px",
              height: "42px",
              borderRadius: "5px",
              fontSize: "13px",
              padding: "0 12px",
            }}
          >
            <p style={{ color: "white", margin: 0 }}>Line</p>
            <ArrowForwardIosIcon sx={{ color: "white", fontSize: "15px" }} />
          </Grid2>
          <Grid2 item sx={{ display: "flex", alignItems: "center" }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                padding: 0,
              }}
            >
              {lines?.map((line, index) => (
                <ListItem key={index} disablePadding sx={{ width: "auto" }}>
                  <ListItemButton
                    onClick={() => handleSelectLine(line.lineAlias)}
                    sx={{
                      bgcolor:
                        selectedLine === line.lineAlias ? "#049962" : "gray",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "70px",
                      height: "42px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary={line.lineAlias}
                      primaryTypographyProps={{
                        sx: {
                          textAlign: "center",
                          color:
                            selectedLine === line.lineAlias
                              ? "white"
                              : "inherit",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FloorLineList;
