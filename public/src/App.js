import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

export const Layout = () => {
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Route>
  )
);
const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes >
    //     <Route path="/register" element={<Register/>}/>
    //     <Route path="/login" element={<Login/>}/>
    //     <Route path="/setAvatar" element={<SetAvatar />} />
    //     <Route path="/" element={<Chat />} />
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
};

export default App;
