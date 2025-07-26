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

// Fetch all customer bookings
export async function getAllCustomerBookings() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1//customers/allbooking');
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

// Fetch driver ride history
export async function getDriverRideHistory() {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/driver/ride-history');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch driver ride history:', error);
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
