import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Container,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Tooltip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  DirectionsBike as BikeIcon,
  AirportShuttle as AutoIcon,
  LocalShipping as TruckIcon,
  Star as StarIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Dummy customer data
const dummyCustomers = {
  'CUST010': {
    id: 'CUST010',
    name: 'Deepak Mehta',
    email: 'deepak.mehta@email.com',
    mobile: '9876543210',
    status: 'Active',
    rating: 4.2,
    totalOrders: 25,
    joinDate: '2023-01-15',
    address: '123, MG Road, Delhi - 110001'
  }
};

// Dummy orders data for the customer
const dummyOrders = [
  {
    id: 'ORD1001',
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    customerMobile: '9876543210',
    customerEmail: 'deepak.mehta@email.com',
    orderDate: '2024-01-15',
    orderTime: '09:30 AM',
    amount: 450,
    status: 'Completed',
    vehicleType: '2W',
    pickup: {
      location: 'Sector 10, City A',
      pincode: '110001',
      city: 'New Delhi',
      time: '09:00 AM'
    },
    drop: {
      location: 'Sector 22, City B',
      pincode: '110022',
      city: 'New Delhi',
      time: '10:30 AM'
    },
    driver: {
      name: 'Ravi Kumar',
      mobile: '9000000001',
      rating: 4.5
    },
    receiver: {
      name: 'Ravi Kumar',
      number: '9000000001',
      pincode: '110011',
      address: '123, MG Road, Delhi'
    }
  },
  {
    id: 'ORD1002',
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    customerMobile: '9876543210',
    customerEmail: 'deepak.mehta@email.com',
    orderDate: '2024-01-16',
    orderTime: '11:15 AM',
    amount: 320,
    status: 'Completed',
    vehicleType: '3W',
    pickup: {
      location: 'Connaught Place, Central Delhi',
      pincode: '110001',
      city: 'New Delhi',
      time: '11:00 AM'
    },
    drop: {
      location: 'Lajpat Nagar, South Delhi',
      pincode: '110024',
      city: 'New Delhi',
      time: '12:15 PM'
    },
    driver: {
      name: 'Suresh Singh',
      mobile: '9000000002',
      rating: 4.2
    },
    receiver: {
      name: 'Priya Sharma',
      number: '9000000002',
      pincode: '110024',
      address: '456, Lajpat Nagar, Delhi'
    }
  },
  {
    id: 'ORD1003',
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    customerMobile: '9876543210',
    customerEmail: 'deepak.mehta@email.com',
    orderDate: '2024-01-17',
    orderTime: '02:45 PM',
    amount: 800,
    status: 'Completed',
    vehicleType: 'Truck',
    pickup: {
      location: 'Industrial Area, Okhla',
      pincode: '110020',
      city: 'New Delhi',
      time: '02:30 PM'
    },
    drop: {
      location: 'Gurgaon Cyber City',
      pincode: '122002',
      city: 'Gurgaon',
      time: '04:00 PM'
    },
    driver: {
      name: 'Amit Sharma',
      mobile: '9000000003',
      rating: 4.0
    },
    receiver: {
      name: 'Rajesh Kumar',
      number: '9000000003',
      pincode: '122002',
      address: '789, Cyber City, Gurgaon'
    }
  },
  {
    id: 'ORD1004',
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    customerMobile: '9876543210',
    customerEmail: 'deepak.mehta@email.com',
    orderDate: '2024-01-18',
    orderTime: '10:00 AM',
    amount: 280,
    status: 'Completed',
    vehicleType: '2W',
    pickup: {
      location: 'Karol Bagh, Central Delhi',
      pincode: '110005',
      city: 'New Delhi',
      time: '09:45 AM'
    },
    drop: {
      location: 'Dwarka Sector 12, West Delhi',
      pincode: '110075',
      city: 'New Delhi',
      time: '11:15 AM'
    },
    driver: {
      name: 'Vikram Singh',
      mobile: '9000000004',
      rating: 4.3
    },
    receiver: {
      name: 'Anita Verma',
      number: '9000000004',
      pincode: '110075',
      address: '321, Dwarka Sector 12, Delhi'
    }
  },
  {
    id: 'ORD1005',
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    customerMobile: '9876543210',
    customerEmail: 'deepak.mehta@email.com',
    orderDate: '2024-01-19',
    orderTime: '03:30 PM',
    amount: 650,
    status: 'Completed',
    vehicleType: '3W',
    pickup: {
      location: 'Saket, South Delhi',
      pincode: '110017',
      city: 'New Delhi',
      time: '03:15 PM'
    },
    drop: {
      location: 'Greater Noida Sector 1',
      pincode: '201310',
      city: 'Greater Noida',
      time: '04:45 PM'
    },
    driver: {
      name: 'Mohan Lal',
      mobile: '9000000005',
      rating: 4.1
    },
    receiver: {
      name: 'Sunita Devi',
      number: '9000000005',
      pincode: '201310',
      address: '654, Greater Noida Sector 1'
    }
  }
];

const vehicleTypes = [
  { label: 'All', icon: <FilterIcon /> },
  { label: '2W', icon: <BikeIcon /> },
  { label: '3W', icon: <AutoIcon /> },
  { label: 'Truck', icon: <TruckIcon /> }
];

const CustomerOrders = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDialog, setOrderDialog] = useState(false);
  const [vehicleTypeTab, setVehicleTypeTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const customerData = dummyCustomers[customerId];
        if (customerData) {
          setCustomer(customerData);
          setOrders(dummyOrders);
        }
        setLoading(false);
      }, 1000);
    };

    fetchCustomerData();
  }, [customerId]);

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setOrderDialog(true);
  };

  const handleOrderClose = () => {
    setOrderDialog(false);
    setSelectedOrder(null);
  };

  const handleVehicleTypeChange = (event, newValue) => {
    setVehicleTypeTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case '2W': return <BikeIcon />;
      case '3W': return <AutoIcon />;
      case 'Truck': return <TruckIcon />;
      default: return <BikeIcon />;
    }
  };

  const filterOrdersByDate = (orders) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      
      switch (filterType) {
        case 'today':
          return orderDate >= startOfDay && orderDate <= endOfDay;
        case 'weekly':
          return orderDate >= startOfWeek;
        case 'monthly':
          return orderDate >= startOfMonth;
        case 'custom':
          if (customDateRange.startDate && customDateRange.endDate) {
            const startDate = new Date(customDateRange.startDate);
            const endDate = new Date(customDateRange.endDate);
            endDate.setHours(23, 59, 59, 999);
            return orderDate >= startDate && orderDate <= endDate;
          }
          return true;
        default:
          return true;
      }
    });
  };

  const filterOrdersByVehicleType = (orders) => {
    if (vehicleTypeTab === 0) return orders; // All
    const selectedType = vehicleTypes[vehicleTypeTab].label;
    return orders.filter(order => order.vehicleType === selectedType);
  };

  const filterOrdersBySearch = (orders) => {
    if (!searchTerm) return orders;
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredOrders = filterOrdersBySearch(
    filterOrdersByVehicleType(
      filterOrdersByDate(orders)
    )
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Customer not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: 3,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container maxWidth="xl">
        {/* Header with Back Button */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ 
              mr: 2, 
              bgcolor: 'white', 
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Customer Orders
          </Typography>
        </Box>

        {/* Customer Profile Card */}
        <Card sx={{ borderRadius: 4, boxShadow: 4, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ width: 80, height: 80, mr: 3, border: '3px solid #fff', boxShadow: 2, fontSize: 32, bgcolor: 'rgba(255,255,255,0.15)' }}
                  >
                    {customer.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1, opacity: 0.9 }}>
                      {customer.customerId}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip 
                        label={customer.status} 
                        color={customer.status === 'Active' ? 'success' : 'error'} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: customer.status === 'Active' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)', color: 'white' }} 
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, mr: 0.5, color: 'yellow' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {customer.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">{customer.mobile}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">{customer.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">{customer.address}</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              {/* Search */}
              <Grid item xs={12} md={4}>
                <TextField
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  fullWidth
                />
              </Grid>

              {/* Date Filters */}
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant={filterType === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('all')}
                    startIcon={<CalendarIcon />}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === 'today' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('today')}
                    startIcon={<CalendarIcon />}
                  >
                    Today
                  </Button>
                  <Button
                    variant={filterType === 'weekly' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('weekly')}
                    startIcon={<CalendarIcon />}
                  >
                    Weekly
                  </Button>
                  <Button
                    variant={filterType === 'monthly' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('monthly')}
                    startIcon={<CalendarIcon />}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={filterType === 'custom' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('custom')}
                    startIcon={<CalendarIcon />}
                  >
                    Custom Date
                  </Button>
                </Box>
              </Grid>

              {/* Custom Date Range */}
              {filterType === 'custom' && (
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Date Range:
                      </Typography>
                      <DatePicker
                        label="Start Date"
                        value={customDateRange.startDate}
                        onChange={(newValue) => setCustomDateRange(prev => ({ ...prev, startDate: newValue }))}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                      <Typography variant="body2">to</Typography>
                      <DatePicker
                        label="End Date"
                        value={customDateRange.endDate}
                        onChange={(newValue) => setCustomDateRange(prev => ({ ...prev, endDate: newValue }))}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </Box>
                  </LocalizationProvider>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Vehicle Type Tabs */}
        <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Tabs 
              value={vehicleTypeTab} 
              onChange={handleVehicleTypeChange} 
              sx={{ 
                px: 2,
                '& .MuiTab-root': {
                  minHeight: 48,
                  borderRadius: 2,
                  mx: 0.5
                }
              }}
            >
              {vehicleTypes.map((type, idx) => (
                <Tab 
                  key={type.label} 
                  label={type.label} 
                  icon={type.icon} 
                  iconPosition="start" 
                  sx={{ 
                    bgcolor: vehicleTypeTab === idx ? 'primary.light' : 'transparent',
                    color: vehicleTypeTab === idx ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: vehicleTypeTab === idx ? 'primary.main' : 'grey.100'
                    }
                  }}
                />
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
              <AccountCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
              Orders ({filteredOrders.length})
            </Typography>
            
            <TableContainer sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>S. No.</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Vehicle Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Pickup Location</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Drop Location</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount (₹)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Driver</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        <Box sx={{ py: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            {searchTerm || filterType !== 'all' ? 'No orders found matching your criteria.' : 'No orders available.'}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order, idx) => (
                      <TableRow 
                        key={order.id} 
                        sx={{ 
                          background: order.status === 'Completed' ? 'rgba(76, 175, 80, 0.05)' : order.status === 'Cancelled' ? 'rgba(244, 67, 54, 0.05)' : 'inherit',
                          '&:hover': { bgcolor: 'grey.50' }
                        }}
                      >
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {new Date(order.orderDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.orderTime}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.vehicleType} 
                            icon={getVehicleIcon(order.vehicleType)}
                            color="info" 
                            size="small" 
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {order.pickup.location}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.pickup.city} - {order.pickup.pincode}
                            </Typography>
                            <Typography variant="caption" display="block" color="primary.main" sx={{ fontWeight: 600 }}>
                              {order.pickup.time}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {order.drop.location}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.drop.city} - {order.drop.pincode}
                            </Typography>
                            <Typography variant="caption" display="block" color="primary.main" sx={{ fontWeight: 600 }}>
                              {order.drop.time}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>₹{order.amount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={getStatusColor(order.status)} 
                            size="small" 
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          {order.driver ? (
                            <Tooltip title={`Mobile: ${order.driver.mobile}`}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountCircleIcon color="primary" sx={{ mr: 0.5, fontSize: 16 }} />
                                <Typography variant="body2">{order.driver.name}</Typography>
                              </Box>
                            </Tooltip>
                          ) : (
                            <Typography variant="body2" color="text.secondary">-</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOrderView(order)}
                            sx={{ 
                              '&:hover': { 
                                bgcolor: 'primary.lighter',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s'
                            }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={orderDialog} onClose={handleOrderClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            Order Details: {selectedOrder?.id}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedOrder && (
              <Grid container spacing={3}>
                {/* Order Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Order Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Order ID</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.id}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {new Date(selectedOrder.orderDate).toLocaleDateString()} at {selectedOrder.orderTime}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Vehicle Type</Typography>
                      <Chip 
                        label={selectedOrder.vehicleType} 
                        icon={getVehicleIcon(selectedOrder.vehicleType)}
                        color="info" 
                        size="small" 
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      <Chip 
                        label={selectedOrder.status} 
                        color={getStatusColor(selectedOrder.status)} 
                        size="small" 
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Amount</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                        ₹{selectedOrder.amount}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Location Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Location Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Pickup Location</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.pickup.location}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedOrder.pickup.city} - {selectedOrder.pickup.pincode}
                      </Typography>
                      <Typography variant="caption" display="block" color="primary.main" sx={{ fontWeight: 600 }}>
                        Time: {selectedOrder.pickup.time}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Drop Location</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.drop.location}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedOrder.drop.city} - {selectedOrder.drop.pincode}
                      </Typography>
                      <Typography variant="caption" display="block" color="primary.main" sx={{ fontWeight: 600 }}>
                        Time: {selectedOrder.drop.time}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Driver Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Driver Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {selectedOrder.driver?.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedOrder.driver?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedOrder.driver?.mobile}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Rating</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, mr: 0.5, color: 'yellow' }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedOrder.driver?.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>

                {/* Receiver Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Receiver Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Name</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.receiver.name}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Contact</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.receiver.number}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.receiver.address}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Pincode: {selectedOrder.receiver.pincode}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleOrderClose} variant="outlined" sx={{ borderRadius: 2 }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CustomerOrders; 