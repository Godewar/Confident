import React, { useState } from 'react';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Tabs, Tab } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const ManageRate = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', mt: 5 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 3, ml: 2 }}>
        Manage Price
          </Typography>
      <Box sx={{ display: 'flex', flex: 1, width: '100vw', justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Sidebar inside a single white card */}
        <Box sx={{ minWidth: 200, mr: 2, pt: 2 }}>
          <Box sx={{ bgcolor: 'white', boxShadow: 4, borderRadius: 3, p: 2, minWidth: 180 }}>
            <List sx={{ p: 0 }}>
                  <ListItemButton
                selected={true}
                onClick={() => navigate('/price/add/hourly/basis')}
                    sx={{
                      borderRadius: 1,
                  color: 'primary.main',
                  bgcolor: 'primary.lighter',
                  fontWeight: 700,
                  boxShadow: 2,
                      transition: 'all 0.2s',
                      minHeight: 40,
                      pl: 1.5,
                      pr: 1.5,
                      alignItems: 'center',
                    }}
                  >
                <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                  <AccessTimeIcon fontSize="medium" />
                    </ListItemIcon>
                <ListItemText primary="Hourly Basis" primaryTypographyProps={{ fontSize: 15 }} />
                  </ListItemButton>
            </List>
          </Box>
        </Box>
        {/* Main Content: Show Hourly Basis info */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: 4 }}>
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mb: 2, width: 80, height: 80, mx: 'auto' }}>
            <AccessTimeIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Hourly Basis
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Set price for Hourly Basis
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
              Price management for Hourly Basis will be available here.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageRate; 