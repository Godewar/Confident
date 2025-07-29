import useSWR, { mutate } from 'swr';
import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';

const initialState = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}

export function handlerActiveItem(openedItem) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, openedItem };
    },
    false
  );
}

// Register a new driver
export async function registerDriver(driverData, files) {
  const formData = new FormData();
  Object.entries(driverData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  // files: { aadharFront, aadharBack, selfie, licenseFront, licenseBack, pancardFront, pancardBack }
  Object.entries(files).forEach(([key, file]) => {
    formData.append(key, file);
  });
  try {
    const response = await axios.post('http://localhost:4000/api/user/register-driver', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register driver:', error);
    throw error;
  }
}

// Fetch all users (drivers)
export async function GetAlluser() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/admin/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

// Fetch a specific user (driver) by ID
export async function getUserById(id) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user by id:', error);
    throw error;
  }
}

// Fetch all customer bookings
export async function getAllCustomerBookings() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/customers/allbooking');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer bookings:', error);
    throw error;
  }
}

// Fetch all order bookings
export async function getAllOrderBookings() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1//all/bookings');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order bookings:', error);
    throw error;
  }
}

// Get driver details by ID
export async function getDriverDetails(driverId) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/bookings/by/driver?driverId=${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver details:', error);
    throw error;
  }
}

// Get driver ride history
export async function getDriverRideHistory(driverId) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/driver/ride-history?driverId=${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver ride history:', error);
    throw error;
  }
}

// Fetch a single booking by order id
export async function getBookingById(id) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch booking by id:', error);
    throw error;
  }
}

// Fetch wallet transactions for a user by userId
export async function getWalletTransactions(userId) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/transactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wallet transactions:', error);
    throw error;
  }
}

// Fetch all wallet data
export async function getAllWallets() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/wallet');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
    throw error;
  }
}

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Driver APIs
export const getDriverById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/drivers/${id}`);
    return {
      success: true,
      driver: response.data
    };
  } catch (error) {
    console.error('Error fetching driver:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch driver details'
    };
  }
};

export const getDriverDocuments = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/drivers/${id}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDriverOrders = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/drivers/${id}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getDriverTransactions = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/drivers/${id}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const uploadDriverDocument = async (driverId, documentType, file) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', documentType);

    const response = await axios.post(
      `${baseURL}/drivers/${driverId}/documents/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const updateDriverBank = async (driverId, bankDetails) => {
  try {
    const response = await axios.put(
      `${baseURL}/drivers/${driverId}/bank`,
      bankDetails
    );
    return response.data;
  } catch (error) {
    console.error('Error updating bank details:', error);
    throw error;
  }
};

export const updateDriverWallet = async (driverId, amount, type) => {
  try {
    const response = await axios.put(
      `${baseURL}/drivers/${driverId}/wallet`,
      { amount, type }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};

// Add this helper function for document downloads
export const downloadDriverDocument = async (driverId, documentType) => {
  try {
    const response = await axios.get(
      `${baseURL}/drivers/${driverId}/documents/download/${documentType}`,
      { responseType: 'blob' }
    );
    return response.data;
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

// Add this helper function for document approval/rejection
export const updateDocumentStatus = async (driverId, documentType, status) => {
  try {
    const response = await axios.put(
      `${baseURL}/drivers/${driverId}/documents/status`,
      { documentType, status }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating document status:', error);
    throw error;
  }
};

// Add this function for customer profile details
export const getCustomerProfile = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`);
    
    if (response.data && response.data.user) {
      return {
        success: true,
        customer: response.data.user
      };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch customer details'
    };
  }
};
