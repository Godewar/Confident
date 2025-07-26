import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const initialCities = [
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Ahmedabad',
];

export default function ServiceCityStatus() {
  const { vehicleType, subType } = useParams();
  const [cities, setCities] = useState(initialCities);
  const [status, setStatus] = useState({
    Bengaluru: true,
    Hyderabad: false,
    Mumbai: true,
    Delhi: false,
    Ahmedabad: true,
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [editCityIdx, setEditCityIdx] = useState(null);
  const [editCityName, setEditCityName] = useState('');
  const [deleteCityIdx, setDeleteCityIdx] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (city) => {
    setStatus((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  const handleAddCity = () => {
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setStatus((prev) => ({ ...prev, [newCity]: false }));
    }
    setNewCity('');
    setAddDialogOpen(false);
  };

  const handleEditCity = () => {
    if (editCityName && editCityIdx !== null) {
      const oldName = cities[editCityIdx];
      const updatedCities = [...cities];
      updatedCities[editCityIdx] = editCityName;
      setCities(updatedCities);
      setStatus((prev) => {
        const newStatus = { ...prev };
        newStatus[editCityName] = newStatus[oldName];
        delete newStatus[oldName];
        return newStatus;
      });
    }
    setEditDialogOpen(false);
    setEditCityIdx(null);
    setEditCityName('');
  };

  const handleDeleteCity = () => {
    if (deleteCityIdx !== null) {
      const cityToDelete = cities[deleteCityIdx];
      setCities(cities.filter((_, idx) => idx !== deleteCityIdx));
      setStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[cityToDelete];
        return newStatus;
      });
    }
    setDeleteDialogOpen(false);
    setDeleteCityIdx(null);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', mt: 6, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} color="primary" size="large">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        {subType} Service Status by City
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 3, alignSelf: 'flex-end' }} onClick={() => setAddDialogOpen(true)}>
        Add City
      </Button>
      <Box sx={{ width: '100%', maxWidth: 900, overflowX: 'auto', p: 0, borderRadius: 2, border: '1px solid #eee', background: 'none' }}>
        <Table sx={{ minWidth: 600, background: 'none', '& th, & td': { border: 'none' }, '& tbody tr:hover': { background: '#f5f7fa' } }}>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city, idx) => (
              <TableRow key={city}>
                <TableCell>{city}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={!!status[city]}
                    onChange={() => handleToggle(city)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => { setEditDialogOpen(true); setEditCityIdx(idx); setEditCityName(city); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => { setDeleteDialogOpen(true); setDeleteCityIdx(idx); }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {cities.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">No cities found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {/* Add City Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add City</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            value={newCity}
            onChange={e => setNewCity(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCity} disabled={!newCity || cities.includes(newCity)}>Add</Button>
        </DialogActions>
      </Dialog>
      {/* Edit City Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            value={editCityName}
            onChange={e => setEditCityName(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditCity} disabled={!editCityName || cities.includes(editCityName)}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete City Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete City</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this city?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteCity}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 