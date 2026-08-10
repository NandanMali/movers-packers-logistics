import Navigate from "react-router-dom";

const ProtectedRoute = ({
  children,
  role
}) => {

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (
    role &&
    currentUser.role !== role
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;