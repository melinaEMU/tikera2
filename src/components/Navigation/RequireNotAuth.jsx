import { useSelector } from "react-redux";
import { selectToken } from "../../slices/tikeraSlice";
import { Navigate } from "react-router";

const RequireNotAuth = ({ children }) => {
  const token = useSelector(selectToken);
  return token === null ? children : <Navigate to="/" replace />;
};

export default RequireNotAuth;
