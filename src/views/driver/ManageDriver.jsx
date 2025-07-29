import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Tabs, Tab, Chip, CircularProgress, Snackbar, Alert, Grid, Card, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CancelIcon from '@mui/icons-material/Cancel';
import BarChartIcon from '@mui/icons-material/BarChart';
import BlockIcon from '@mui/icons-material/Block';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { GetAlluser, getAllOrderBookings, getUserById } from '../../api/menu';

const tabLabels = [
  'Profile Details',
  'Order Details',
  'Documents',
  'Data Analyze',
  'Block ID',
  'High Orders',
  'Wallet',
  'Refer And Earn',
  'Live Order'
];

const tabIcons = [
  <AccountCircleIcon fontSize="medium" />,
  <DirectionsCarIcon fontSize="medium" />,
  <DescriptionIcon fontSize="medium" />,
  <BarChartIcon fontSize="medium" />,
  <BlockIcon fontSize="medium" />,
  <TrendingUpIcon fontSize="medium" />,
  <AccountBalanceWalletIcon fontSize="medium" />,
  <GroupAddIcon fontSize="medium" />,
  <DescriptionIcon fontSize="medium" />
];

const ManageDriver = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [profileDetailsSearchTerm, setProfileDetailsSearchTerm] = useState('');
  const [orderDetailsSearchTerm, setOrderDetailsSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [formDriver, setFormDriver] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewDocDialog, setViewDocDialog] = useState({ open: false, title: '', src: '' });
  const [docSearchTerm, setDocSearchTerm] = useState('');
  const [docDateFilter, setDocDateFilter] = useState('all');
  const [docCustomStart, setDocCustomStart] = useState('');
  const [docCustomEnd, setDocCustomEnd] = useState('');
  const [dataAnalyzeSearchTerm, setDataAnalyzeSearchTerm] = useState('');
  const [blockIdSearchTerm, setBlockIdSearchTerm] = useState('');
  const [highOrderSearchTerm, setHighOrderSearchTerm] = useState('');
  const [walletSearchTerm, setWalletSearchTerm] = useState('');
  const [referralSearchTerm, setReferralSearchTerm] = useState('');
  const [openHighOrderDialog, setOpenHighOrderDialog] = useState(false);
  const [selectedHighOrderDriver, setSelectedHighOrderDriver] = useState(null);

  // Dummy data for highOrderData, walletData, referAndEarnData
  const highOrderData = [
    {
      serialNo: 1,
      driverId: 'DRV001',
      driverName: 'John Doe',
      orders: [
        {
          orderId: 'ORD1001', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
        },
        {
          orderId: 'ORD1002', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
        },
        {
          orderId: 'ORD1003', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
        }
      ]
    },
    {
      serialNo: 2,
      driverId: 'DRV002',
      driverName: 'Jane Smith',
      orders: [
        {
          orderId: 'ORD2001', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
        },
        {
          orderId: 'ORD2002', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
        }
      ]
    }
  ];
  const walletData = [
    {
      serialNo: 1,
      driverId: 'DRV001',
      driverName: 'John Doe',
      topUp: 5000,
      used: 3500,
      refund: 200,
      balance: 1700,
      lastTransaction: '2024-06-10'
    },
    {
      serialNo: 2,
      driverId: 'DRV002',
      driverName: 'Jane Smith',
      topUp: 3000,
      used: 2500,
      refund: 0,
      balance: 500,
      lastTransaction: '2024-06-09'
    },
    {
      serialNo: 3,
      driverId: 'DRV003',
      driverName: 'Amit Kumar',
      topUp: 4000,
      used: 4000,
      refund: 0,
      balance: 0,
      lastTransaction: '2024-06-11'
    },
    {
      serialNo: 4,
      driverId: 'DRV004',
      driverName: 'Priya Singh',
      topUp: 6000,
      used: 5000,
      refund: 300,
      balance: 1300,
      lastTransaction: '2024-06-08'
    },
    {
      serialNo: 5,
      driverId: 'DRV005',
      driverName: 'Rohit Sharma',
      topUp: 2000,
      used: 1500,
      refund: 0,
      balance: 500,
      lastTransaction: '2024-06-12'
    }
  ];
  const referAndEarnData = [
    {
      serialNo: 1,
      driverId: 'DRV001',
      driverName: 'John Doe',
      mobileNumber: '9876543210',
      city: 'Mumbai',
      referrerName: 'N/A',
      referrerId: 'N/A',
      earning: 0,
      referralDate: '2024-06-10',
      status: 'Active'
    },
    {
      serialNo: 2,
      driverId: 'DRV002',
      driverName: 'Jane Smith',
      mobileNumber: '9123456780',
      city: 'Delhi',
      referrerName: 'John Doe',
      referrerId: 'DRV001',
      earning: 200,
      referralDate: '2024-06-09',
      status: 'Active'
    },
    {
      serialNo: 3,
      driverId: 'DRV003',
      driverName: 'Amit Kumar',
      mobileNumber: '9988776655',
      city: 'Bangalore',
      referrerName: 'Jane Smith',
      referrerId: 'DRV002',
      earning: 150,
      referralDate: '2024-06-11',
      status: 'Active'
    },
    {
      serialNo: 4,
      driverId: 'DRV004',
      driverName: 'Priya Singh',
      mobileNumber: '9876512345',
      city: 'Chennai',
      referrerName: 'Amit Kumar',
      referrerId: 'DRV003',
      earning: 100,
      referralDate: '2024-06-08',
      status: 'Active'
    },
    {
      serialNo: 5,
      driverId: 'DRV005',
      driverName: 'Rohit Sharma',
      mobileNumber: '9123456790',
      city: 'Hyderabad',
      referrerName: 'Priya Singh',
      referrerId: 'DRV004',
      earning: 0,
      referralDate: '2024-06-12',
      status: 'Pending'
    }
  ];

  // Filter drivers based on search term
  const filteredProfileDetailsDrivers = drivers.filter(
    (driver) =>
      (driver.fullName || '').toLowerCase().includes((profileDetailsSearchTerm || '').toLowerCase()) ||
      (driver.driverId || '').toLowerCase().includes((profileDetailsSearchTerm || '').toLowerCase()) ||
      driver.altMobile.includes(profileDetailsSearchTerm)
  );

  const tripTypes = ['One Way', 'Two Way'];
  const [tripTypeTab, setTripTypeTab] = useState(0);

  // Handler for opening driver details dialog
  const handleOpenDialog = (driver) => {
    setSelectedDriver(driver);
    setOpenDialog(true);
  };

  // Handler for navigating to driver detail page using API
  const handleDriverClick = async (driver) => {
    try {
      const userId = driver._id || driver.driverId;
      const response = await getUserById(userId);
      if (response.success && response.user) {
        // Navigate to DriverDetail with the id parameter
        navigate(`/drivers/${userId}`, {
          state: { driver: response.user }
        });
      } else {
        throw new Error('Failed to fetch driver details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load driver details');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add/Edit form handlers
  const handleOpenForm = (mode, driver = {}) => {
    setFormMode(mode);
    setFormDriver(driver);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormDriver({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'add') {
      const newDriver = { ...formDriver, id: Date.now(), driverId: `DRV${String(Date.now()).slice(-3)}` };
      setDrivers((prev) => [...prev, newDriver]);
      setSnackbar({ open: true, message: 'Driver added successfully!', severity: 'success' });
    } else if (formMode === 'edit') {
      setDrivers((prev) => prev.map((d) => (d.id === formDriver.id ? formDriver : d)));
      setSnackbar({ open: true, message: 'Driver updated successfully!', severity: 'success' });
    }
    handleCloseForm();
  };

  // Delete handlers
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setDrivers((prev) => prev.filter((d) => d.id !== deleteId));
      setSnackbar({ open: true, message: 'Driver deleted successfully!', severity: 'info' });
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleVehicleTypeChange = (event, newValue) => {
    settripTypeTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  // Filtering logic for Documents tab
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const filteredDocDrivers = drivers.filter(driver => {
    // Search by name
    // if (docSearchTerm && !driver.fullName.toLowerCase().includes(docSearchTerm.toLowerCase())) {
      if (docSearchTerm && !(driver.name || '').toLowerCase().includes((docSearchTerm || '').toLowerCase())) {
      return false;
    }
    // Date filter
    const created = new Date(driver.createdAt);
    if (docDateFilter === 'today') {
      return created >= startOfToday;
    }
    if (docDateFilter === 'week') {
      return created >= startOfWeek;
    }
    if (docDateFilter === 'month') {
      return created >= startOfMonth;
    }
    if (docDateFilter === 'custom') {
      if (docCustomStart && created < new Date(docCustomStart)) return false;
      if (docCustomEnd && created > new Date(docCustomEnd)) return false;
    }
    return true;
  });

  // Helper function to calculate duration in years, months, days
  const getDurationString = (createdAt) => {
    const start = new Date(createdAt);
    const end = new Date();
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    let str = '';
    if (years > 0) str += years + (years === 1 ? ' year' : ' years');
    if (months > 0) str += (str ? ', ' : '') + months + (months === 1 ? ' month' : ' months');
    if (days > 0 || (!years && !months)) str += (str ? ', ' : '') + days + (days === 1 ? ' day' : ' days');
    return str;
  };

  // Filtered drivers for Block ID tab
  const filteredBlockIdDrivers = drivers.filter(
    (driver) =>
      (driver.fullName || '').toLowerCase().includes((blockIdSearchTerm || '').toLowerCase()) ||
      (driver.driverId || '').toLowerCase().includes((blockIdSearchTerm || '').toLowerCase())
  );

  // Filtered high order data for High Orders tab
  const filteredHighOrderData = highOrderData.filter(
    (highOrder) =>
      (highOrder.driverName || '').toLowerCase().includes((highOrderSearchTerm || '').toLowerCase()) ||
      (highOrder.driverId || '').toLowerCase().includes((highOrderSearchTerm || '').toLowerCase())
  );

  // Filtered wallet data for Wallet tab
  const filteredWalletData = walletData.filter(
    (wallet) =>
      (wallet.driverName || '').toLowerCase().includes((walletSearchTerm || '').toLowerCase()) ||
      (wallet.driverId || '').toLowerCase().includes((walletSearchTerm || '').toLowerCase())
  );

  // Filtered referral data for Refer And Earn tab
  const filteredReferralData = referAndEarnData.filter(
    (referral) =>
      (referral.driverName || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.driverId || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      referral.mobileNumber.includes(referralSearchTerm) ||
      (referral.city || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.referrerName || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.referrerId || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase())
  );

  // Fetch drivers from backend API on mount
  useEffect(() => {
    setLoading(true);
    GetAlluser()
      .then((data) => {
        let users = [];
        if (data && Array.isArray(data.users)) {
          users = data.users;
        } else if (data && Array.isArray(data.user)) {
          users = data.user;
        } else if (Array.isArray(data)) {
          users = data;
        } else {
          users = [];
        }
        const drivers = users.filter(user =>
          (user.role || '').toLowerCase() === 'driver' ||
          (user.userType || '').toLowerCase() === 'driver' ||
          (user.type || '').toLowerCase() === 'driver'
        );
        setDrivers(drivers);
      })
      .catch((err) => {
        console.error('Failed to fetch drivers:', err);
        setDrivers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoadingOrders(true);
    getAllOrderBookings()
      .then((data) => {
        let bookings = [];
        if (data && Array.isArray(data.bookings)) {
          bookings = data.bookings.map((booking) => ({
            orderId: booking._id,
            customerId: booking.userId,
            customerName: '', // If you have user name, map here
            tripType: booking.trip_type === 'oneWay' ? 'One Way' : 'Two Way',
            status: booking.isFinished === "true" ? 'Completed' : 'Pending',
            amount: '', // If you have amount, map here
            date: booking.bookingDate,
            pickup: booking.pickupAddress,
            drop: booking.dropAddress,
          }));
        }
        setOrderData(bookings);
      })
      .catch((err) => {
        console.error('Failed to fetch order bookings:', err);
        setOrderData([]);
      })
      .finally(() => setLoadingOrders(false));
  }, []);

  // Filtered order data for selected trip type
  const getFilteredOrderData = (tripType) => {
    return orderData.filter(
      (order) =>
        order.tripType === tripType &&
        (
          (order.customerName || '').toLowerCase().includes((orderDetailsSearchTerm || '').toLowerCase()) ||
          (order.customerId || '').toLowerCase().includes((orderDetailsSearchTerm || '').toLowerCase())
        )
    );
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 500, mt: 5 }}>
      <h1>Driver Management</h1>
      <Box sx={{ mb: 2 }}>
        <ArrowBackIcon onClick={() => navigate(-1)} color="primary" sx={{ cursor: 'pointer', fontSize: 28 }} />
      </Box>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Paper sx={{ minWidth: 200, borderRadius: 3, boxShadow: 3, mr: 2, p: 1, bgcolor: 'background.paper', height: 'fit-content' }}>
          <List sx={{ p: 0 }}>
            {tabLabels.map((label, idx) => (
              <ListItemButton
                key={label}
                selected={tab === idx}
                onClick={() => setTab(idx)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: tab === idx ? 'primary.main' : 'text.primary',
                  bgcolor: tab === idx ? 'primary.lighter' : 'transparent',
                  fontWeight: tab === idx ? 700 : 400,
                  boxShadow: tab === idx ? 2 : 0,
                  transition: 'all 0.2s',
                  minHeight: 36,
                  pl: 1.5,
                  pr: 1.5
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: tab === idx ? 'primary.main' : 'grey.500' }}>
                  {tabIcons[idx]}
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14 }} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Paper sx={{ flex: 1, borderRadius: 3, boxShadow: 3, p: 4, minHeight: 500, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" color="primary">
              {tabLabels[tab]}
          </Typography>
            {tab === 0 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenForm('add')}
              >
          Add Driver
                  </Button>
            )}
      </Box>
          
          {tab === 0 ? (
            <Box>
              {/* Search Bar for Profile Details */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name, driver ID, or mobile number..."
                  value={profileDetailsSearchTerm}
                  onChange={(e) => setProfileDetailsSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setProfileDetailsSearchTerm('')}
                  disabled={!profileDetailsSearchTerm}
                >
                  Clear
                </Button>
        </Box>
              
              <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Photo</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Mobile Number</b></TableCell>
                      <TableCell><b>Email ID</b></TableCell>
                      <TableCell><b>Vehicle Type</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Online</b></TableCell>
                      <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                    {filteredProfileDetailsDrivers.length === 0 ? (
                <TableRow>
                        <TableCell colSpan={10} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {profileDetailsSearchTerm ? 'No drivers found matching your search.' : 'No drivers available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                </TableRow>
              ) : (
                      filteredProfileDetailsDrivers.map((driver, idx) => (
                        <TableRow key={driver._id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {idx + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {driver._id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Avatar 
                              src={driver.photo} 
                              alt={driver.name}
                              sx={{ width: 40, height: 40 }}
                            />
                          </TableCell>
                    <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ 
                                color: 'primary.main', 
                                textDecoration: 'underline', 
                                cursor: 'pointer',
                                fontWeight: 600,
                                '&:hover': {
                                  color: 'primary.dark'
                                }
                              }}
                              onClick={() => handleDriverClick(driver)}
                            >
                        {driver.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {driver.number}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {driver.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                              {driver.vehicleType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={driver.status}
                              color={getStatusColor(driver.status)}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                    </TableCell>
                    <TableCell>
                      {driver.online ? (
                        <Chip label="Online" color="success" size="small" />
                      ) : (
                        <Chip label="Offline" color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                color="primary" 
                                onClick={(e) => { e.stopPropagation(); handleOpenForm('edit', driver); }}
                                sx={{ 
                                  '&:hover': { 
                                    bgcolor: 'primary.lighter',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s'
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                onClick={(e) => { e.stopPropagation(); handleDelete(driver.id); }}
                                sx={{ 
                                  '&:hover': { 
                                    bgcolor: 'error.lighter',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s'
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 1 ? (
  
 
  // Order Details Tab
  // <Box>
  //   {/* Search Bar for Order Details */}
  //   <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
  //     <TextField
  //       placeholder="Search by customer name or customer ID..."
  //       value={orderDetailsSearchTerm}
  //       onChange={(e) => setOrderDetailsSearchTerm(e.target.value)}
  //       InputProps={{
  //         startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
  //       }}
  //       sx={{ flexGrow: 1, maxWidth: 500 }}
  //     />
  //     <Button
  //       variant="outlined"
  //       onClick={() => setOrderDetailsSearchTerm('')}
  //       disabled={!orderDetailsSearchTerm}
  //     >
  //       Clear
  //     </Button>
  //   </Box>

  //   {/* Tabs for One Way / Two Way */}
  //   <Tabs value={tripTypeTab} onChange={(e, v) => setTripTypeTab(v)} sx={{ mb: 3 }}>
  //     {tripTypes.map((type, index) => (
  //       <Tab key={type} label={type} />
  //     ))}
  //   </Tabs>

  //   <TableContainer>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell><b>S. No.</b></TableCell>
  //           <TableCell><b>Customer ID</b></TableCell>
  //           <TableCell><b>Customer Name</b></TableCell>
  //           <TableCell><b>Order ID</b></TableCell>
  //           <TableCell><b>Trip Type</b></TableCell>
  //           <TableCell><b>Status</b></TableCell>
  //           <TableCell><b>Amount (₹)</b></TableCell>
  //           <TableCell><b>Date</b></TableCell>
  //           <TableCell><b>Pickup</b></TableCell>
  //           <TableCell><b>Drop</b></TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {getFilteredOrderData(tripTypes[tripTypeTab]).length === 0 ? (
  //           <TableRow>
  //             <TableCell colSpan={10} align="center">
  //               <Box sx={{ py: 3 }}>
  //                 <Typography variant="body1" color="text.secondary">
  //                   {orderDetailsSearchTerm ? 'No orders found matching your search.' : 'No orders available for this trip type.'}
  //                 </Typography>
  //               </Box>
  //             </TableCell>
  //           </TableRow>
  //         ) : (
  //           getFilteredOrderData(tripTypes[tripTypeTab]).map((order, index) => (
  //             <TableRow key={index} hover>
  //               <TableCell>
  //                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
  //                   {index + 1}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
  //                   {order.customerId}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //                   <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
  //                     {order.customerName[0]}
  //                   </Avatar>
  //                   <Typography variant="body2" sx={{ fontWeight: 600 }}>
  //                     {order.customerName}
  //                   </Typography>
  //                 </Box>
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
  //                   {order.orderId}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Chip 
  //                   label={order.tripType} 
  //                   color="info" 
  //                   size="small" 
  //                   variant="outlined"
  //                   sx={{ fontWeight: 600 }}
  //                 />
  //               </TableCell>
  //               <TableCell>
  //                 <Chip 
  //                   label={order.status} 
  //                   color={getStatusColor(order.status)}
  //                   size="small"
  //                   sx={{ fontWeight: 600 }}
  //                 />
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
  //                   ₹{order.amount.toLocaleString()}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" color="text.secondary">
  //                   {new Date(order.date).toLocaleDateString()}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 120, wordBreak: 'break-word' }}>
  //                   {order.pickup}
  //                 </Typography>
  //               </TableCell>
  //               <TableCell>
  //                 <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 120, wordBreak: 'break-word' }}>
  //                   {order.drop}
  //                 </Typography>
  //               </TableCell>
  //             </TableRow>
  //           ))
  //         )}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // </Box>

  
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Search by customer name or customer ID..."
          value={orderDetailsSearchTerm}
          onChange={(e) => setOrderDetailsSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ flexGrow: 1, maxWidth: 500 }}
        />
        <Button
          variant="outlined"
          onClick={() => setOrderDetailsSearchTerm('')}
          disabled={!orderDetailsSearchTerm}
        >
          Clear
        </Button>
      </Box>

      <Tabs value={tripTypeTab} onChange={(e, v) => setTripTypeTab(v)} sx={{ mb: 3 }}>
        {tripTypes.map((type, index) => (
          <Tab key={type} label={type} />
        ))}
      </Tabs>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>S. No.</b></TableCell>
              <TableCell><b>Customer ID</b></TableCell>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Trip Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Amount (₹)</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Pickup</b></TableCell>
              <TableCell><b>Drop</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingOrders ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : getFilteredOrderData(tripTypes[tripTypeTab]).length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Box sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {orderDetailsSearchTerm ? 'No orders found matching your search.' : 'No orders available for this trip type.'}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              getFilteredOrderData(tripTypes[tripTypeTab]).map((order, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {order.customerId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                        {order.customerName?.[0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {order.customerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                      {order.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.tripType} 
                      color="info" 
                      size="small" 
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                      ₹{order.amount?.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {order.date ? new Date(order.date).toLocaleDateString() : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 120, wordBreak: 'break-word' }}>
                      {order.pickup}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 120, wordBreak: 'break-word' }}>
                      {order.drop}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  

          ) : tab === 2 ? (
            // Documents Tab
            <Box>
              {/* Search and Filter Bar */}
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search by driver name..."
                  value={docSearchTerm}
                  onChange={e => setDocSearchTerm(e.target.value)}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                  sx={{ minWidth: 220 }}
                />
                <Button
                  variant={docDateFilter === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setDocDateFilter('all')}
                >All</Button>
                <Button
                  variant={docDateFilter === 'today' ? 'contained' : 'outlined'}
                  onClick={() => setDocDateFilter('today')}
                >Today</Button>
                <Button
                  variant={docDateFilter === 'week' ? 'contained' : 'outlined'}
                  onClick={() => setDocDateFilter('week')}
                >Weekly</Button>
                <Button
                  variant={docDateFilter === 'month' ? 'contained' : 'outlined'}
                  onClick={() => setDocDateFilter('month')}
                >Monthly</Button>
                <Button
                  variant={docDateFilter === 'custom' ? 'contained' : 'outlined'}
                  onClick={() => setDocDateFilter('custom')}
                >Custom</Button>
                {docDateFilter === 'custom' && (
                  <>
                    <TextField
                      size="small"
                      type="date"
                      label="Start"
                      InputLabelProps={{ shrink: true }}
                      value={docCustomStart}
                      onChange={e => setDocCustomStart(e.target.value)}
                    />
                    <TextField
                      size="small"
                      type="date"
                      label="End"
                      InputLabelProps={{ shrink: true }}
                      value={docCustomEnd}
                      onChange={e => setDocCustomEnd(e.target.value)}
                    />
                  </>
                )}
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      {documentFields.map((field) => (
                        <TableCell key={field.key}><b>{field.label}</b></TableCell>
                      ))}
                      <TableCell><b>Status</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDocDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={documentFields.length + 4} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              No drivers available.
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocDrivers.map((driver, idx) => (
                        <TableRow key={driver.id} hover>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{driver.driverId}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600, '&:hover': { color: 'primary.dark' } }}
                              onClick={() => {
                                setSelectedDriver(driver);
                                setOpenDialog('documents');
                              }}
                            >
                              {driver.fullName}
                            </Typography>
                          </TableCell>
                          {documentFields.map((field) => (
                            <TableCell key={field.key}>
                              {driver.documents?.[field.key] ? (
                                <Button size="small" onClick={() => setViewDocDialog({ open: true, title: field.label, src: driver.documents[field.key] })}>View</Button>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                          ))}
                          <TableCell>
                            <Chip
                              label={driver.documentStatus}
                              color={driver.documentStatus === 'Approved' ? 'success' : driver.documentStatus === 'Rejected' ? 'error' : 'warning'}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 3 ? (
            // Data Analyze Tab
            <Box>
              {/* Search Bar for Data Analyze */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name or driver ID..."
                  value={dataAnalyzeSearchTerm}
                  onChange={e => setDataAnalyzeSearchTerm(e.target.value)}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setDataAnalyzeSearchTerm('')}
                  disabled={!dataAnalyzeSearchTerm}
                >
                  Clear
                  </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Mobile</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Vehicle Type</b></TableCell>
                      <TableCell><b>Rating</b></TableCell>
                      <TableCell><b>Created Date</b></TableCell>
                      <TableCell><b>How Many Days Completed</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDataAnalyzeDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {dataAnalyzeSearchTerm ? 'No drivers found matching your search.' : 'No drivers available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDataAnalyzeDrivers.map((driver, idx) => (
                        <TableRow key={driver.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{idx + 1}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{driver.driverId}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={driver.photo} alt={driver.fullName} sx={{ mr: 2, width: 32, height: 32, fontSize: '0.875rem' }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.fullName}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.altMobile}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={driver.status} color={getStatusColor(driver.status)} size="small" sx={{ fontWeight: 600 }} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.vehicleType}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.rating}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.createdAt}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{getDurationString(driver.createdAt)}</Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
            </Box>
          ) : tab === 4 ? (
            // Block ID Tab
            <Box>
              {/* Search Bar for Block ID */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name or driver ID..."
                  value={blockIdSearchTerm}
                  onChange={(e) => setBlockIdSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setBlockIdSearchTerm('')}
                  disabled={!blockIdSearchTerm}
                >
                  Clear
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Mobile</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBlockIdDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {blockIdSearchTerm ? 'No drivers found matching your search.' : 'No drivers available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBlockIdDrivers.map((driver, idx) => (
                        <TableRow key={driver.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{idx + 1}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{driver.driverId}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={driver.photo} alt={driver.fullName} sx={{ mr: 2, width: 32, height: 32, fontSize: '0.875rem' }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.fullName}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{driver.email}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{driver.altMobile}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={driver.blocked ? 'Blocked' : 'Active'}
                              color={driver.blocked ? 'error' : 'success'}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            {driver.blocked ? (
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => {
                                  setDrivers((prev) => prev.map((d) => d.id === driver.id ? { ...d, blocked: false } : d));
                                }}
                                sx={{ fontWeight: 600 }}
                              >
                                Unblock
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => {
                                  setDrivers((prev) => prev.map((d) => d.id === driver.id ? { ...d, blocked: true } : d));
                                }}
                                sx={{ fontWeight: 600 }}
                              >
                                Block
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 5 ? (
            // High Orders Tab
            <Box>
              {/* Search Bar for High Orders */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name or driver ID..."
                  value={highOrderSearchTerm}
                  onChange={(e) => setHighOrderSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setHighOrderSearchTerm('')}
                  disabled={!highOrderSearchTerm}
                >
                  Clear
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Number of Orders</b></TableCell>
                      <TableCell><b>Order Details</b></TableCell>
                      <TableCell><b>Receiver Details</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredHighOrderData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {highOrderSearchTerm ? 'No high order drivers found matching your search.' : 'No high order data available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredHighOrderData.map((driver, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{driver.serialNo}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{driver.driverId}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                {driver.driverName[0]}
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'primary.main', 
                                  textDecoration: 'underline', 
                                  cursor: 'pointer',
                                  '&:hover': {
                                    color: 'primary.dark'
                                  }
                                }}
                                onClick={() => { setSelectedHighOrderDriver(driver); setOpenHighOrderDialog(true); }}
                              >
                                {driver.driverName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${driver.orders.length} Orders`}
                              color="success"
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                              {driver.orders.map((order, i) => (
                                <Box key={order.orderId} sx={{ mb: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'grey.50' }}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Order ID: {order.orderId}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" color="text.secondary">
                                    Date: {new Date(order.date).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                              {driver.orders.map((order, i) => (
                                <Box key={order.orderId} sx={{ mb: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'grey.50' }}>
                                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    Name: {order.receiver.name}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" color="text.secondary">
                                    Number: {order.receiver.number}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" color="text.secondary">
                                    Pincode: {order.receiver.pincode}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                                    Address: {order.receiver.address}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 6 ? (
            // Wallet Tab
            <Box>
              {/* Search Bar for Wallet */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name or driver ID..."
                  value={walletSearchTerm}
                  onChange={(e) => setWalletSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setWalletSearchTerm('')}
                  disabled={!walletSearchTerm}
                >
                  Clear
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Top Up (₹)</b></TableCell>
                      <TableCell><b>Used (₹)</b></TableCell>
                      <TableCell><b>Refund (₹)</b></TableCell>
                      <TableCell><b>Balance (₹)</b></TableCell>
                      <TableCell><b>Last Transaction</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredWalletData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {walletSearchTerm ? 'No wallet data found matching your search.' : 'No wallet data available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWalletData.map((row, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>{row.serialNo}</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {row.driverId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {row.driverName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                              ₹{row.topUp.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                              ₹{row.used.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {row.refund > 0 ? (
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                                ₹{row.refund.toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                -
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'info.main' }}>
                              ₹{row.balance.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {row.lastTransaction !== 'N/A' ? new Date(row.lastTransaction).toLocaleDateString() : 'N/A'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 7 ? (
            // Refer and Earn Tab
            <Box>
              {/* Search Bar for Refer and Earn */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by driver name, ID, referrer name, or referrer ID..."
                  value={referralSearchTerm}
                  onChange={(e) => setReferralSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setReferralSearchTerm('')}
                  disabled={!referralSearchTerm}
                >
                  Clear
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Driver ID</b></TableCell>
                      <TableCell><b>Driver Name</b></TableCell>
                      <TableCell><b>Mobile Number</b></TableCell>
                      <TableCell><b>City</b></TableCell>
                      <TableCell><b>Referrer ID</b></TableCell>
                      <TableCell><b>Referrer Name</b></TableCell>
                      <TableCell><b>Referral Date</b></TableCell>
                      <TableCell><b>Earning (₹)</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredReferralData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {referralSearchTerm ? 'No referrals found matching your search.' : 'No referral data available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReferralData.map((row, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>{row.serialNo}</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {row.driverId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {row.driverName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {row.mobileNumber}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {row.referrerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {row.referrerName !== 'N/A' ? (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 2, bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                  {row.referrerName[0]}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {row.referrerName}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                {row.referrerName}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(row.referralDate).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                              ₹{row.earning}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={row.status === 'Active' ? 'success' : 'warning'}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
            </Box>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {tabLabels[tab]} content will be implemented here.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Driver Details Dialog */}
      {/* 
        Remove this block if you are not using the dialog for driver details,
        since you are now navigating to a separate driver details page.
        If you want to keep it for quick view, you can leave it.
      */}

      {/* Dialog for showing all documents and approve/reject */}
      <Dialog open={openDialog === 'documents'} onClose={() => { setOpenDialog(false); setSelectedDriver(null); }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Driver Documents
          <IconButton onClick={() => { setOpenDialog(false); setSelectedDriver(null); }} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedDriver && (
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>{selectedDriver.fullName}</Typography>
              <Typography><b>Driver ID:</b> {selectedDriver.driverId}</Typography>
              <Typography><b>Aadhar:</b> <Link href="#" underline="hover">{selectedDriver.documents?.aadhar || '-'}</Link></Typography>
              <Typography><b>PAN:</b> <Link href="#" underline="hover">{selectedDriver.documents?.pan || '-'}</Link></Typography>
              <Typography><b>License:</b> <Link href="#" underline="hover">{selectedDriver.documents?.license || '-'}</Link></Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={selectedDriver.documentStatus}
                  color={selectedDriver.documentStatus === 'Approved' ? 'success' : selectedDriver.documentStatus === 'Rejected' ? 'error' : 'warning'}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); setSelectedDriver(null); }}>Close</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setDrivers((prev) => prev.map((d) => d.id === selectedDriver.id ? { ...d, documentStatus: 'Approved' } : d));
              setOpenDialog(false);
              setSelectedDriver(null);
            }}
            disabled={selectedDriver?.documentStatus === 'Approved'}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDrivers((prev) => prev.map((d) => d.id === selectedDriver.id ? { ...d, documentStatus: 'Rejected' } : d));
              setOpenDialog(false);
              setSelectedDriver(null);
            }}
            disabled={selectedDriver?.documentStatus === 'Rejected'}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* High Orders Dialog */}
      {openHighOrderDialog && selectedHighOrderDriver && (
        <Dialog open={openHighOrderDialog} onClose={() => setOpenHighOrderDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            High Orders for {selectedHighOrderDriver.driverName}
          </DialogTitle>
          <DialogContent dividers>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Order ID</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Pickup Location</b></TableCell>
                    <TableCell><b>Drop Location</b></TableCell>
                    <TableCell><b>Pickup Time</b></TableCell>
                    <TableCell><b>Drop Time</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedHighOrderDriver.orders.map((order, idx) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.date || '-'}</TableCell>
                      <TableCell>{order.receiver?.pickup || order.pickup || '-'}</TableCell>
                      <TableCell>{order.receiver?.drop || order.drop || '-'}</TableCell>
                      <TableCell>{order.pickupTime || order.pickTime || '-'}</TableCell>
                      <TableCell>{order.dropTime || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenHighOrderDialog(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ManageDriver;