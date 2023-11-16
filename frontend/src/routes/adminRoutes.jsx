
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = (props) => {
  const checkLogin = useSelector((state) => state.auth.isLoggedIn);
  const permission = useSelector((state) => state.auth.user);

  if (!checkLogin) {
    alert("You need login !!!");
    return <Navigate to="/" />;
  } else if (permission !== "true") {
    alert("Your account not admin.");
    return <Navigate to="/" />;
  } else {
    return <>{props.children}</>;
  }
};

export default AdminRoute;
