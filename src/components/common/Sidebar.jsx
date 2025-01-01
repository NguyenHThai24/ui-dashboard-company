import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import iconProduction from "@public/images/Icon-Production.png";
import iconMaterial from "@public/images/Icon-Material.png";
import iconAutoCutting from "@public/images/Icon-Auto-Cutting.png";
import iconStockFitting from "@public/images/Icon-StockFitting.png";
import iconFG from "@public/images/Icon-FG.png";
import iconKaizen from "@public/images/Icon-Kaizen.png";
import iconTierMeeting from "@public/images/Icon-Tier-Meeting.png";
import iconDownTime from "@public/images/Icon-Down-Time.png";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      if (!prev) {
        setExpanded({});
      }
      return !prev;
    });
  };

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "1",
      label: "Production",
      icon: iconProduction,
      link: "",
      children: [
        {
          key: "1.1",
          label: "FACTORY",
          link: "",
          children: [
            {
              key: "1.1.1",
              label: "Item 1.1.1",
              link: "/production/item1/item-1-1",
            },
            {
              key: "1.1.1",
              label: <Link to="/factory-kpi">Daily Factory KPI</Link>,
            },
            {
              key: "1.1.1",
              label: "Item 1.1.1",
              link: "/production/item1/item-1-1",
            },
            {
              key: "1.1.1",
              label: "Item 1.1.1",
              link: "/production/item1/item-1-1",
            },
            {
              key: "1.1.1",
              label: <Link to="/production-report-day">Production Report</Link>,
            },
          ],
        },
      ],
    },
    {
      key: "2",
      label: "Material W?H",
      icon: iconMaterial,
      link: "/",
    },
    {
      key: "3",
      label: "Auto Cutting",
      icon: iconAutoCutting,
      link: "/",
    },
    {
      key: "4",
      label: "Stock Fitting",
      icon: iconStockFitting,
      link: "/",
    },
    {
      key: "5",
      label: "FG W/H",
      icon: iconFG,
      link: "/",
    },
    {
      key: "6",
      label: "Kaizen",
      icon: iconKaizen,
      link: "/",
    },
    {
      key: "7",
      label: "Tier Meeting",
      icon: iconTierMeeting,
      link: "/",
    },
    {
      key: "8",
      label: "Down Time",
      icon: iconDownTime,
      link: "/",
    },
  ];

  const renderMenuItems = (menuItems, level = 0) =>
    menuItems?.map((item) => (
      <Box key={item.key}>
        <ListItem
          button
          component={item.link ? Link : undefined}
          to={item.link || undefined}
          onClick={() => {
            if (!collapsed && item.children) toggleExpand(item.key);
          }}
          sx={{
            justifyContent: "flex-start",
            pl: 2 + level * 2,
            backgroundColor:
              level > 0 ? "rgba(230, 231, 242, 1)" : "transparent",
          }}
        >
          {level === 0 && (
            <ListItemIcon
              sx={{
                minWidth: collapsed ? "auto" : "36px",
                justifyContent: "center",
                display: "flex",
                color: "#020414", // Màu giống màu chữ
              }}
            >
              <Box
                component="img"
                src={item.icon}
                alt={item.label}
                sx={{
                  width: 30,
                  height: 30,
                  objectFit: "cover",
                  filter:
                    "invert(8%) sepia(15%) saturate(1000%) hue-rotate(180deg) brightness(50%) contrast(150%)",
                }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            sx={{
              display: collapsed ? "none" : "block",
              paddingLeft: "10px",
            }}
          />
          {!collapsed &&
            item.children &&
            (expanded[item.key] ? (
              <ExpandLessIcon sx={{ color: "#020414" }} /> // Màu chữ
            ) : (
              <ExpandMoreIcon sx={{ color: "#020414" }} /> // Màu chữ
            ))}
        </ListItem>
        {item.children && (
          <Collapse
            in={!collapsed && expanded[item.key]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {renderMenuItems(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </Box>
    ));

  return (
    <Drawer
      variant="permanent"
      open={!collapsed}
      sx={{
        width: collapsed ? 72 : 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 72 : 250,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          //color: "#141947",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden", // Ẩn thanh cuộn
        },
      }}
    >
      <Box
        sx={{
          overflowY: collapsed ? "hidden" : "auto", // Ẩn thanh cuộn khi thu nhỏ
          height: "100%",
        }}
      >
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={collapsed ? "center" : "flex-start"}
          px={!collapsed ? 2 : 1}
          py={2}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {collapsed ? "LHG" : "LHG DASHBOARD"}
          </Typography>
        </Box>
        <Divider />
        {/* Danh sách menu */}
        <List>{renderMenuItems(items)}</List>
      </Box>

      {/* Phần dưới cùng của Sidebar */}
      <Box
        py={1}
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={toggleCollapsed}
          sx={{
            color: "#020414",
          }}
        >
          {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
