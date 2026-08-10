export const getDashboardRoute = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";

    case "partner":
      return "/partner/dashboard";

    default:
      return "/user/dashboard";
  }
};