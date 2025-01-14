/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectRoutes({ children }) {
  const { role, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // IF NOT LOGGED IN NAVIGATE TO THE SIGN IN PAGE
    if (!isLoggedIn) return navigate("/login");
  }, [isLoggedIn, role, navigate]);

  return children;
}

export default ProtectRoutes;
