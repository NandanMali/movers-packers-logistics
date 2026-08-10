import {
    FaHome,
    // FaUsers,
    FaTruck,
    FaCar,
    FaUserTie,
    FaMoneyBill,
    FaCog,
    FaMapMarkerAlt,
    FaTags,
    // FaHeadset,
    FaSignOutAlt
} from "react-icons/fa";

import { 
  FaGaugeHigh,
  FaUsers,
  FaUserGroup,
  FaLayerGroup,
  FaCalendarCheck,
  FaTruckFast,
  FaIndianRupeeSign,
  FaChartLine,
  FaLocationDot,
  FaHeadset,
  FaUserLarge,
  FaGear,
  FaRightFromBracket,
  FaIdCard
 } from 'react-icons/fa6';

const AdminMenu = [

    {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: FaGaugeHigh
    },

    {
        title: "Categories",
        path: "/admin/categories",
        icon: FaLayerGroup
    },

    {
        title: "Users",
        path: "/admin/users",
        icon: FaUsers
    },

    {
        title: "Partners",
        path: "/admin/partners",
        icon: FaUserGroup
    },

    {
        title: "Bookings",
        path: "/admin/bookings",
        icon: FaCalendarCheck
    },


    {
        title: "Payments",
        path: "/admin/payments",
        icon: FaIndianRupeeSign
    },

    {
        title: "Tracking",
        path: "/admin/tracking",
        icon: FaLocationDot
    },

    {
        title: "Support",
        path: "/admin/support",
        icon: FaHeadset
    },

    {
        title: "Profile",
        path: "/admin/profile",
        icon: FaUserLarge
    },

    {
        title: "Settings",
        path: "/admin/settings",
        icon: FaGear
    },

    {
        title: "Logout",
        path: "/logout",
        icon: FaRightFromBracket
    }

];

export default AdminMenu;