import { Link, useLocation } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import {setSelectedItem} from "@/redux/SidebarSlice"

const Sidebar = ({setCollapsed,collapsed}) => {
  // const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [selectedKey, setSelectedKey] = useState(""); // Trạng thái để lưu key của mục được chọn

  const dispatch = useDispatch(); // Lấy dispatch từ Redux

  const handleItemClick = (item) => {
    setSelectedKey(item.key); // Đánh dấu mục được chọn
    dispatch(setSelectedItem(item.label)); // Cập nhật Redux Store với tên mục
  };

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
              label: "Daily KPI Overview",
              link: "/daily-kpi-overview",
            },
            {
              key: "1.1.2",
              label: "Daily Factory KPI",
              link: "/factory-kpi",
            },
            {
              key: "1.1.3",
              label: "Daily Efficiency Report",
              link: "/daily-efficiency",
            },
            {
              key: "1.1.4",
              label: "Prod.Hourly Output",
              link: "/production-hourly-output",
            },
            {
              key: "1.1.5",
              label: "Production Report",
              link: "/production-report/factory-day",
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
      link: "/kaizen",
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
      <Box key={item.key} sx={{
         border: "1px solid white",
      }}>
        <ListItem
          button
          component={item.link ? Link : undefined}
          to={item.link || undefined}
          onClick={() => {
            setSelectedKey(item.key); // Cập nhật selectedKey khi click vào item
            handleItemClick(item);
            if (!collapsed && item.children) toggleExpand(item.key);
          }}
          sx={{
            justifyContent: "flex-start",
            pl: 2 + level * 2,
            backgroundColor:
              selectedKey === item.key ? "#cdf2b4" : // Thêm màu nền cho mục được chọn
              level > 0 ? "rgba(218, 218, 218 , 0.7)" : "transparent",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {level === 0 && (
            <ListItemIcon
              sx={{
                minWidth: collapsed ? "auto" : "36px",
                justifyContent: "center",
                display: "flex",
                color: "#000", // Màu giống màu chữ
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
                    "invert(8%) sepia(15%) saturate(100%) hue-rotate(180deg) brightness(30%) contrast(150%)",
                }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            sx={{
              display: collapsed ? "none" : "block",
              paddingLeft: "10px",
              color: "#000",
              fontWeight: "bold",
            }}
          />
          {!collapsed &&
            item.children &&
            (expanded[item.key] ? (
              <ExpandLessIcon sx={{ color: "#000" }} /> // Màu chữ
            ) : (
              <ExpandMoreIcon sx={{ color: "#000" }} /> // Màu chữ
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
          backgroundColor: "#fff",
          fontWeight: "bold",
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
              color: "#000",
              fontFamily: "'Roboto', sans-serif", // Font chữ đẹp và phổ biến
              textShadow: "2px 2px 4px rgba(218, 218, 218, 1)", // Bóng chữ nhẹ
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
            color: "#000",
          }}
        >
          {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
