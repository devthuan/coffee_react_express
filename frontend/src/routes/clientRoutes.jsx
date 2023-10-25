import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../validations/validations";

const ClientRoutes = (props) => {
  const dispatch = useDispatch();
  const dataToken = useSelector((state) => state.token.data);
  const token = localStorage.getItem("token") || dataToken;

  useEffect(() => {
    dispatch(getTokenFromLocalStorage());
  }, [dispatch]);

  if (token.length === 0) {
    alert("You need Login !");
    return <Navigate to="/" />;
  } else {
    return <>{props.children}</>;
  }
};

export default ClientRoutes;
