import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Calculator from "./Pages/Calculator";

const getRoutes = (token)=>{
    let routes;

    routes = (
      <Routes>
        <Route path="/" element={token ? <Home /> : <LoginPage />} exact />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" />}
          exact
        />
        <Route
          path="/signup"
          element={token ? <Home /> : <SignUpPage />}
          exact
        />

        <Route path="/" element={<LoginPage />} exact />
        <Route path="/tax" element={token ? <Calculator /> : <LoginPage/>} exact />
      </Routes>
    );

    return routes;
};

export default getRoutes;