import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getAllOrderBookings } from '../../api/menu';

const statusColors = {
  completed: 'success',
  pending: 'warning',
  canceled: 'error',
  active: 'info',
  completed: 'success',
  cancelled: 'error',
  pending: 'warning',
  ongoing: 'info',
  finished: 'success',
  cancelled: 'error'
};

export default function OrdersList() {
  const { filterType } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllOrderBookings();
        
        // Handle different possible response structures
        let ordersData = [];
        if (data && Array.isArray(data.bookings)) {
          ordersData = data.bookings;
        } else if (data && Array.isArray(data.booking)) {
          ordersData = data.booking;
        } else if (Array.isArray(data)) {
          ordersData = data;
        }
        
        setOrders(ordersData);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status
  let filtered = orders;
  if (filterType === 'completed') {
    filtered = orders.filter(order => 
      (order.status || '').toLowerCase() === 'completed' || 
      (order.status || '').toLowerCase() === 'finished'
    );
  } else if (filterType === 'pending') {
    filtered = orders.filter(order => 
      (order.status || '').toLowerCase() === 'pending'
    );
  } else if (filterType === 'canceled' || filterType === 'cancelled') {
    filtered = orders.filter(order => 
      (order.status || '').toLowerCase() === 'canceled' || 
      (order.status || '').toLowerCase() === 'cancelled'
    );
  } else if (filterType === 'active') {
    filtered = orders.filter(order => 
      (order.status || '').toLowerCase() === 'active' || 
      (order.status || '').toLowerCase() === 'ongoing'
    );
  }
  // else 'all' or unknown: show all

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN');
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return 'N/A';
    return `₹${amount}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 6, p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 6, p: 2 }}>
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        {filterType === 'all' ? 'All Orders' : filterType.charAt(0).toUpperCase() + filterType.slice(1) + ' Orders'}
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Vehicle Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((order, idx) => (
              <TableRow key={order._id || order.bookingId || idx}>
                <TableCell>{order._id || order.bookingId || `ORD${String(idx + 1).padStart(3, '0')}`}</TableCell>
                <TableCell>
                  {order.userId?.name || order.customerName || order.userName || 'N/A'}
                </TableCell>
                <TableCell>
                  {order.driverId?.name || order.driverName || 'N/A'}
                </TableCell>
                <TableCell>{formatDate(order.createdAt || order.bookingDate || order.date)}</TableCell>
                <TableCell>
                  <Chip 
                    label={(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)} 
                    color={statusColors[(order.status || '').toLowerCase()] || 'default'} 
                  />
                </TableCell>
                <TableCell>{formatAmount(order.amount || order.totalAmount || order.price)}</TableCell>
                <TableCell>{order.vehicleType || order.vehicle?.type || 'N/A'}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 