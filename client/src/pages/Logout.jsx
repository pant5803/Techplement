import { useEffect } from "react";
import { useAuth } from "../store/auth-store";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { logoutfunc } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    logoutfunc();
    navigate("/");
  }, [logoutfunc]);
};
export default Logout;
