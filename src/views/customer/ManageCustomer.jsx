import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Tabs, Tab, Chip, CircularProgress, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getAllCustomerBookings, GetAlluser, getAllOrderBookings } from '../../api/menu';

const tabLabels = [
  'Profile Details',
  'Order Details',
  'Cancel Details',
  'Data Analyze',
  'Block ID',
  'High Orders',
  'Wallet',
  'Refer And Earn',
  'Download Invoice'
];

const tabIcons = [
  <AccountCircleIcon fontSize="medium" />, // Profile Details
  <ShoppingCartIcon fontSize="medium" />,  // Order Details
  <CancelIcon fontSize="medium" />,        // Cancel Details
  <BarChartIcon fontSize="medium" />,      // Data Analyze
  <BlockIcon fontSize="medium" />,         // Block ID
  <TrendingUpIcon fontSize="medium" />,    // High Orders
  <AccountBalanceWalletIcon fontSize="medium" />, // Wallet
  <GroupAddIcon fontSize="medium" />,      // Refer And Earn
  <DescriptionIcon fontSize="medium" />    // Download Invoice
];

const initialCustomers = [
  { id: 1, customerId: 'CUST001', name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876543210', photo: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'Active', pinCode: '110001', memberStatus: 'Active', usingApp: { days: 12, months: 2, years: 1 }, blocked: false },
  { id: 2, customerId: 'CUST002', name: 'Bob Smith', email: 'bob@example.com', mobile: '9123456780', photo: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'Inactive', pinCode: '400001', memberStatus: 'Deactive', usingApp: { days: 5, months: 0, years: 0 }, blocked: true },
  { id: 3, customerId: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', mobile: '9988776655', photo: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Active', pinCode: '560001', memberStatus: 'Active', usingApp: { days: 30, months: 1, years: 0 }, blocked: false },
  { id: 4, customerId: 'CUST004', name: 'Priya Singh', email: 'priya@example.com', mobile: '9876512345', photo: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Active', pinCode: '122001', memberStatus: 'Active', usingApp: { days: 10, months: 0, years: 2 }, blocked: true },
  { id: 5, customerId: 'CUST005', name: 'Rohit Sharma', email: 'rohit@example.com', mobile: '9123456790', photo: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'Inactive', pinCode: '700001', memberStatus: 'Deactive', usingApp: { days: 0, months: 0, years: 0 }, blocked: false },
  { id: 6, customerId: 'CUST006', name: 'Suresh Kumar', email: 'suresh@example.com', mobile: '9988776611', photo: 'https://randomuser.me/api/portraits/men/6.jpg', status: 'Active', pinCode: '600001', memberStatus: 'Active', usingApp: { days: 25, months: 3, years: 1 }, blocked: true }
];

// Dummy order data for different vehicle types
const orderData = {
  '2W': [
    { customerId: 'CUST001', customerName: 'Alice Johnson', orderId: 'ORD001', vehicleType: '2W', status: 'Completed', amount: 150, date: '2024-01-15', pickup: 'Mumbai Central', drop: 'Andheri West' },
    { customerId: 'CUST002', customerName: 'Bob Smith', orderId: 'ORD002', vehicleType: '2W', status: 'Canceled', amount: 200, date: '2024-01-16', pickup: 'Bandra East', drop: 'Juhu' },
    { customerId: 'CUST003', customerName: 'Charlie Brown', orderId: 'ORD003', vehicleType: '2W', status: 'Completed', amount: 180, date: '2024-01-17', pickup: 'Dadar West', drop: 'Worli' },
    { customerId: 'CUST004', customerName: 'Priya Singh', orderId: 'ORD004', vehicleType: '2W', status: 'Completed', amount: 120, date: '2024-01-18', pickup: 'Kurla West', drop: 'Ghatkopar' }
  ],
  '3W': [
    { customerId: 'CUST005', customerName: 'Rohit Sharma', orderId: 'ORD005', vehicleType: '3W', status: 'Completed', amount: 250, date: '2024-01-15', pickup: 'Thane West', drop: 'Mulund' },
    { customerId: 'CUST006', customerName: 'Suresh Kumar', orderId: 'ORD006', vehicleType: '3W', status: 'Canceled', amount: 300, date: '2024-01-16', pickup: 'Navi Mumbai', drop: 'Panvel' },
    { customerId: 'CUST007', customerName: 'Meera Patel', orderId: 'ORD007', vehicleType: '3W', status: 'Completed', amount: 220, date: '2024-01-17', pickup: 'Vashi', drop: 'Belapur' }
  ],
  'Truck': [
    { customerId: 'CUST008', customerName: 'Amit Kumar', orderId: 'ORD008', vehicleType: 'Truck', status: 'Completed', amount: 800, date: '2024-01-15', pickup: 'Mumbai Port', drop: 'Bhiwandi' },
    { customerId: 'CUST009', customerName: 'Rajesh Singh', orderId: 'ORD009', vehicleType: 'Truck', status: 'Canceled', amount: 1200, date: '2024-01-16', pickup: 'JNPT', drop: 'Pune' },
    { customerId: 'CUST010', customerName: 'Vikram Malhotra', orderId: 'ORD010', vehicleType: 'Truck', status: 'Completed', amount: 950, date: '2024-01-17', pickup: 'Taloja', drop: 'Kalyan' },
    { customerId: 'CUST011', customerName: 'Sanjay Gupta', orderId: 'ORD011', vehicleType: 'Truck', status: 'Completed', amount: 1100, date: '2024-01-18', pickup: 'Dombivli', drop: 'Thane' }
  ]
};

const tabContent = [
  '', // Profile Details will show the table
  '', // Order Details will show vehicle type tabs
  'Cancel details content goes here.',
  'Data analyze content goes here.',
  'Block ID content goes here.',
  'High orders content goes here.',
  'Wallet content goes here.',
  'Refer and earn content goes here.',
  'Download invoice content goes here.'
];

// Add dummy high order data
const highOrderData = [
  {
    serialNo: 1,
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    orders: [
      {
        orderId: 'ORD1001', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1002', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1003', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1004', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1005', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      }
    ]
  },
  {
    serialNo: 2,
    customerId: 'CUST011',
    customerName: 'Meena Shah',
    orders: [
      {
        orderId: 'ORD2001', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2002', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2003', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2004', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2005', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2006', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      }
    ]
  },
  {
    serialNo: 3,
    customerId: 'CUST012',
    customerName: 'Rajesh Kumar',
    orders: [
      {
        orderId: 'ORD3001', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3002', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3003', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3004', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3005', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3006', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      },
      {
        orderId: 'ORD3007', date: '2024-06-03', receiver: { name: 'Priya Singh', number: '9000000003', pincode: '560001', address: '78, Brigade Road, Bangalore' }
      }
    ]
  },
  {
    serialNo: 4,
    customerId: 'CUST013',
    customerName: 'Anita Patel',
    orders: [
      {
        orderId: 'ORD4001', date: '2024-06-04', receiver: { name: 'Vikram Malhotra', number: '9000000004', pincode: '700001', address: '12, Park Street, Kolkata' }
      },
      {
        orderId: 'ORD4002', date: '2024-06-04', receiver: { name: 'Vikram Malhotra', number: '9000000004', pincode: '700001', address: '12, Park Street, Kolkata' }
      },
      {
        orderId: 'ORD4003', date: '2024-06-04', receiver: { name: 'Vikram Malhotra', number: '9000000004', pincode: '700001', address: '12, Park Street, Kolkata' }
      },
      {
        orderId: 'ORD4004', date: '2024-06-04', receiver: { name: 'Vikram Malhotra', number: '9000000004', pincode: '700001', address: '12, Park Street, Kolkata' }
      },
      {
        orderId: 'ORD4005', date: '2024-06-04', receiver: { name: 'Vikram Malhotra', number: '9000000004', pincode: '700001', address: '12, Park Street, Kolkata' }
      }
    ]
  },
  {
    serialNo: 5,
    customerId: 'CUST014',
    customerName: 'Suresh Verma',
    orders: [
      {
        orderId: 'ORD5001', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5002', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5003', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5004', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5005', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5006', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5007', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      },
      {
        orderId: 'ORD5008', date: '2024-06-05', receiver: { name: 'Neha Gupta', number: '9000000005', pincode: '500001', address: '45, Banjara Hills, Hyderabad' }
      }
    ]
  }
];

// Add dummy wallet data
const walletData = [
  { 
    serialNo: 1,
    customerId: 'CUST001', 
    customerName: 'Alice Johnson',
    topUp: 2000, 
    used: 1500, 
    refund: 0,
    balance: 500,
    lastTransaction: '2024-01-15'
  },
  { 
    serialNo: 2,
    customerId: 'CUST002', 
    customerName: 'Bob Smith',
    topUp: 1000, 
    used: 800, 
    refund: 100,
    balance: 300,
    lastTransaction: '2024-01-16'
  },
  { 
    serialNo: 3,
    customerId: 'CUST003', 
    customerName: 'Charlie Brown',
    topUp: 500, 
    used: 500, 
    refund: 0,
    balance: 0,
    lastTransaction: '2024-01-17'
  },
  { 
    serialNo: 4,
    customerId: 'CUST004', 
    customerName: 'Priya Singh',
    topUp: 3000, 
    used: 2500, 
    refund: 200,
    balance: 700,
    lastTransaction: '2024-01-18'
  },
  { 
    serialNo: 5,
    customerId: 'CUST005', 
    customerName: 'Rohit Sharma',
    topUp: 0, 
    used: 0, 
    refund: 0,
    balance: 0,
    lastTransaction: 'N/A'
  },
  { 
    serialNo: 6,
    customerId: 'CUST006', 
    customerName: 'Suresh Kumar',
    topUp: 1200, 
    used: 1000, 
    refund: 0,
    balance: 200,
    lastTransaction: '2024-01-19'
  },
  { 
    serialNo: 7,
    customerId: 'CUST007', 
    customerName: 'Meera Patel',
    topUp: 2500, 
    used: 1800, 
    refund: 150,
    balance: 850,
    lastTransaction: '2024-01-20'
  },
  { 
    serialNo: 8,
    customerId: 'CUST008', 
    customerName: 'Amit Kumar',
    topUp: 800, 
    used: 600, 
    refund: 0,
    balance: 200,
    lastTransaction: '2024-01-21'
  }
];

// Add dummy refer and earn data
const referAndEarnData = [
  { 
    serialNo: 1,
    customerId: 'CUST001', 
    customerName: 'Alice Johnson',
    mobileNumber: '9876543210',
    city: 'Mumbai',
    referrerName: 'N/A', 
    referrerId: 'N/A',
    earning: 0,
    referralDate: '2024-01-15',
    status: 'Active'
  },
  { 
    serialNo: 2,
    customerId: 'CUST002', 
    customerName: 'Bob Smith',
    mobileNumber: '9876543211',
    city: 'Delhi',
    referrerName: 'Alice Johnson', 
    referrerId: 'CUST001',
    earning: 200,
    referralDate: '2024-01-16',
    status: 'Active'
  },
  { 
    serialNo: 3,
    customerId: 'CUST003', 
    customerName: 'Charlie Brown',
    mobileNumber: '9876543212',
    city: 'Bangalore',
    referrerName: 'Bob Smith', 
    referrerId: 'CUST002',
    earning: 150,
    referralDate: '2024-01-17',
    status: 'Active'
  },
  { 
    serialNo: 4,
    customerId: 'CUST004', 
    customerName: 'Priya Singh',
    mobileNumber: '9876543213',
    city: 'Chennai',
    referrerName: 'Charlie Brown', 
    referrerId: 'CUST003',
    earning: 100,
    referralDate: '2024-01-18',
    status: 'Active'
  },
  { 
    serialNo: 5,
    customerId: 'CUST005', 
    customerName: 'Rohit Sharma',
    mobileNumber: '9876543214',
    city: 'Hyderabad',
    referrerName: 'Priya Singh', 
    referrerId: 'CUST004',
    earning: 0,
    referralDate: '2024-01-19',
    status: 'Pending'
  },
  { 
    serialNo: 6,
    customerId: 'CUST006', 
    customerName: 'Suresh Kumar',
    mobileNumber: '9876543215',
    city: 'Pune',
    referrerName: 'Rohit Sharma', 
    referrerId: 'CUST005',
    earning: 50,
    referralDate: '2024-01-20',
    status: 'Active'
  },
  { 
    serialNo: 7,
    customerId: 'CUST007', 
    customerName: 'Meera Patel',
    mobileNumber: '9876543216',
    city: 'Kolkata',
    referrerName: 'Alice Johnson', 
    referrerId: 'CUST001',
    earning: 300,
    referralDate: '2024-01-21',
    status: 'Active'
  },
  { 
    serialNo: 8,
    customerId: 'CUST008', 
    customerName: 'Amit Kumar',
    mobileNumber: '9876543217',
    city: 'Ahmedabad',
    referrerName: 'Bob Smith', 
    referrerId: 'CUST002',
    earning: 75,
    referralDate: '2024-01-22',
    status: 'Active'
  }
];

// Add dummy cancel details data at the top (after walletData or similar)
const cancelDetailsData = [
  { id: 1, customerName: 'Alice Johnson', reason: 'Changed mind', date: '2024-06-01', details: 'Customer decided not to proceed with the order.' },
  { id: 2, customerName: 'Bob Smith', reason: 'Found cheaper option', date: '2024-06-02', details: 'Customer found a better price elsewhere.' },
  { id: 3, customerName: 'Charlie Brown', reason: 'Delayed delivery', date: '2024-06-03', details: 'Order was delayed, customer cancelled.' },
];

// Add dummy download invoice data at the top (after cancelDetailsData or similar)
const downloadInvoiceData = [
  { id: 1, customerName: 'Alice Johnson', downloadCount: 3, email: 'alice@example.com' },
  { id: 2, customerName: 'Bob Smith', downloadCount: 1, email: 'bob@example.com' },
  { id: 3, customerName: 'Charlie Brown', downloadCount: 2, email: 'charlie@example.com' },
];

const ManageCustomer = () => {
  const [tab, setTab] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState({});
  const [vehicleTypeTab, setVehicleTypeTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [referralSearchTerm, setReferralSearchTerm] = useState('');
  const [walletSearchTerm, setWalletSearchTerm] = useState('');
  const [highOrderSearchTerm, setHighOrderSearchTerm] = useState('');
  const [blockIdSearchTerm, setBlockIdSearchTerm] = useState('');
  const [dataAnalyzeSearchTerm, setDataAnalyzeSearchTerm] = useState('');
  const [profileDetailsSearchTerm, setProfileDetailsSearchTerm] = useState('');
  const [orderDetailsSearchTerm, setOrderDetailsSearchTerm] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedCancel, setSelectedCancel] = useState(null);
  const navigate = useNavigate();

  // Add state for Data Analyze filters
  const [dataAnalyzeDateFilter, setDataAnalyzeDateFilter] = useState('all'); // 'all', 'today', 'week', 'month', 'year', 'custom'
  const [dataAnalyzeCustomDate, setDataAnalyzeCustomDate] = useState('');
  const [dataAnalyzePincode, setDataAnalyzePincode] = useState('');

  // Add state for cancel details date filter
  const [cancelDateFilter, setCancelDateFilter] = useState('all'); // 'all', 'today', 'week', 'month', 'year', 'custom'
  const [cancelCustomDate, setCancelCustomDate] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [loadingUserBookings, setLoadingUserBookings] = useState(false);

  // Edit handlers
  const handleEditOpen = (customer) => {
    setEditCustomer(customer);
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSave = () => {
    setCustomers((prev) => prev.map((c) => (c.id === editCustomer.id ? { ...editCustomer } : c)));
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  // Delete handlers
  const handleDeleteOpen = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    setDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'success' : 'error';
  };

  // Filtered customers for Profile Details tab
  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
      (customer.mobile || '').includes(searchTerm || '')
  );

  // Filtered referral data for Refer and Earn tab
  const filteredReferralData = referAndEarnData.filter(
    (referral) =>
      (referral.customerName || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.customerId || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.mobileNumber || '').includes(referralSearchTerm || '') ||
      (referral.city || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.referrerName || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase()) ||
      (referral.referrerId || '').toLowerCase().includes((referralSearchTerm || '').toLowerCase())
  );

  // Filtered wallet data for Wallet tab
  const filteredWalletData = walletData.filter(
    (wallet) =>
      (wallet.customerName || '').toLowerCase().includes((walletSearchTerm || '').toLowerCase()) ||
      (wallet.customerId || '').toLowerCase().includes((walletSearchTerm || '').toLowerCase())
  );

  // Filtered high order data for High Orders tab
  const filteredHighOrderData = highOrderData.filter(
    (highOrder) =>
      (highOrder.customerName || '').toLowerCase().includes((highOrderSearchTerm || '').toLowerCase()) ||
      (highOrder.customerId || '').toLowerCase().includes((highOrderSearchTerm || '').toLowerCase())
  );

  // Filtered customers for Block ID tab
  const filteredBlockIdCustomers = customers.filter(
    (customer) =>
      (customer.name || '').toLowerCase().includes((blockIdSearchTerm || '').toLowerCase()) ||
      (customer.customerId || '').toLowerCase().includes((blockIdSearchTerm || '').toLowerCase())
  );

  // Filtered customers for Data Analyze tab
  const filteredDataAnalyzeCustomers = customers.filter(
    (customer) =>
      (customer.name || '').toLowerCase().includes((dataAnalyzeSearchTerm || '').toLowerCase()) ||
      (customer.customerId || '').toLowerCase().includes((dataAnalyzeSearchTerm || '').toLowerCase())
  );

  // Filtered customers for Profile Details tab
  const filteredProfileDetailsCustomers = customers.filter(
    (customer) =>
      (customer.name || '').toLowerCase().includes((profileDetailsSearchTerm || '').toLowerCase()) ||
      (customer.customerId || '').toLowerCase().includes((profileDetailsSearchTerm || '').toLowerCase())
  );

  // Filtered order data for Order Details tab
  const getFilteredOrderData = (vehicleType) => {
    return orderData[vehicleType]?.filter(
      (order) =>
        (order.customerName || '').toLowerCase().includes((orderDetailsSearchTerm || '').toLowerCase()) ||
        (order.customerId || '').toLowerCase().includes((orderDetailsSearchTerm || '').toLowerCase())
    ) || [];
  };

  // Helper function to filter cancel details by date
  const filterCancelDetails = (data) => {
    if (cancelDateFilter === 'all') return data;
    const now = new Date();
    return data.filter(row => {
      const cancelDate = new Date(row.date);
      if (cancelDateFilter === 'today') {
        return cancelDate.toDateString() === now.toDateString();
      } else if (cancelDateFilter === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return cancelDate >= weekAgo && cancelDate <= now;
      } else if (cancelDateFilter === 'month') {
        return cancelDate.getMonth() === now.getMonth() && cancelDate.getFullYear() === now.getFullYear();
      } else if (cancelDateFilter === 'year') {
        return cancelDate.getFullYear() === now.getFullYear();
      } else if (cancelDateFilter === 'custom' && cancelCustomDate) {
        return cancelDate.toDateString() === new Date(cancelCustomDate).toDateString();
      }
      return true;
    });
  };

  // Fetch customers from backend API on mount
  useEffect(() => {
    setLoading(true);
    
    // Fetch all users and filter by role='customer'
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
        
        // Filter users to only show customers (role === 'customer')
        const customerUsers = users.filter(user => 
          (user.role || '').toLowerCase() === 'customer' || 
          (user.userType || '').toLowerCase() === 'customer' ||
          (user.type || '').toLowerCase() === 'customer'
        );
        
        setAllUsers(customerUsers);
        setCustomers(customerUsers); // Set customers to the filtered customer users
      })
      .catch((err) => {
        console.error('Failed to fetch users:', err);
        setAllUsers([]);
        setCustomers([]);
      })
      .finally(() => setLoading(false));
      
    // Also fetch customer bookings as backup
    getAllCustomerBookings()
      .then((data) => {
        if (data && Array.isArray(data.customers)) {
          // Only use this if we don't have customer users from GetAlluser
          if (customers.length === 0) {
            setCustomers(data.customers);
          }
        } else if (data && Array.isArray(data.customer)) {
          if (customers.length === 0) {
            setCustomers(data.customer);
          }
        } else if (Array.isArray(data)) {
          if (customers.length === 0) {
            setCustomers(data);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch customer bookings:', err);
        // Don't clear customers here as we might have data from GetAlluser
      });
  }, []);

  // Fetch bookings for selected user
  const handleShowBookings = (userId) => {
    setSelectedUserId(userId);
    setLoadingUserBookings(true);
    getAllOrderBookings()
      .then((data) => {
        let bookings = [];
        if (data && Array.isArray(data.bookings)) {
          bookings = data.bookings;
        } else if (data && Array.isArray(data.booking)) {
          bookings = data.booking;
        } else if (Array.isArray(data)) {
          bookings = data;
        }
        setUserBookings(bookings.filter(b => b.userId === userId));
      })
      .catch(() => setUserBookings([]))
      .finally(() => setOpenBookingDialog(true), setLoadingUserBookings(false));
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 500, mt: 5 }}>
      <h1>Customer Management</h1>
      {/* All Users Table */}
      {/* <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          All Users (from Admin API)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Mobile</b></TableCell>
                <TableCell><b>Role</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.map((user, idx) => (
                  <TableRow key={user._id || idx}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.number || user.mobile}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
      {/* Customer Bookings Table */}
      {/* <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Customer Bookings
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Customer ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Mobile</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No customer bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer, idx) => (
                  <TableRow key={customer._id || customer.id || idx}>
                    <TableCell>{customer._id || customer.customerId}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.mobile || customer.number}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => handleShowBookings(customer._id || customer.customerId)}>
                        Show Orders
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
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
          <Typography variant="h5" color="primary" gutterBottom>
            {tabLabels[tab]}
          </Typography>
          {tab === 0 ? (
            <Box>
              {/* Search Bar for Profile Details */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by customer name, customer ID, or mobile number..."
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
                      {/* <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Photo</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Mobile Number</b></TableCell>
                      <TableCell><b>Email ID</b></TableCell>
                      <TableCell><b>Pin Code</b></TableCell> */}
                          <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Mobile</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {filteredProfileDetailsCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {profileDetailsSearchTerm ? 'No customers found matching your search.' : 'No customers available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProfileDetailsCustomers.map((customer, idx) => (
                      <TableRow key={customer.id} hover>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {idx + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {customer.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Avatar 
                              src={customer.photo} 
                              alt={customer.name}
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
                            onClick={() => navigate(`/customers/${customer.customerId}`)}
                          >
                            {customer.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {customer.mobile}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {customer.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                              {customer.pinCode}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={customer.status}
                              color={customer.status === 'Active' ? 'success' : 'error'}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                color="primary" 
                                onClick={(e) => { e.stopPropagation(); handleEditOpen(customer); }}
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
                                onClick={(e) => { e.stopPropagation(); handleDeleteOpen(customer); }}
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
                  </TableBody> */}

<TableBody>
              {allUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.map((user, idx) => (
                  <TableRow key={user._id || idx}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.number || user.mobile}</TableCell>
                    <TableCell>{user.role}</TableCell>
                      </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 1 ? (
            // Order Details Tab
            <Box>
              {/* Search Bar for Order Details */}
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

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                {/* <Tabs value={vehicleTypeTab} onChange={handleVehicleTypeChange}>
                {vehicleTypes.map((type, index) => (
                  <Tab key={type} label={type} />
                ))}
              </Tabs> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/orders')}
                  sx={{ ml: 2 }}
                >
                  View All Orders
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Order ID</b></TableCell>
                      <TableCell><b>Vehicle Type</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Amount (₹)</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell><b>Pickup</b></TableCell>
                      <TableCell><b>Drop</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredOrderData('2W').length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {orderDetailsSearchTerm ? 'No orders found matching your search.' : 'No orders available for this vehicle type.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      getFilteredOrderData('2W').map((order, index) => (
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
                                {order.customerName[0]}
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
                              label={order.vehicleType} 
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
                              ₹{order.amount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(order.date).toLocaleDateString()}
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
            // Cancel Details Tab
            <Box>
              {/* Date Range Filter Buttons */}
              <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant={cancelDateFilter === 'all' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('all')}>All</Button>
                <Button variant={cancelDateFilter === 'today' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('today')}>Today</Button>
                <Button variant={cancelDateFilter === 'week' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('week')}>Weekly</Button>
                <Button variant={cancelDateFilter === 'month' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('month')}>Monthly</Button>
                <Button variant={cancelDateFilter === 'year' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('year')}>Yearly</Button>
                <Button variant={cancelDateFilter === 'custom' ? 'contained' : 'outlined'} onClick={() => setCancelDateFilter('custom')}>Custom Date</Button>
                {cancelDateFilter === 'custom' && (
                  <TextField
                    type="date"
                    size="small"
                    value={cancelCustomDate}
                    onChange={e => setCancelCustomDate(e.target.value)}
                    sx={{ ml: 1, minWidth: 150 }}
                  />
                )}
              </Box>
              {/* Search Bar for Cancel Details */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search by customer name or customer ID..."
                  value={searchTerm} // Reusing searchTerm for cancel details
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ flexGrow: 1, maxWidth: 500 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setSearchTerm('')}
                  disabled={!searchTerm}
                >
                  Clear
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Reason for Cancel</b></TableCell>
                      <TableCell><b>Cancel Date</b></TableCell>
                      <TableCell><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterCancelDetails(cancelDetailsData).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                            No cancel details available.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterCancelDetails(cancelDetailsData).map((row, idx) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{row.customerName}</TableCell>
                          <TableCell>{row.reason}</TableCell>
                          <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <IconButton color="primary" onClick={() => { setSelectedCancel(row); setCancelDialogOpen(true); }}>
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Cancel Details Dialog */}
              <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Cancel Details</DialogTitle>
                <DialogContent dividers>
                  {selectedCancel && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Customer Name: {selectedCancel.customerName}</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Reason: {selectedCancel.reason}</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Cancel Date: {new Date(selectedCancel.date).toLocaleDateString()}</Typography>
                      <Typography variant="body1" sx={{ mt: 2 }}>{selectedCancel.details}</Typography>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setCancelDialogOpen(false)} color="primary">Close</Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : tab === 3 ? (
            // Data Analyze Tab
            <Box>
              {/* Filters */}
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <TextField
                  select
                  label="Date Range"
                  value={dataAnalyzeDateFilter}
                  onChange={(e) => setDataAnalyzeDateFilter(e.target.value)}
                  size="small"
                  sx={{ width: 160 }}
                  SelectProps={{ native: true }}
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Date</option>
                </TextField>
                {dataAnalyzeDateFilter === 'custom' && (
                  <TextField
                    type="date"
                    value={dataAnalyzeCustomDate}
                    onChange={(e) => setDataAnalyzeCustomDate(e.target.value)}
                    size="small"
                    sx={{ width: 160 }}
                  />
                )}
                <TextField
                  label="Pincode"
                  placeholder="Filter by pincode"
                  value={dataAnalyzePincode}
                  onChange={(e) => setDataAnalyzePincode(e.target.value)}
                  size="small"
                  sx={{ width: 140 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Using App Duration</b></TableCell>
                      <TableCell><b>Pin Code</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDataAnalyzeCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                            No customers found for the selected filters.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDataAnalyzeCustomers.map((customer, idx) => (
                        <TableRow key={customer.id} hover>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: 'primary.dark' } }}
                              onClick={() => navigate(`/customers/${customer.customerId}`)}
                            >
                              {customer.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              {customer.usingApp.years > 0 && (
                                <Chip label={`${customer.usingApp.years} Year(s)`} color="primary" size="small" variant="outlined" />
                              )}
                              {customer.usingApp.months > 0 && (
                                <Chip label={`${customer.usingApp.months} Month(s)`} color="secondary" size="small" variant="outlined" />
                              )}
                              {customer.usingApp.days > 0 && (
                                <Chip label={`${customer.usingApp.days} Day(s)`} color="info" size="small" variant="outlined" />
                              )}
                              {customer.usingApp.years === 0 && customer.usingApp.months === 0 && customer.usingApp.days === 0 && (
                                <Typography variant="caption" color="text.secondary">—</Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>{customer.pinCode}</TableCell>
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
                  placeholder="Search by customer name or customer ID..."
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
                    <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Mobile</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {filteredBlockIdCustomers.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              {blockIdSearchTerm ? 'No customers found matching your search.' : 'No customers available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                    </TableRow>
                  ) : (
                      filteredBlockIdCustomers.map((customer, idx) => (
                        <TableRow key={customer.id} hover>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {idx + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {customer.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={customer.photo} 
                                alt={customer.name}
                                sx={{ mr: 2, width: 32, height: 32, fontSize: '0.875rem' }}
                              >
                                {customer.name[0]}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {customer.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {customer.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {customer.mobile}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={customer.blocked ? "Blocked" : "Active"} 
                              color={customer.blocked ? "error" : "success"} 
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                        </TableCell>
                        <TableCell>
                          {customer.blocked ? (
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => {
                                setCustomers((prev) => prev.map((c) => c.id === customer.id ? { ...c, blocked: false } : c));
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
                                setCustomers((prev) => prev.map((c) => c.id === customer.id ? { ...c, blocked: true } : c));
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
                  placeholder="Search by customer name or customer ID..."
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
                      <TableCell><b>Customer ID</b></TableCell>
                    <TableCell><b>Customer Name</b></TableCell>
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
                              {highOrderSearchTerm ? 'No high order customers found matching your search.' : 'No high order data available.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredHighOrderData.map((customer, idx) => (
                        <TableRow key={idx} hover>
                      <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {customer.serialNo}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {customer.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                {customer.customerName[0]}
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
                                onClick={() => navigate(`/customers/${customer.customerId}/orders`)}
                              >
                                {customer.customerName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${customer.orders.length} Orders`}
                              color="success"
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {customer.orders.map((order, i) => (
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
                        {customer.orders.map((order, i) => (
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
                  placeholder="Search by customer name or customer ID..."
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
                    <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
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
                              {row.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/customer/${row.customerId}`)}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                {row.customerName[0]}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 600, textDecoration: 'underline', color: 'primary.dark' }}>
                                {row.customerName}
                              </Typography>
                            </Box>
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
                            </Typography                          </TableCell>
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
                  placeholder="Search by customer name, ID, referrer name, or referrer ID..."
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
                    <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
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
                              {row.customerId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                {row.customerName[0]}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {row.customerName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {row.mobileNumber}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {row.city}
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
          ) : tab === 8 ? (
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Download Count</b></TableCell>
                      <TableCell><b>Email ID</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {downloadInvoiceData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                            No invoice download data available.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      downloadInvoiceData.map((row, idx) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{row.customerName}</TableCell>
                          <TableCell>{row.downloadCount}</TableCell>
                          <TableCell>{row.email}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography variant="body1">{tabContent[tab]}</Typography>
          )}
        </Paper>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent dividers>
          <TextField label="Name" name="name" value={editCustomer.name || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Mobile Number" name="mobile" value={editCustomer.mobile || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Email ID" name="email" value={editCustomer.email || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Pin Code" name="pinCode" value={editCustomer.pinCode || ''} onChange={handleEditChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete this customer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Booking Details Dialog */}
      <Dialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Booking Details for User ID: {selectedUserId}</DialogTitle>
        <DialogContent dividers>
          {loadingUserBookings ? (
            <Typography>Loading...</Typography>
          ) : userBookings.length === 0 ? (
            <Typography>No bookings found for this user.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Booking ID</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Amount</b></TableCell>
                    <TableCell><b>Pickup</b></TableCell>
                    <TableCell><b>Drop</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userBookings.map((booking, idx) => (
                    <TableRow key={booking._id || idx}>
                      <TableCell>{booking._id || booking.bookingId}</TableCell>
                      <TableCell>{booking.date ? new Date(booking.date).toLocaleDateString() : ''}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{booking.pickup}</TableCell>
                      <TableCell>{booking.drop}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBookingDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCustomer;