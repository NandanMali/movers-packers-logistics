// export const getUsers = () => {
//   return JSON.parse(localStorage.getItem("users")) || [];
// };

// export const getBookings = () => {
//   return JSON.parse(localStorage.getItem("bookings")) || [];
// };

// export const getVehicles = () => {
//   return JSON.parse(localStorage.getItem("vehicles")) || [];
// };

// export const getDrivers = () => {
//   return JSON.parse(localStorage.getItem("drivers")) || [];
// };

// export const getPartners = () => {
//   return JSON.parse(localStorage.getItem("partners")) || [];
// };

export const getDashboardStats = () => {

    const users = localStorage.getItem("users") || [];

    const bookings = localStorage.getItem("bookings") || [];

    const vehicles =localStorage.getItem("vehicles") || [];
    const drivers = localStorage.getItem("drivers") || [];
    const partners =localStorage.getItem("partners") || [];

    return {

        totalUsers: users.length,

        totalBookings: bookings.length,

        totalVehicles: vehicles.length,

        totalDrivers: drivers.length,

        totalPartners: partners.length,

    };

};