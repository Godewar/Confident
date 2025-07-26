import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const initialVehicles = [
  {
    regNo: 'MH12AB1234',
    partnerName: 'Rahul Sharma',
    partnerMobile: '9876543210',
    joiningDate: '2023-01-15',
    city: 'Pune',
    status: 'Active',
  },
  {
    regNo: 'MH14XY5678',
    partnerName: 'Priya Singh',
    partnerMobile: '9123456789',
    joiningDate: '2022-11-10',
    city: 'Mumbai',
    status: 'Inactive',
  },
];

const statusOptions = ['Active', 'Inactive'];

export default function VehicleList() {
  const { vehicleType, subType } = useParams();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('');
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ regNo: '', partnerName: '', partnerMobile: '', joiningDate: '', city: '', status: 'Active' });

  // Date filter logic
  const now = dayjs();
  let filteredByDate = vehicles;
  if (filterPeriod === 'Weekly') {
    filteredByDate = vehicles.filter(v => dayjs(v.joiningDate).isAfter(now.subtract(7, 'day')));
  } else if (filterPeriod === 'Monthly') {
    filteredByDate = vehicles.filter(v => dayjs(v.joiningDate).isAfter(now.subtract(1, 'month')));
  } else if (filterPeriod === 'Yearly') {
    filteredByDate = vehicles.filter(v => dayjs(v.joiningDate).isAfter(now.subtract(1, 'year')));
  } else if (filterPeriod === 'Custom' && customStart && customEnd) {
    filteredByDate = vehicles.filter(v => {
      const d = dayjs(v.joiningDate);
      return d.isAfter(dayjs(customStart).subtract(1, 'day')) && d.isBefore(dayjs(customEnd).add(1, 'day'));
    });
  }

  // Filtered and searched vehicles
  const filteredVehicles = filteredByDate.filter(v => {
    const matchesSearch =
      v.regNo.toLowerCase().includes(search.toLowerCase()) ||
      v.partnerName.toLowerCase().includes(search.toLowerCase()) ||
      v.partnerMobile.includes(search) ||
      v.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? v.status === filterStatus : true;
    const matchesCity = filterCity ? v.city.toLowerCase() === filterCity.toLowerCase() : true;
    return matchesSearch && matchesStatus && matchesCity;
  });

  // Add new vehicle
  const handleAdd = () => {
    setVehicles([...vehicles, form]);
    setAddDialogOpen(false);
    setForm({ regNo: '', partnerName: '', partnerMobile: '', joiningDate: '', city: '', status: 'Active' });
  };

  // Edit vehicle
  const handleEditOpen = idx => {
    setEditIdx(idx);
    setForm(vehicles[idx]);
    setEditDialogOpen(true);
  };
  const handleEditSave = () => {
    setVehicles(vehicles.map((v, i) => (i === editIdx ? form : v)));
    setEditDialogOpen(false);
    setEditIdx(null);
    setForm({ regNo: '', partnerName: '', partnerMobile: '', joiningDate: '', city: '', status: 'Active' });
  };

  // Delete vehicle
  const handleDelete = idx => {
    setVehicles(vehicles.filter((_, i) => i !== idx));
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 6 }, boxSizing: 'border-box' }}>
      <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        {subType} Vehicles List
      </Typography>
      {/* Search and Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" sx={{ minWidth: 180 }} />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} label="Status" onChange={e => setFilterStatus(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {statusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="City" value={filterCity} onChange={e => setFilterCity(e.target.value)} size="small" sx={{ minWidth: 120 }} />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Period</InputLabel>
          <Select value={filterPeriod} label="Period" onChange={e => setFilterPeriod(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
        </FormControl>
        {filterPeriod === 'Custom' && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={customStart}
              onChange={setCustomStart}
              slotProps={{ textField: { size: 'small', sx: { minWidth: 120 } } }}
            />
            <DatePicker
              label="End Date"
              value={customEnd}
              onChange={setCustomEnd}
              slotProps={{ textField: { size: 'small', sx: { minWidth: 120 } } }}
            />
          </LocalizationProvider>
        )}
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)} sx={{ ml: 'auto' }}>
          Add Vehicle
        </Button>
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto', bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, maxWidth: '100vw', mx: 'auto', p: 0 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Vehicle Registration No.</TableCell>
              <TableCell>Partner Name</TableCell>
              <TableCell>Partner Mobile Number</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((v, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/driver/details/${encodeURIComponent(v.regNo)}`} color="primary">
                    {v.regNo}
                  </Button>
                </TableCell>
                <TableCell>{v.partnerName}</TableCell>
                <TableCell>{v.partnerMobile}</TableCell>
                <TableCell>{v.joiningDate}</TableCell>
                <TableCell>{v.city}</TableCell>
                <TableCell>
                  <Chip label={v.status} color={v.status === 'Active' ? 'success' : 'default'} />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditOpen(idx)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredVehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">No vehicles found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Vehicle</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField label="Vehicle Registration No." value={form.regNo} onChange={e => setForm({ ...form, regNo: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Partner Name" value={form.partnerName} onChange={e => setForm({ ...form, partnerName: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Partner Mobile Number" value={form.partnerMobile} onChange={e => setForm({ ...form, partnerMobile: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Joining Date" type="date" value={form.joiningDate} onChange={e => setForm({ ...form, joiningDate: e.target.value })} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={form.status} label="Status" onChange={e => setForm({ ...form, status: e.target.value })}>
              {statusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField label="Vehicle Registration No." value={form.regNo} onChange={e => setForm({ ...form, regNo: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Partner Name" value={form.partnerName} onChange={e => setForm({ ...form, partnerName: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Partner Mobile Number" value={form.partnerMobile} onChange={e => setForm({ ...form, partnerMobile: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Joining Date" type="date" value={form.joiningDate} onChange={e => setForm({ ...form, joiningDate: e.target.value })} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={form.status} label="Status" onChange={e => setForm({ ...form, status: e.target.value })}>
              {statusOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 