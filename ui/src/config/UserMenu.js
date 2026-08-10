import {
    FaHome,
    FaTruck,
    FaUser,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const UserMenu = [

    {
        title: "Dashboard",
        path: "/user/dashboard",
        icon: FaHome
    },

    {
        title: "Create Booking",
        path: "/user/booking",
        icon: FaTruck
    },

    {
        title: "My Bookings",
        path: "/user/mybookings",
        icon: FaTruck
    },

    {
        title: "Payment",
        path: "/user/payment",
        icon: FaIndianRupeeSign
    },

    {
        title: "Profile",
        path: "/user/profile",
        icon: FaUser
    },

    {
        title: "Settings",
        path: "/user/settings",
        icon: FaCog
    },

    {
        title: "Logout",
        path: "/logout",
        icon: FaSignOutAlt
    }

];

export default UserMenu;