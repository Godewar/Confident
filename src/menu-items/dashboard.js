// assets
import { IconDashboard, IconChartBar, IconUserCheck, IconTruck, IconCurrencyDollar, IconUsers, IconTools, IconSettings, IconLogout } from '@tabler/icons-react';

// constant
const icons = {
  IconDashboard,
  IconChartBar,
  IconUserCheck,
  IconTruck,
  IconCurrencyDollar,
  IconUsers,
  IconTools,
  IconSettings,
  IconLogout
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
 
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    // {
    //   id: 'site-analytics',
    //   title: 'Site Analytics',
    //   type: 'item',
    //   url: '/analytics',
    //   icon: icons.IconChartBar,
    //   breadcrumbs: false
    // },
    {
      id: 'manage-driver',
      title: 'Manage Driver',
      type: 'item',
      url: '/drivers',
      icon: icons.IconUserCheck,
      breadcrumbs: false
    },
    {
      id: 'manage-rates',
      title: 'Manage Price',
      type: 'item',
      url: '/rates',
      icon: icons.IconCurrencyDollar,
      breadcrumbs: false
    },
    {
      id: 'manage-users',
      title: 'Manage Users',
      type: 'item',
      url: '/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customers',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'manage-order',
      title: 'Analyze Order',
      type: 'item',
      url: '/manage-orders',
      icon: icons.IconTruck,
      breadcrumbs: false
    },
    {
      id: 'ticket-rise',
      title: 'Ticket Rise',
      type: 'item',
      url: '/ticket-rise',
      icon: icons.IconTools,
      breadcrumbs: false
    },
    {
      id: 'coupon-code',
      title: 'Coupon Code',
      type: 'item',
      url: '/coupon-code',
      icon: icons.IconCurrencyDollar,
      breadcrumbs: false
    },
    {
      id: 'App-settings',
      title: 'App Settings',
      type: 'item',
      url: '/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: 'logout',
      title: 'LogOut',
      type: 'item',
      url: '/logout',
      icon: icons.IconLogout,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
