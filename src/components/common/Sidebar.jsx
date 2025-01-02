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
// import { useSelector } from "react-redux";
// import { useTranslations } from "@/config/useTranslations";

const Sidebar = ({ setSelectedItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({});

  // sử dụng language
  // const language = useSelector((state) => state.language.language);
  // const translations = useTranslations(language);

  // console.log(translations); // Xem log để kiểm tra dữ liệu ngôn ngữ

  // console.log("Importing language file:", `@/languages/${language}.json`);

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
      label: "Productions",
      icon: iconProduction,

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
              label: "Daily Factory KPI",
              link: "/factory-kpi",
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
              label: "Production Report",
              link: "/production-report-day"
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
              level > 0 ? "rgba(52, 113, 197 , 1)" : "transparent",
            color: "#ffffff",
            fontWeight: 900,
          }}
        >
          {level === 0 && (
            <ListItemIcon
              sx={{
                minWidth: collapsed ? "auto" : "36px",
                justifyContent: "center",
                display: "flex",
                color: "#ffffff", // Màu giống màu chữ
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
                    "invert(8%) sepia(15%) saturate(0%) hue-rotate(180deg) brightness(1000%) contrast(150%)",
                }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            sx={{
              display: collapsed ? "none" : "block",
              paddingLeft: "10px",
              color: "#ffffff",
              fontWeight: 900
            }}
          />
          {!collapsed &&
            item.children &&
            (expanded[item.key] ? (
              <ExpandLessIcon sx={{ color: "#ffffff" }} /> // Màu chữ
            ) : (
              <ExpandMoreIcon sx={{ color: "#ffffff" }} /> // Màu chữ
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
          backgroundColor: "#001e3a",
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
              color: "#ffffff",
              fontFamily: "'Roboto', sans-serif", // Font chữ đẹp và phổ biến
              textShadow: "2px 2px 4px rgba(245, 245, 245, 0.6)", // Bóng chữ nhẹ
              letterSpacing: "1.5px", // Tăng khoảng cách giữa các chữ cái
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
          borderTop: "2px solid rgba(230, 231, 242, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={toggleCollapsed}
          sx={{
            color: "#ffffff",
          }}
        >
          {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
