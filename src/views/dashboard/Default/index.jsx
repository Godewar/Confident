import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { gridSpacing } from 'store/constant';

const cardData = [
  {
    title: 'Total Customer',
    value: 1200,
    icon: <PeopleIcon fontSize="large" />, 
    color: '#1976d2',
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    tooltip: 'Total registered customers'
  },
  {
    title: 'Total Partner',
    value: 350,
    icon: <GroupAddIcon fontSize="large" />, 
    color: '#388e3c',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)',
    tooltip: 'Total partners on platform'
  },
  {
    title: 'Waiting for Approval',
    value: 18,
    icon: <HourglassTopIcon fontSize="large" />, 
    color: '#fbc02d',
    bg: 'linear-gradient(135deg, #fffde7 0%, #ffe082 100%)',
    tooltip: 'Partners/customers pending approval'
  },
  {
    title: 'Total Complete Ride',
    value: 980,
    icon: <DirectionsCarIcon fontSize="large" />, 
    color: '#0288d1',
    bg: 'linear-gradient(135deg, #e1f5fe 0%, #81d4fa 100%)',
    tooltip: 'Total rides completed'
  },
  {
    title: 'Today Earning',
    value: '₹5,200',
    icon: <MonetizationOnIcon fontSize="large" />, 
    color: '#43a047',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #b9f6ca 100%)',
    tooltip: 'Earnings for today'
  },
  {
    title: 'Weekly Earning',
    value: '₹32,000',
    icon: <CalendarViewWeekIcon fontSize="large" />, 
    color: '#6d4c41',
    bg: 'linear-gradient(135deg, #efebe9 0%, #bcaaa4 100%)',
    tooltip: 'Earnings for this week'
  },
  {
    title: 'Monthly Earning',
    value: '₹1,20,000',
    icon: <CalendarMonthIcon fontSize="large" />, 
    color: '#8e24aa',
    bg: 'linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%)',
    tooltip: 'Earnings for this month'
  },
  {
    title: 'Total Earning',
    value: '₹12,50,000',
    icon: <PaidIcon fontSize="large" />, 
    color: '#d84315',
    bg: 'linear-gradient(135deg, #fbe9e7 0%, #ffab91 100%)',
    tooltip: 'Total earnings on platform'
  },
  {
    title: 'Today Earning',
    value: '₹5,200',
    icon: <TrendingUpIcon fontSize="large" />, 
    color: '#1565c0',
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    tooltip: 'Today earning (repeat card for demo)'
  }
];

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { setLoading(false); }, []);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center" sx={{
      minHeight: '100vh',
      background: '#f7f9ff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Banner */}
      {/* <Grid item xs={12} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: '100%',
            borderRadius: 5,
            p: { xs: 3, md: 6 },
            background: 'linear-gradient(90deg, #1976d2 0%, #90caf9 100%)',
            color: 'white',
            boxShadow: '0 8px 32px 0 rgba(34, 139, 230, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 140,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '::after': {
              content: '""',
              position: 'absolute',
              top: '-30%',
              left: '-10%',
              width: '120%',
              height: '160%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(25,118,210,0.04) 100%)',
              zIndex: 1,
            },
          }}
        >
          <Box sx={{ mr: 4, display: { xs: 'none', md: 'block' }, zIndex: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 90, opacity: 0.18, color: '#fff' }} />
          </Box>
          <Box sx={{ zIndex: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, letterSpacing: 1, color: '#303030', fontSize: { xs: 28, md: 40 } }}>
              Welcome Ridodrop
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#303030', fontSize: { xs: 18, md: 28 } }}>
              Your all-in-one platform for smart logistics, real-time analytics, and seamless growth.
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.97, fontWeight: 500, color: '#303030', fontSize: { xs: 15, md: 22 } }}>
              Keep up the great work—track your stats, earnings, and more right here on your dashboard.
            </Typography>
          </Box>
        </Box>
      </Grid> */}
      {/* 9 Cards in 3x3 grid */}
      {[0, 1, 2].map(rowIdx => (
        <Grid container item xs={12} spacing={gridSpacing} key={rowIdx} justifyContent="center">
          {cardData.slice(rowIdx * 3, rowIdx * 3 + 3).map((card, idx) => (
            <Grid item xs={12} sm={4} md={4} key={card.title + idx} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  background: '#fff',
                  color: '#303030',
                  borderRadius: 4,
                  boxShadow: 6,
                  p: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.06)',
                    boxShadow: '0 8px 32px 0 rgba(34, 139, 230, 0.25)',
                    filter: 'brightness(1.08)',
                  },
                  minHeight: 140,
                  minWidth: 180,
                  maxWidth: 220,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'visible',
                  border: '2px solid #dfe7ff',
                }}
              >
                <CardContent sx={{ mt: 4, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Icon inside card */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: '#f7f9ff',
                      boxShadow: '0 2px 8px 0 rgba(34,139,230,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #f0f1f6',
                      filter: 'drop-shadow(0 1px 4px rgba(34, 139, 230, 0.08))',
                      mb: 1.5,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'transparent',
                        color: card.color,
                        width: 36,
                        height: 36,
                        fontSize: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#303030', letterSpacing: 0.5, fontSize: 18 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#303030', mb: 1, textShadow: '0 2px 8px rgba(34,139,230,0.08)', fontSize: 24 }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))}
      {/* Decorative wave divider */}
      <Grid item xs={12} sx={{ width: '100%', p: 0, m: 0 }}>
        <Box sx={{ width: '100%', overflow: 'hidden', lineHeight: 0, mb: -2 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 60, display: 'block' }}>
            <path fill="#38f9d7" fillOpacity="0.18" d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z" />
            <path fill="#43e97b" fillOpacity="0.12" d="M0,48 C480,0 960,80 1440,32 L1440,80 L0,80 Z" />
          </svg>
        </Box>
      </Grid>
    </Grid>
  );
}
