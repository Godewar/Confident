import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  CircularProgress,
  Rating,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getUserById, getDriverDetails } from '../../api/menu';

const DriverProfile = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [driver, setDriver] = useState(null);
  const [driverBookings, setDriverBookings] = useState([]);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(driverId);
        if (response.success && response.user) {
          setDriver(response.user);
          const bookingsResponse = await getDriverDetails(driverId);
          setDriverBookings(bookingsResponse.bookings || []);
        }
      } catch (error) {
        console.error('Error fetching driver data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [driverId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h3">Driver Profile</Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={driver?.photo}
                alt={driver?.name}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h4" gutterBottom>{driver?.name}</Typography>
              <Rating value={driver?.rating || 0} readOnly precision={0.5} sx={{ mb: 1 }} />
              <Chip 
                label={driver?.status} 
                color={driver?.status === 'Active' ? 'success' : 'warning'}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Driver Information</Typography>
              <List>
                <ListItem divider>
                  <ListItemText primary="Driver ID" secondary={driver?._id} />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Mobile" secondary={driver?.number} />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Email" secondary={driver?.email} />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Vehicle Type" secondary={driver?.vehicleType} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="License Number" secondary={driver?.licenseNumber} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs 
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <Tab icon={<PersonIcon />} label="Overview" />
              <Tab icon={<DirectionsCarIcon />} label="Bookings" />
              <Tab icon={<DescriptionIcon />} label="Documents" />
              <Tab icon={<AccountBalanceWalletIcon />} label="Earnings" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Overview Tab */}
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Personal Details</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" sx={{ width: '30%' }}>Full Name</TableCell>
                            <TableCell>{driver?.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Address</TableCell>
                            <TableCell>{driver?.address || 'N/A'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">City</TableCell>
                            <TableCell>{driver?.city || 'N/A'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Aadhar Number</TableCell>
                            <TableCell>{driver?.aadharNumber || 'N/A'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">PAN Number</TableCell>
                            <TableCell>{driver?.panNumber || 'N/A'}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Vehicle Information</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" sx={{ width: '30%' }}>Vehicle Type</TableCell>
                            <TableCell>{driver?.vehicleType || 'N/A'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Vehicle Number</TableCell>
                            <TableCell>{driver?.vehicleNumber || 'N/A'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Vehicle Model</TableCell>
                            <TableCell>{driver?.vehicleModel || 'N/A'}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              )}

              {/* Bookings Tab */}
              {activeTab === 1 && (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Booking ID</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Pickup</b></TableCell>
                        <TableCell><b>Drop</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {driverBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">No bookings found</TableCell>
                        </TableRow>
                      ) : (
                        driverBookings.map((booking) => (
                          <TableRow key={booking._id}>
                            <TableCell>{booking._id}</TableCell>
                            <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                            <TableCell>{booking.pickupAddress}</TableCell>
                            <TableCell>{booking.dropAddress}</TableCell>
                            <TableCell>
                              <Chip 
                                label={booking.isFinished ? 'Completed' : 'Active'} 
                                color={booking.isFinished ? 'success' : 'primary'} 
                                size="small" 
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Documents Tab */}
              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>License</Typography>
                        <Box sx={{ p: 2, border: '1px dashed grey', borderRadius: 1 }}>
                          {driver?.documents?.license ? (
                            <img 
                              src={driver.documents.license} 
                              alt="License" 
                              style={{ width: '100%', height: 'auto' }}
                            />
                          ) : (
                            <Typography color="textSecondary">No license document uploaded</Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Aadhar Card</Typography>
                        <Box sx={{ p: 2, border: '1px dashed grey', borderRadius: 1 }}>
                          {driver?.documents?.aadhar ? (
                            <img 
                              src={driver.documents.aadhar} 
                              alt="Aadhar" 
                              style={{ width: '100%', height: 'auto' }}
                            />
                          ) : (
                            <Typography color="textSecondary">No Aadhar document uploaded</Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Earnings Tab */}
              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Earnings Overview</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                              <Typography variant="h6" color="white">Total Earnings</Typography>
                              <Typography variant="h4" color="white">
                                ₹{driver?.earnings?.total || 0}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                              <Typography variant="h6" color="white">This Month</Typography>
                              <Typography variant="h4" color="white">
                                ₹{driver?.earnings?.monthly || 0}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                              <Typography variant="h6" color="white">Today</Typography>
                              <Typography variant="h4" color="white">
                                ₹{driver?.earnings?.today || 0}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverProfile;