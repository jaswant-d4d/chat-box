import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/store";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user =useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
  return !user ? (
    <Navigate to={"/login"} state={{ from: location }} replace />
  ) : (
    children
  );
};

export default ProtectedRoute;