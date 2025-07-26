import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Tabs, 
  Tab, 
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
  Chip, 
  Tooltip, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Container,
  Stack,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { getAllCustomerBookings, getAllOrderBookings } from '../../api/menu';

// Dummy data for demonstration
const dummyCustomers = [
  {
    id: 'CUST001',
    name: 'Alice Johnson',
    status: 'Active',
    mobile: '9876543210',
    email: 'alice.johnson@email.com',
    joiningDate: '2023-01-15',
    customerId: 'CUST001',
    bank: {
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Connaught Place',
      holder: 'Alice Johnson'
    },
    balance: 2000,
    address: '123, Main Street, New Delhi, 110001',
    orders: {
      '2W': [
        { orderId: 'ORD001', date: '2024-01-15', amount: 150, status: 'Completed', driver: 'Ravi Kumar', driverMobile: '9000000001' },
        { orderId: 'ORD002', date: '2024-01-16', amount: 200, status: 'Canceled' }
      ],
      '3W': [
        { orderId: 'ORD003', date: '2024-02-01', amount: 300, status: 'Completed', driver: 'Suresh Singh', driverMobile: '9000000002' }
      ],
      'Truck': [
        { orderId: 'ORD004', date: '2024-03-10', amount: 800, status: 'Completed', driver: 'Amit Sharma', driverMobile: '9000000003' }
      ]
    },
    transactions: [
      { id: 'TXN001', date: '2024-04-01', type: 'Top Up', amount: 1000 },
      { id: 'TXN002', date: '2024-04-10', type: 'Order Payment', amount: -150 },
      { id: 'TXN003', date: '2024-05-01', type: 'Refund', amount: 200 }
    ]
  },
  // Add more dummy customers as needed
];

const vehicleTypes = [
  { label: '2W', icon: <DirectionsBikeIcon /> },
  { label: '3W', icon: <AirportShuttleIcon /> },
  { label: 'Truck', icon: <LocalShippingIcon /> }
];

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = dummyCustomers.find((c) => c.id === id) || dummyCustomers[0];
  const [tab, setTab] = useState(0);
  const [refundDialog, setRefundDialog] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [balance, setBalance] = useState(customer.balance);
  const [bankDialog, setBankDialog] = useState(false);
  const [editBank, setEditBank] = useState({ ...customer.bank });
  const [bankDetails, setBankDetails] = useState({ ...customer.bank });
  const [addDialog, setAddDialog] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [removeDialog, setRemoveDialog] = useState(false);
  const [removeAmount, setRemoveAmount] = useState('');
  const [txnDateFilter, setTxnDateFilter] = useState('all'); // 'all', 'today', 'week', 'month', 'year', 'custom'
  const [txnCustomDate, setTxnCustomDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch order details from backend API on mount
  useEffect(() => {
    setLoadingOrders(true);
    getAllOrderBookings()
      .then((data) => {
        if (data && Array.isArray(data.bookings)) {
          setOrders(data.bookings);
        } else if (data && Array.isArray(data.booking)) {
          setOrders(data.booking);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch order bookings:', err);
        setOrders([]);
      })
      .finally(() => setLoadingOrders(false));
  }, []);

  // Helper function to filter transactions by date
  const filterTransactions = (transactions) => {
    if (txnDateFilter === 'all') return transactions;
    const now = new Date();
    return transactions.filter(txn => {
      const txnDate = new Date(txn.date);
      if (txnDateFilter === 'today') {
        return txnDate.toDateString() === now.toDateString();
      } else if (txnDateFilter === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return txnDate >= weekAgo && txnDate <= now;
      } else if (txnDateFilter === 'month') {
        return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
      } else if (txnDateFilter === 'year') {
        return txnDate.getFullYear() === now.getFullYear();
      } else if (txnDateFilter === 'custom' && txnCustomDate) {
        return txnDate.toDateString() === new Date(txnCustomDate).toDateString();
      }
      return true;
    });
  };

  const handleRefund = () => {
    const amt = parseFloat(refundAmount);
    if (!isNaN(amt) && amt > 0 && amt <= balance) {
      setBalance((prev) => prev - amt); // Subtract refund from balance
      setRefundDialog(false);
      setRefundAmount('');
    }
  };

  const handleAddAmount = () => {
    const amt = parseFloat(addAmount);
    if (!isNaN(amt) && amt > 0) {
      setBalance((prev) => prev + amt);
      setAddDialog(false);
      setAddAmount('');
    }
  };

  const handleRemoveAmount = () => {
    const amt = parseFloat(removeAmount);
    if (!isNaN(amt) && amt > 0 && amt <= balance) {
      setBalance((prev) => prev - amt);
      setRemoveDialog(false);
      setRemoveAmount('');
    }
  };

  const handleBankEditOpen = () => {
    setEditBank({ ...bankDetails });
    setBankDialog(true);
  };
  const handleBankEditChange = (e) => {
    const { name, value } = e.target;
    setEditBank((prev) => ({ ...prev, [name]: value }));
  };
  const handleBankEditSave = () => {
    setBankDetails({ ...editBank });
    setBankDialog(false);
  };

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
            Customer Details
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3} alignItems="stretch">
          {/* Profile Details Card - Left Side */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 4, boxShadow: 4, p: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', minHeight: 340, height: '100%' }}>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Avatar 
                  sx={{ width: 110, height: 110, mx: 'auto', mb: 2, border: '5px solid #fff', boxShadow: 3, fontSize: 48, bgcolor: 'rgba(255,255,255,0.15)' }}
                >
                  {customer.name[0]}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, letterSpacing: 1 }}>
                  {customer.name}
                </Typography>
                <Chip 
                  label={customer.status} 
                  color={customer.status === 'Active' ? 'success' : 'error'} 
                  size="medium" 
                  sx={{ fontWeight: 600, bgcolor: customer.status === 'Active' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)', color: 'white', mb: 2 }} 
                />
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box sx={{ textAlign: 'left', color: 'white', pl: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'white' }} />
                    <Typography variant="body1">{customer.mobile}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'white' }} />
                    <Typography variant="body1">{customer.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BadgeIcon sx={{ mr: 1, color: 'white' }} />
                    <Typography variant="body1">{customer.customerId}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: 'white' }} />
                    <Typography variant="body1">{customer.joiningDate}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'white' }} />
                    <Typography variant="body1">{customer.address}</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Right Side: Bank Details Card + Wallet Card */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {/* Bank Details Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 4, p: 0, background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', minHeight: 180, maxWidth: 400, mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      <AccountBalanceIcon sx={{ mr: 1 }} />
                      Bank Details
                    </Typography>
                    <Button variant="outlined" size="small" onClick={handleBankEditOpen} sx={{ fontWeight: 600 }}>
                      Update
                    </Button>
                  </Box>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{bankDetails.bankName}</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{bankDetails.accountNumber}</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{bankDetails.holder}</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <BadgeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{bankDetails.ifsc}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{bankDetails.branch}</Typography>
                  </Box>
                </CardContent>
              </Card>
              {/* Wallet Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 4, mt: 0, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', textAlign: 'center', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                  <AccountBalanceWalletIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                    Wallet Balance
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    ₹{balance.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button variant="contained" color="success" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => setAddDialog(true)}>
                      Add Amount
                    </Button>
                    <Button variant="contained" color="error" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => setRemoveDialog(true)}>
                      Remove Amount
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Order History Card */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
              <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
              Order History
            </Typography>
            <Tabs 
              value={tab} 
              onChange={(_, v) => setTab(v)} 
              sx={{ 
                mb: 3,
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
                    bgcolor: tab === idx ? 'primary.light' : 'transparent',
                    color: tab === idx ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: tab === idx ? 'primary.main' : 'grey.100'
                    }
                  }}
                />
              ))}
            </Tabs>
            <TableContainer sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>S. No.</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount (₹)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Driver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(customer.orders[vehicleTypes[tab].label] || []).map((order, idx) => (
                    <TableRow 
                      key={idx} 
                      sx={{ 
                        background: order.status === 'Completed' ? 'rgba(76, 175, 80, 0.05)' : order.status === 'Canceled' ? 'rgba(244, 67, 54, 0.05)' : 'inherit',
                        '&:hover': { bgcolor: 'grey.50' }
                      }}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{order.orderId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>₹{order.amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          color={order.status === 'Completed' ? 'success' : order.status === 'Canceled' ? 'error' : 'default'} 
                          size="small" 
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        {order.status === 'Completed' && order.driver ? (
                          <Tooltip title={`Mobile: ${order.driverMobile}`}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccountCircleIcon color="primary" sx={{ mr: 0.5, fontSize: 16 }} />
                              <Typography variant="body2">{order.driver}</Typography>
                            </Box>
                          </Tooltip>
                        ) : (
                          <Typography variant="body2" color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Transaction History Card */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
              <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              Transaction History
            </Typography>
            {/* Filter Buttons */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant={txnDateFilter === 'all' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('all')}>All</Button>
              <Button variant={txnDateFilter === 'today' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('today')}>Today</Button>
              <Button variant={txnDateFilter === 'week' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('week')}>Weekly</Button>
              <Button variant={txnDateFilter === 'month' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('month')}>Monthly</Button>
              <Button variant={txnDateFilter === 'year' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('year')}>Yearly</Button>
              <Button variant={txnDateFilter === 'custom' ? 'contained' : 'outlined'} onClick={() => setTxnDateFilter('custom')}>Custom Date</Button>
              {txnDateFilter === 'custom' && (
                <TextField
                  type="date"
                  size="small"
                  value={txnCustomDate}
                  onChange={e => setTxnCustomDate(e.target.value)}
                  sx={{ ml: 1, minWidth: 150 }}
                />
              )}
            </Box>
            <TableContainer sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>S. No.</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterTransactions(customer.transactions).map((txn, idx) => (
                    <TableRow key={idx} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{txn.id}</TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={txn.type} 
                          size="small" 
                          sx={{ 
                            bgcolor: txn.type === 'Top Up' ? 'success.light' : txn.type === 'Refund' ? 'warning.light' : 'error.light',
                            color: txn.type === 'Top Up' ? 'success.dark' : txn.type === 'Refund' ? 'warning.dark' : 'error.dark',
                            fontWeight: 600
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: 600, 
                        color: txn.amount < 0 ? 'error.main' : 'success.main',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {txn.amount < 0 ? (
                          <ArrowDownwardIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                        )}
                        ₹{Math.abs(txn.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Refund Dialog */}
        <Dialog open={refundDialog} onClose={() => setRefundDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            Process Refund
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              label="Refund Amount"
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ min: 1, max: balance }}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Current Balance: ₹{balance.toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setRefundDialog(false)}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRefund} 
              variant="contained" 
              color="primary" 
              disabled={!refundAmount || parseFloat(refundAmount) <= 0 || parseFloat(refundAmount) > balance}
              sx={{ borderRadius: 2 }}
            >
              Process Refund
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bank Details Update Dialog */}
        <Dialog open={bankDialog} onClose={() => setBankDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>Update Bank Details</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              label="Bank Name"
              name="bankName"
              value={editBank.bankName}
              onChange={handleBankEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Account Number"
              name="accountNumber"
              value={editBank.accountNumber}
              onChange={handleBankEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Account Holder"
              name="holder"
              value={editBank.holder}
              onChange={handleBankEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="IFSC Code"
              name="ifsc"
              value={editBank.ifsc}
              onChange={handleBankEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Branch"
              name="branch"
              value={editBank.branch}
              onChange={handleBankEditChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setBankDialog(false)} variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleBankEditSave} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Amount Dialog */}
        <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ bgcolor: 'success.main', color: 'white' }}>Add Amount</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              label="Amount to Add"
              type="number"
              value={addAmount}
              onChange={e => setAddAmount(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ min: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setAddDialog(false)} variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleAddAmount} variant="contained" color="success" sx={{ borderRadius: 2 }} disabled={!addAmount || parseFloat(addAmount) <= 0}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Remove Amount Dialog */}
        <Dialog open={removeDialog} onClose={() => setRemoveDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>Remove Amount</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              label="Amount to Remove"
              type="number"
              value={removeAmount}
              onChange={e => setRemoveAmount(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ min: 1, max: balance }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Current Balance: ₹{balance.toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setRemoveDialog(false)} variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleRemoveAmount} variant="contained" color="error" sx={{ borderRadius: 2 }} disabled={!removeAmount || parseFloat(removeAmount) <= 0 || parseFloat(removeAmount) > balance}>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CustomerDetail; 