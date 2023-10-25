import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../validations/validations";

const AdminRoute = (props) => {
  const dispatch = useDispatch();
  const dataToken = useSelector((state) => state.token.data);
  const token = localStorage.getItem("token") || dataToken;
  const permission = token.length > 0 ? JSON.parse(token).value[1] : false;

  useEffect(() => {
    dispatch(getTokenFromLocalStorage());
  }, [dispatch]);

  if (token.length === 0) {
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
