import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const roles = ['Admin', 'Driver', 'Manager'];
const statusOptions = ['Active', 'Suspended', 'Pending'];

const initialUser = {
  fullName: '',
  email: '',
  mobile: '',
  role: '',
  status: 'Active',
};

// Mock API
const mockApi = {
  users: [
    { id: 1, fullName: 'John Doe', email: 'john@example.com', mobile: '9876543210', role: 'Admin', status: 'Active' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', mobile: '9123456780', role: 'Manager', status: 'Pending' },
    { id: 3, fullName: 'Amit Kumar', email: 'amit@example.com', mobile: '9988776655', role: 'Driver', status: 'Suspended' },
  ],
  fetchUsers: function () {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.users), 500);
    });
  },
  addUser: function (user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: Date.now() };
        this.users.push(newUser);
        resolve(newUser);
      }, 700);
    });
  },
  updateUser: function (id, user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) return reject('User not found');
        this.users[idx] = { ...this.users[idx], ...user };
        resolve(this.users[idx]);
      }, 700);
    });
  },
  deleteUser: function (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) return reject('User not found');
        this.users.splice(idx, 1);
        resolve();
      }, 700);
    });
  },
};

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState(initialUser);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch users
  const fetchUsers = () => {
    setLoading(true);
    mockApi.fetchUsers().then((data) => {
      setUsers([...data]);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDialogOpen = (type, user = null) => {
    setDialogType(type);
    if (type === 'edit' && user) {
      setForm({ ...user });
      setEditId(user.id);
    } else {
      setForm(initialUser);
      setEditId(null);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm(initialUser);
    setEditId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (dialogType === 'add') {
        await mockApi.addUser(form);
        setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
      } else if (dialogType === 'edit') {
        await mockApi.updateUser(editId, form);
        setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
      }
      fetchUsers();
      handleDialogClose();
    } catch {
      setSnackbar({ open: true, message: 'Operation failed.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await mockApi.deleteUser(deleteId);
      setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'info' });
      fetchUsers();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete user.', severity: 'error' });
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
          All Users
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleDialogOpen('add')} sx={{ borderRadius: 2, fontWeight: 600, px: 3, boxShadow: 'none', textTransform: 'none' }}>
          Add User
        </Button>
      </Box>
      <TableContainer sx={{ background: 'none', boxShadow: 'none', borderRadius: 2 }}>
        <Table sx={{ minWidth: 800 }} aria-label="user-table">
          <TableHead>
            <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TableCell sx={{ fontWeight: 700, width: 60 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center"><CircularProgress /></TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: 'text.secondary', py: 5, fontSize: 16 }}>
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, idx) => (
                <TableRow key={user.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: 'rgba(0,0,0,0.03)' } }}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDialogOpen('edit', user)} sx={{ transition: 'color 0.2s', '&:hover': { color: 'secondary.main' } }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { setDeleteId(user.id); setDeleteDialogOpen(true); }} sx={{ transition: 'color 0.2s', '&:hover': { color: '#d32f2f' } }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'add' ? 'Add User' : 'Edit User'}</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <form id="user-form" onSubmit={handleSave}>
            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              fullWidth
              required
              type="email"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={form.role} label="Role" onChange={handleFormChange}>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleFormChange}>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" type="submit" form="user-form" disabled={loading || !form.fullName || !form.email || !form.mobile || !form.role}>
            {loading ? <CircularProgress size={22} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={loading}>
            {loading ? <CircularProgress size={22} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageUser; 