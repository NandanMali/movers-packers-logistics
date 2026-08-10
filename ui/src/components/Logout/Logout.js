import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;