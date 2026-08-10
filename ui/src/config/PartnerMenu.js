import {
  FaHome,
  FaTruck,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const PartnerMenu = (isProfileComplete) => [
  {
    title: "Dashboard",
    path: "/partner/dashboard",
    icon: FaHome,
  },

  ...(!isProfileComplete
    ? [
        {
          title: "Business Profile",
          path: "/partner/completeprofile",
          icon: FaIndianRupeeSign,
        },
      ]
    : [
      
  {
    title: "Assigned Jobs",
    path: "/partner/jobs",
    icon: FaClipboardList,
  },

  {
    title: "Drivers",
    path: "/partner/drivers",
    icon: FaTruck,
  },

  {
    title: "Vehicles",
    path: "/partner/vehicles",
    icon: FaTruck,
  },

  {
    title: "My Orders",
    path: "/partner/myorders",
    icon: FaTruck,
  },
  {
    title: "Earning",
    path: "/partner/earning",
    icon: FaIndianRupeeSign,
  },

  {
    title: "Quote Requests",
    path: "/partner/quoterequests",
    icon: FaFileInvoiceDollar,
},

{
    title: "Quotes Status",
    path: "/partner/quotestatus",
    icon: FaFileInvoiceDollar,
},
    ]),

   {
    title: "Profile",
    path: "/partner/profile",
    icon: FaUser,
  },

  {
    title: "Settings",
    path: "/partner/settings",
    icon: FaCog,
  },

  {
    title: "Logout",
    path: "/logout",
    icon: FaSignOutAlt,
  },

];

export default PartnerMenu;
