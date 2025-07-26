import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const timeSlots = [
  '9 AM - 12 PM',
  '12 PM - 4 PM',
  '4 PM - 8 PM',
  '8 PM - 12 AM',
  '12 AM - 9 AM',
];

export default function AddPrice() {
  const { vehicleType, subType } = useParams();
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [entries, setEntries] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({ hours: '', rate: '', time: '' });

  const handleSave = () => {
    if (!hours || !rate || !time) return;
    setEntries([
      ...entries,
      { hours, rate, time, mode: 'hourly' }
    ]);
    setHours('');
    setRate('');
    setTime('');
  };

  const handleDelete = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  const handleEditOpen = (idx) => {
    setEditIdx(idx);
    setEditData(entries[idx]);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setEntries(entries.map((entry, i) => (i === editIdx ? editData : entry)));
    setEditDialogOpen(false);
    setEditIdx(null);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 6 }, boxSizing: 'border-box' }}>
      <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Add Price - Hourly Basis
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <TextField
            label="Hours (e.g. 1, 2, 3)"
            value={hours}
            onChange={e => setHours(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <TextField
            label="Rate (Rs)"
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel id="time-slot-label">Time</InputLabel>
            <Select
              labelId="time-slot-label"
              value={time}
              label="Time"
              onChange={e => setTime(e.target.value)}
            >
              {timeSlots.map(slot => (
                <MenuItem key={slot} value={slot}>{slot}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" size="large" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 2 }}>
          <TableContainer sx={{ borderRadius: 3, boxShadow: 2, bgcolor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hours</TableCell>
                  <TableCell>Rate (Rs)</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.hours}</TableCell>
                    <TableCell>{entry.rate}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>Hourly</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditOpen(idx)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {entries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No price entries yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Price Entry</DialogTitle>
        <DialogContent>
          <TextField
            label="Hours"
            value={editData.hours}
            onChange={e => setEditData({ ...editData, hours: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rate (Rs)"
            type="number"
            value={editData.rate}
            onChange={e => setEditData({ ...editData, rate: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="edit-time-slot-label">Time</InputLabel>
            <Select
              labelId="edit-time-slot-label"
              value={editData.time}
              label="Time"
              onChange={e => setEditData({ ...editData, time: e.target.value })}
            >
              {timeSlots.map(slot => (
                <MenuItem key={slot} value={slot}>{slot}</MenuItem>
              ))}
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