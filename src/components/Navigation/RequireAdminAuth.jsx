import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../../slices/tikeraSlice";
import { Navigate } from "react-router";

const RequireAdminAuth = ({ children }) => {
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);
  return token !== null && role === "admin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default RequireAdminAuth;
