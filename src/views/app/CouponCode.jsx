import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, InputAdornment } from '@mui/material';

export default function CouponCode() {
  const [couponId, setCouponId] = useState('');
  const [validity, setValidity] = useState('');
  const [discount, setDiscount] = useState('10');
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (couponId && validity && discount) setApplied(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, boxShadow: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'primary.main', textAlign: 'center' }}>
          Coupon Code
        </Typography>
        <TextField
          label="Coupon ID"
          value={couponId}
          onChange={e => setCouponId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Validity Date"
          type="date"
          value={validity}
          onChange={e => setValidity(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Percentage Discount"
          type="number"
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ fontWeight: 700, py: 1.2 }} onClick={handleApply}>
          Get {discount || 10}% Discount
        </Button>
        {applied && (
          <Alert severity="success" sx={{ mt: 3, fontWeight: 600 }}>
            Coupon ({couponId}) applied! {discount || 10}% discount.<br />
            Valid till: {validity}
          </Alert>
        )}
      </Paper>
    </Box>
  );
} 