import { Link } from 'react-router-dom';
import { useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import iconProduction from '@public/images/Icon-Production.png';
import iconMaterial from '@public/images/Icon-Material.png';
import iconAutoCutting from '@public/images/Icon-Auto-Cutting.png';
import iconStockFitting from '@public/images/Icon-StockFitting.png';
import iconFG from '@public/images/Icon-FG.png';
import iconKaizen from '@public/images/Icon-Kaizen.png';
import iconTierMeeting from '@public/images/Icon-Tier-Meeting.png';
import iconDownTime from '@public/images/Icon-Down-Time.png';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '@/redux/SidebarSlice';
import { useTranslations } from '@/config/useTranslations';

const Sidebar = ({ setCollapsed, collapsed }) => {
  const [expanded, setExpanded] = useState({});
  const [selectedKey, setSelectedKey] = useState('');
  const dispatch = useDispatch();
  const translations = useTranslations();

  const handleItemClick = (item) => {
    setSelectedKey(item.key);
    dispatch(setSelectedItem(item.label));
  };

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    {
      key: '1',
      label: translations['PRODUCTION'],
      icon: iconProduction,
      children: [
        {
          key: '1.1',
          label: translations['FACTORY'],
          children: [
            {
              key: '1.1.1',
              label: translations['Daily KPI Overview'],
              link: '/daily-kpi-overview',
            },
            {
              key: '1.1.2',
              label: translations['Daily Factory KPI'],
              link: '/factory-kpi',
            },
            {
              key: '1.1.3',
              label: translations['Daily Efficiency Report'],
              link: '/daily-efficiency',
            },
            {
              key: '1.1.4',
              label: translations['Production Hourly Output'],
              link: '/production-hourly-output',
            },
            {
              key: '1.1.5',
              label: translations['Production Report'],
              link: '/production-report',
            },
          ],
        },
      ],
    },
    {
      key: '2',
      label: translations['Material W/H'],
      icon: iconMaterial,
      link: '/',
    },
    {
      key: '3',
      label: translations['Auto Cutting'],
      icon: iconAutoCutting,
      link: '/auto-cutting',
    },
    {
      key: '4',
      label: translations['Stock Fitting'],
      icon: iconStockFitting,
      link: '/',
    },
    { key: '5', label: translations['FG W/H'], icon: iconFG, link: '/' },
    {
      key: '6',
      label: translations['Kaizen'],
      icon: iconKaizen,
      link: '/kaizen',
    },
    {
      key: '7',
      label: translations['Tier Meeting'],
      icon: iconTierMeeting,
      link: '/',
    },
    {
      key: '8',
      label: translations['Down Time'],
      icon: iconDownTime,
      link: '/down-time',
    },
  ];

  const renderMenuItems = (menuItems, level = 0) =>
    menuItems.map((item) => (
      <Box key={item.key}>
        <ListItem
          button
          component={item.link ? Link : undefined}
          to={item.link || undefined}
          onClick={() => {
            handleItemClick(item);
            if (item.children) toggleExpand(item.key);
          }}
          sx={{
            pl: 2 + level * 2,
            backgroundColor:
              selectedKey === item.key
                ? '#2cc7a8'
                : level > 0
                  ? 'rgba(14, 114, 95, 1)'
                  : '#239d85',
            color: '#fff',
          }}
        >
          {level === 0 && (
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : '36px' }}>
              <Box
                component="img"
                src={item.icon}
                alt={item.label}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            sx={{ display: collapsed ? 'none' : 'block', paddingLeft: '10px' }}
          />
          {!collapsed &&
            item.children &&
            (expanded[item.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
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
      sx={{
        width: collapsed ? 72 : 250,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 72 : 250,
          backgroundColor: '#239d85',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ overflowY: collapsed ? 'hidden' : 'auto', height: '100%' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={collapsed ? 'center' : 'flex-start'}
          px={2}
          py={2}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '22px',
              color: '#fff',
              py: 0.5,
            }}
          >
            {collapsed ? 'LHG' : 'LHG DASHBOARD'}
          </Typography>
        </Box>
        <Divider />
        <List>{renderMenuItems(items)}</List>
      </Box>
      <Box py={1} sx={{ borderTop: '2px solid #e6e7f2', textAlign: 'center' }}>
        <IconButton
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{ color: '#fff' }}
        >
          {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
