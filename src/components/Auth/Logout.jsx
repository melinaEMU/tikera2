import { useDispatch } from "react-redux";
import { logout } from "../../slices/tikeraSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    dispatch(logout());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);
};

export default Logout;
